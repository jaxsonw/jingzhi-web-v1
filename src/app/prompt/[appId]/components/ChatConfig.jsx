'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Select, SelectItem, ScrollShadow } from 'antd'
import { isEmpty } from 'lodash'
import { toast as Toast } from 'react-toastify'
import AppSetting from '../../../../components/workflowComponents/AppSetting'
import { getInputKeys } from '../../../../utils/index'
import { openAi, updateApp } from '../../../../services/promptService'
import { latestRecordIdList } from '../../../../services/chat'
import ChatModal from '../chat/chatModal'
import { PulseLoader as Loading } from 'react-spinners'
import Image from 'next/image'
import ChatLogo from '/public/chat_logo.png'
import AppConfig from './AppConfig'
import { getQiniuToken } from '../../../../services/user'
import { BASE_CDN_URL, QiNiuUploadImage } from '../../../../utils/qiniuTools'

const TextGenerate = ({ getAllNewDetail, appDetail, reloadDetail, setReloadDetail, onSave, newDetail }) => {
  const messageRef = useRef()
  const cueWordRef = React.useRef(null)
  const [cueWord, setCueWord] = useState(appDetail?.config?.preNotice || '')
  const [qinniuToken, setQinniuToken] = useState()
  const [cueWordVisible, setCueWordVisible] = useState(false)
  const [changeCueword, setChangeCueword] = useState(null) // 提示词是否发生了变化
  const [fieldList, setFieldList] = useState(appDetail?.config?.fieldList || [])
  const [appSettingVisible, setAppSettingVisible] = useState(false)
  const [generateLoading, setGenerateLoading] = useState(false)
  const textareaRef = useRef(null)
  const isUseInputMethod = useRef(false)
  const [inputText, setInputText] = useState('')
  const [appRecord, setAppRecord] = useState([])
  const appConfigRef = useRef(null)
  const [modelId, setModelId] = useState(1)
  const [cueWordHeight, setCueWordHeight] = useState(0)
  const [showDescScroll, setShowDescScroll] = useState(false)
  const [modelList, setModelList] = useState([])

  const appColor = '#3162FF'

  const qiniuToken = async () => {
    const { data: { token } } = await getQiniuToken()
    setQinniuToken(token)
  }

  useEffect(() => {
    qiniuToken()
    getModules()
  }, [])

  const getModules = async () => {
    const { data } = await getModelList({ sceneType: 3 })
    const list = data.map(v => ({ ...v, value: v.modelId, label: v.modelName }))
    setModelList(list)
  }

  const getDebugRecordList = async () => {
    const res = await latestRecordIdList({
      appId: appDetail?.appId,
      dialogId: 0,
      isDebug: 1,
      isOnlyChat: 0,
    })
    return res?.data?.id || ''
  }

  const onGenerate = text => {
    const allValuesNotEmpty = !isEmpty(text)
    if (!allValuesNotEmpty) {
      Toast.error('请填写用户输入内容！')
      return
    }

    setGenerateLoading(true)

    appRecord.push({ isAnswer: true, content: '' })
    setAppRecord(appRecord)

    const params = {
      path: '/v1/service/debugApp',
      appId: appDetail?.appId,
      preNotice: cueWord,
      appType: 1,
      modelId,
      message: text,
    }

    try {
      const options = {
        scene: 2,
        onMessage: data => {
          const newMsg = data?.content
          appRecord[appRecord.length - 1].content = newMsg
          appRecord[appRecord.length - 1].generateLoading = true
          setAppRecord(JSON.parse(JSON.stringify(appRecord)))
        },
        onEnd: async data => {
          setGenerateLoading(false)
          const id = await getDebugRecordList()
          const newMsg = data?.content
          appRecord[appRecord.length - 1].content = newMsg
          appRecord[appRecord.length - 1].actionState = true
          appRecord[appRecord.length - 1].id = id
          setAppRecord(JSON.parse(JSON.stringify(appRecord)))

          // setContent(newMsg)
          // messageRef?.current?.scrollIntoView({
          //   behavior: 'smooth',
          //   block: 'nearest',
          // })
        },
      }

      openAi(params, options)
    } catch {
      // messageRef?.current?.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'nearest',
      // })
      setGenerateLoading(false)
    }
  }

  const onReload = () => {
    appRecord.pop()
    setAppRecord(appRecord)
    onGenerate(appRecord[appRecord.length - 1].content)
  }

  useEffect(() => {
    if (cueWord) return
    if (changeCueword != null) return
    setCueWord(appDetail?.config?.preNotice)
    getDebugRecordList()
    const descHeight = document.querySelector('.desc').clientHeight;
    setShowDescScroll(descHeight > 150)
  }, [appDetail])

  useEffect(() => {
    setTimeout(() => {
      const topHeight = document.documentElement.clientHeight - 530
      const height = topHeight > 300 ? topHeight : 300
      setCueWordHeight(height)
    }, 100)
  }, [])

  const onWheel = event => {
    if (event.deltaY !== 0) {
      // setStopAutoScroll(true);
      messageRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }

  // useEffect(() => {
  //   // if (stopAutoScroll) return;
  //   messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  // }, [content])

  const getDisplayValue = () => {
    let newData = cueWord
    const keyList = getInputKeys(cueWord)
    if (keyList.length === 0) return cueWord
    keyList.forEach(item => {
      newData = newData?.replaceAll(
        `{{${item}}}`,
        `<span style="background:#4692ff;display:inline-block;color:white; border-radius:5px;  padding:0 5px; font-weight:bold; ">{{${item}}}</span>`
      )
    })
    return newData
  }

  const getAllConfig = values => {
    setFieldList(values)
  }

  const handleKeyUp = e => {
    if (e.code === 'Enter') {
      if (generateLoading) return
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current) {
        appRecord.push({ isAnswer: false, content: inputText })
        setAppRecord(appRecord)
        onGenerate(inputText)
        setInputText('')
      }
    }
  }

  const sendMessage = () => {
    appRecord.push({ isAnswer: false, content: inputText })
    setAppRecord(appRecord)
    onGenerate(inputText)
    setInputText('')
  }

  const onInputKeyDown = e => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setInputText(inputText.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  const reloadContent = () => {
    setReloadDetail(!reloadDetail)
  }

  useEffect(() => {
    getAllNewDetail({
      preNotice: cueWord,
      fieldJson: fieldList,
    })
  }, [cueWord, fieldList])

  useEffect(() => {
    if (cueWordRef && cueWordVisible) {
      cueWordRef?.current?.focus()
    }
  }, [cueWordRef, cueWordVisible])

  const submitData = async (uploadForm) => {
    try {
      const res = await updateApp(uploadForm)
      if (res.code !== 0) {
        Toast.error(res?.message)
        return
      }
      Toast.success('保存成功')
      reloadContent()
    } catch (e) {
      console.log(e)
    }
  }

  const upload = () => {
    try {
      new QiNiuUploadImage({
        token: qinniuToken,
        error: (e) => {
          console.log('upload error', e)
          Toast.error(e.data.error)
        },
        complete: (e) => {
          const data = {
            icon: BASE_CDN_URL + e.key,
            appId: appDetail?.appId,
            name: appDetail?.name,
          }
          submitData(data)
        }
      })

    } catch (e) {
      console.log('eeeeeeeeee', e)
    }
  }
  return (
    <div className="flex h-full flex-wrap  overflow-y-auto">
      {appSettingVisible && (
        <AppSetting reload={reloadContent} appDetail={appDetail} visible={appSettingVisible} setVisible={setAppSettingVisible} />
      )}
      <section className="w-full md:w-1/3  h-full overflow-scroll w-[600px] w-full md:max-w-[50%] p-6 rounded-l-2xl shrink-0 relative flex flex-col border-r border-gray-100 bg-white">
        <div className="flex items-start space-x-3">
          <div className='relative w-[50px] h-[50px] '>
            <Image className='opacity-0 absolute left-0 top-0 hover:opacity-100' width={50} height={50} src={"https://ew6.cn/28d61379-1859-4243-b749-304091619461"} onClick={() => upload()} alt='' />
            {appDetail?.icon ?
              <div className='w-[50px] h-[50px] rounded-[50%] shrink-0 items-center justify-center' >
                <Image className='rounded-[50%]' width={50} height={50} src={appDetail.icon} alt='' />
              </div>
              : <div
                className="w-[50px] h-[50px] rounded-[50%] flex shrink-0 items-center justify-center"
                style={{
                  background: appDetail?.iconBackground || 'rgb(255, 234, 213)',
                }}
              >
                <span className="emoji-mart-emoji" data-emoji-set="native">
                  <span className="text-2xl">🤖</span>
                </span>
              </div>}
          </div>
          <div className="text-lg flex flex-col flex-none text-gray-800 font-semibold w-[calc(100%_-_60px)]">
            <div className='flex justify-between	items-start	pr-4 '>
              <span className="truncate h-[35px] leading-[35px] text-[#3162FF] text-lg font-bold text-ellipsis w-4/6">{appDetail?.name}</span>
              <button
                className="w-2/6 h-[35px] flex items-center justify-end hover:text-[#3162FF]"
                onClick={() => setAppSettingVisible(true)}
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  version="1.1"
                  width="16"
                  height="16"
                  viewBox="0 0 21.15234375 21"
                  className="mr-2"
                >
                  <g>
                    <g>
                      <path
                        d="M1,1L16.2143,1L16.2143,0L0,0L0,21L21,21L21,4.875L20,4.875L20,20L1,20L1,1Z"
                        fillRule="evenodd"
                        fill="#3162FF"
                        fillOpacity="1"
                      />
                    </g>
                    <g transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-8.36987302716156,9.009486872510337)">
                      <path
                        d="M26.642175940704345,15.108074188232422L6.690490508104346,15.108655188232422L6.690461373304346,14.108655188232422L26.642075940704345,14.108074188232422L26.642175940704345,15.108074188232422Z"
                        fillRule="evenodd"
                        fill="#3162FF"
                        fillOpacity="1"
                      />
                    </g>
                  </g>
                </svg>
                修改
              </button>
            </div>
            {showDescScroll ? <div className="w-full max-h-[150px] overflow-y-auto">
              <div className="text-gray-500 bg-[#f7f7f8] p-4 desc">{appDetail?.desc}</div>
            </div> :
              <div className="text-gray-500 bg-[#f7f7f8] p-4 desc w-full">{appDetail?.desc}</div>
            }

          </div>
        </div>
        <div className="h-full py-4 pb-0">
          <AppConfig appDetail={appDetail} ref={appConfigRef} setChangeCueword={setChangeCueword} changeCueword={changeCueword} />
          <div className="flex items-center h-11 pl-3 gap-1 text-[#3162FF]">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.00001 0.100098C3.21218 0.100098 3.41566 0.184383 3.56569 0.334412C3.71572 0.484441 3.80001 0.687924 3.80001 0.900098V1.7001H4.60001C4.81218 1.7001 5.01566 1.78438 5.16569 1.93441C5.31572 2.08444 5.40001 2.28792 5.40001 2.5001C5.40001 2.71227 5.31572 2.91575 5.16569 3.06578C5.01566 3.21581 4.81218 3.3001 4.60001 3.3001H3.80001V4.1001C3.80001 4.31227 3.71572 4.51575 3.56569 4.66578C3.41566 4.81581 3.21218 4.9001 3.00001 4.9001C2.78783 4.9001 2.58435 4.81581 2.43432 4.66578C2.28429 4.51575 2.20001 4.31227 2.20001 4.1001V3.3001H1.40001C1.18783 3.3001 0.98435 3.21581 0.834321 3.06578C0.684292 2.91575 0.600006 2.71227 0.600006 2.5001C0.600006 2.28792 0.684292 2.08444 0.834321 1.93441C0.98435 1.78438 1.18783 1.7001 1.40001 1.7001H2.20001V0.900098C2.20001 0.687924 2.28429 0.484441 2.43432 0.334412C2.58435 0.184383 2.78783 0.100098 3.00001 0.100098ZM3.00001 8.1001C3.21218 8.1001 3.41566 8.18438 3.56569 8.33441C3.71572 8.48444 3.80001 8.68792 3.80001 8.9001V9.7001H4.60001C4.81218 9.7001 5.01566 9.78438 5.16569 9.93441C5.31572 10.0844 5.40001 10.2879 5.40001 10.5001C5.40001 10.7123 5.31572 10.9158 5.16569 11.0658C5.01566 11.2158 4.81218 11.3001 4.60001 11.3001H3.80001V12.1001C3.80001 12.3123 3.71572 12.5158 3.56569 12.6658C3.41566 12.8158 3.21218 12.9001 3.00001 12.9001C2.78783 12.9001 2.58435 12.8158 2.43432 12.6658C2.28429 12.5158 2.20001 12.3123 2.20001 12.1001V11.3001H1.40001C1.18783 11.3001 0.98435 11.2158 0.834321 11.0658C0.684292 10.9158 0.600006 10.7123 0.600006 10.5001C0.600006 10.2879 0.684292 10.0844 0.834321 9.93441C0.98435 9.78438 1.18783 9.7001 1.40001 9.7001H2.20001V8.9001C2.20001 8.68792 2.28429 8.48444 2.43432 8.33441C2.58435 8.18438 2.78783 8.1001 3.00001 8.1001ZM8.60001 0.100098C8.77656 0.100041 8.94817 0.158388 9.0881 0.266047C9.22802 0.373706 9.32841 0.52463 9.37361 0.695298L10.3168 4.2601L13 5.8073C13.1216 5.87751 13.2226 5.9785 13.2928 6.10011C13.363 6.22173 13.4 6.35967 13.4 6.5001C13.4 6.64052 13.363 6.77847 13.2928 6.90008C13.2226 7.02169 13.1216 7.12268 13 7.1929L10.3168 8.7409L9.37281 12.3049C9.32753 12.4754 9.22716 12.6262 9.08732 12.7337C8.94748 12.8413 8.77602 12.8996 8.59961 12.8996C8.42319 12.8996 8.25173 12.8413 8.11189 12.7337C7.97205 12.6262 7.87169 12.4754 7.82641 12.3049L6.88321 8.7401L4.20001 7.1929C4.0784 7.12268 3.97742 7.02169 3.90721 6.90008C3.837 6.77847 3.80004 6.64052 3.80004 6.5001C3.80004 6.35967 3.837 6.22173 3.90721 6.10011C3.97742 5.9785 4.0784 5.87751 4.20001 5.8073L6.88321 4.2593L7.82721 0.695298C7.87237 0.524762 7.97263 0.373937 8.1124 0.266291C8.25216 0.158646 8.42359 0.100217 8.60001 0.100098Z"
                fill="currentColor"
              />
            </svg>
            <div className="font-bold text-lg ">提示词编辑框</div>
          </div>
          <div className="relative rounded-xl">
            <div className="block- h-full w-full overflow-y-auto   border-none rounded-lg">
              <div className="config-textarea h-full rounded bg-gray-100 overflow-y-scroll relative">
                <textarea
                  placeholder="提示词用于对 AI 的回复做出一系列指令和约束。这段提示词不会被最终用户所看到。                "
                  value={cueWord}
                  className="w-full flex h-full font-bold bg-[#f7f7f8]  text-md text-gray-900   h-full p-5 outline-0"
                  onChange={e => {
                    setCueWord(e?.target?.value)
                  }}
                  style={{ height: cueWordHeight }}
                  ref={cueWordRef}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onSave(appConfigRef.current.getNewDetail() || {})
            }}
            disabled={!newDetail}
            className="w-[200px] h-[40px] bg-[#3162FF] shadow-2xl  flex  items-center justify-center rounded-md  text-[white] font-bold mt-4 ml-auto mr-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
              />
            </svg>
            保存应用
          </button>
        </div>
      </section>
      <div className="w-full md:w-2/3  rounded-r-2xl h-full overflow-y-scroll bg-[#f9fafb] p-4">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="font-bold text-[#3162FF] ">运行模拟测试</div>
            {modelList.length > 0 && <div style={{ height: '46px', overflow: 'hidden' }} >
              <Select placeholder="选择模型" className="w-[150px] text-gray-900"
                defaultValue={modelList.find(v => v.isDefault === 1)?.value}
                options={modelList}
                onChange={value => {
                  setModelId(value)
                }} />
            </div>}
          </div>
          <div onWheel={onWheel} className=" h-[calc(100vh_-_300px)] overflow-scroll grow top-[64px] bottom-0  ">
            {appRecord?.length > 0 ? (
              <ChatModal appColor={appColor} messageRef={messageRef} record={appRecord} modelId={modelId} onReload={onReload} />
            ) : (
              <div className="flex-col flex justify-center items-center h-full">
                <Image src={ChatLogo} className="w-[134px] mb-2 mr-6" />
                <div className="text-gray-400">
                  {' '}
                  下方输入您的问题
                  <br />
                  AI会在这里给你惊喜~
                </div>
              </div>
            )}
          </div>
          <div className="h-[60px] md:h-[70px] border-t box-border shrink-0	 flex items-center rounded-b-lg  overflow-hidden bg-[#fff] shadow-xl w-11/12 mr-auto ml-auto pr-8">
            <textarea
              ref={textareaRef}
              onKeyUp={handleKeyUp}
              onKeyDown={onInputKeyDown}
              onChange={e => {
                setInputText(e?.target?.value)
              }}
              value={inputText}
              className="block  h-[60px] md:h-[80px] p-2 md:p-5 md:leading-[50px] border-0 outline-0		  box-border resize-none w-full text-lg font-[600] text-gray-900 "
              placeholder="请输入问题，可使用Ctrl+Enter（windows系统）或Cmd+Enter换行（MAC系统）"
            />

            {generateLoading ? (
              <Loading color="#3162FF" size={8} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 shrink-0"
                onClick={sendMessage}
                color="#3162FF"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextGenerate
