'use client'
import React, { useEffect, useState, useRef, memo } from 'react'
import { every, isEmpty } from 'lodash'
import { toast as Toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import AppSetting from '@/components/workflowComponents/AppSetting'
import Debugger from './TextDebugger'
import { getInputKeys, keyToRemark, remarkToKey } from '@/utils/index'
import { openAi, updateApp } from '@/services/home'
import { Markdown } from '@/components/Base/markdown'
import copy from 'copy-to-clipboard'
import { BASE_CDN_URL, QiNiuUploadImage } from '@/utils/qiniuTools'
import AppConfig from './AppConfig'
import Image from 'next/image'
import ChatLogo from '/public/chat_logo.png'
import { record as actionApi, latestRecordIdList } from '@/services/chat'
import { getQiniuToken } from '@/services/user'
const default_cue_word = `
这是一段小红书文案专家示例词

你是一名小红书探店博主，会写各种小红书探店推荐文案。请帮我写一篇小红书探店文案，要求如下：
1.首行需提供这篇文案的{{标题}}
2.内容150字左右，分段落讲解
3.内容中需包含多个emoji表情
4.内容需围绕{{店名称}}
5.需要加上位置：{{位置}}
6.需要加营业时间：{{营业时间}}
7.结尾需要增加”#“+文章关键词的内容
`

const params = {
  1: '点赞成功',
  2: '成功吐槽',
  3: '复制成功'
}

const TextGenerate = ({ getAllNewDetail, appDetail, reloadDetail, setReloadDetail, onSave }) => {
  const messageRef = useRef()
  const cueWordRef = React.useRef(null)
  const [cueWord, setCueWord] = useState()
  const [cueWordVisible, setCueWordVisible] = useState(false)
  const [qinniuToken, setQinniuToken] = useState()
  const [fieldList, setFieldList] = useState([])
  const [appSettingVisible, setAppSettingVisible] = useState(false)
  const [changeCueword, setChangeCueword] = useState(null) // 提示词是否发生了变化
  const [generateLoading, setGenerateLoading] = useState(false)
  const [content, setContent] = useState('')
  const appConfigRef = useRef(null)
  const [textareaStart, setTextareaStart] = useState(0)
  const [actionState, setActionState] = useState(false)
  const [contentId, setContentId] = useState(0)
  const [inputFieldList, setInputFieldList] = useState([])
  const [modelId, setModelId] = useState(1)
  const [resultHeight, setResultHeight] = useState(0)
  const [cueWordHeight, setCueWordHeight] = useState(0)
  const [showDescScroll, setShowDescScroll] = useState(false)

  const qiniuToken = async () => {
    const { data: { token } } = await getQiniuToken()
    setQinniuToken(token)
  }

  useEffect(() => {
    qiniuToken()
  }, [])

  const action = async (type) => {
    const appRecordRes = await actionApi({
      id: contentId,
      type,
    })

    if (type === 3) {
      copy(content)
    }
    Toast.success(params[type] || '操作成功')

    // if (appRecordRes?.code === 0) {
    //   if (type === 3) {
    //     copy(content)
    //   }
    //   Toast.success(params[type] || '操作成功')
    // } else {
    //   Toast.error('操作失败')
    // }
  }

  const getDebugRecordList = async () => {
    const res = await latestRecordIdList({
      appId: appDetail?.appId,
      dialogId: 0,
      isDebug: 1,
      isOnlyChat: 0,
    })
    return res?.data?.id || 0
  }


  const onGenerate = list => {
    setInputFieldList(list)
    const allValuesNotEmpty = every(list, obj => {
      return !isEmpty(obj[obj.field])
    })
    if (!allValuesNotEmpty) {
      Toast.error('请填写必要参数！')
      return
    }

    const paramsList = list?.map(item => ({ ...item, ref: null }))
    setGenerateLoading(true)

    const params = {
      path: '/v1/service/debugApp',
      appId: appDetail?.appId,
      preNotice: remarkToKey(list, cueWord),
      appType: 2,
      modelId,
      // message: '',
      paramsList,
    }

    try {
      const options = {
        scene: 2,
        onMessage: data => {
          const newMsg = data?.content
          setContent(newMsg)
        },
        onEnd: async data => {
          setGenerateLoading(false)
          const id = await getDebugRecordList()
          setContentId(id)
          const newMsg = data?.content
          setContent(newMsg)
          setActionState(true)
          // messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        },
      }

      openAi(params, options)
    } catch {
      // messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

      setGenerateLoading(false)
    }
  }

  const onReload = () => {
    setContent('')
    setActionState(false)
  }

  useEffect(() => {
    if (!appDetail) return
    if (changeCueword != null) return
    if (!appDetail.config?.preNotice) {
      setCueWord(cueWord || default_cue_word)
      return
    }
    let data = keyToRemark(appDetail.config?.fieldList, appDetail.config?.preNotice)
    setCueWord(cueWord || data)
    setFieldList(fieldList?.length ? fieldList : appDetail?.config?.fieldList)

    const descHeight = document.querySelector('.desc').clientHeight;
    setShowDescScroll(descHeight > 150)

  }, [appDetail])

  useEffect(() => {
    setTimeout(() => {
      const topHeight = document.documentElement.clientHeight - 560
      const height = topHeight > 300 ? topHeight : 300
      setCueWordHeight(height)

    }, 100)
  }, [])

  const onWheel = event => {
    if (event.deltaY !== 0) {
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
    newData = newData?.replaceAll(
      `\n`,
      `<br />`
    )
    return newData
  }

  const getAllConfig = values => {
    const keyList = getInputKeys(values)
    const list = keyList.map((item, index) => {
      const id = fieldList?.find(val => val?.remark === item)?.fieldId || 0

      return {
        field: 'key' + index,
        fieldId: id || uuidv4(),
        remark: item,
      }
    })
    setFieldList(list)
  }

  const insert = () => {
    const before = cueWord.substring(0, textareaStart)
    const after = cueWord.substring(textareaStart)
    setCueWord(`${before}{{}}${after}`)
  }
  // console.log('fieldList', fieldList)

  const reloadContent = () => {
    setReloadDetail(!reloadDetail)
  }

  useEffect(() => {
    if (cueWord) {
      getAllConfig(cueWord)
    }
    // getDisplayValue()
    setTimeout(() => {
      const el = document.querySelector('.debugger-wrap')
      const topHeight = document.documentElement.clientHeight - el.clientHeight - 175
      const height = topHeight > 200 ? topHeight : 200
      setResultHeight(height)
    }, 100)
    // console.log(first)
  }, [cueWord])

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
    <div className="flex h-full  flex-wrap  overflow-y-auto">
      {appSettingVisible && (
        <AppSetting reload={reloadContent} appDetail={appDetail} visible={appSettingVisible} setVisible={setAppSettingVisible} />
      )}
      <section className="w-full md:w-1/3 overflow-scroll w-[600px] h-full p-4 pdrounded-l-2xl shrink-0 relative flex flex-col  border-r border-gray-100 bg-white">
        <div className="flex items-start space-x-3">
          <div className='relative w-[50px] h-[50px] '>
            <Image className='opacity-0 absolute left-0 top-0 hover:opacity-100' width={50} height={50} src={"https://ew6.cn/28d61379-1859-4243-b749-304091619461"} onClick={() => upload()} />

            {appDetail?.icon ? <Image className='rounded-[50%]' width={50} height={50} src={appDetail.icon} /> : <div
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

        <div className="py-4 pb-0 h-full">
          <AppConfig appDetail={appDetail} ref={appConfigRef} setChangeCueword={setChangeCueword} changeCueword={changeCueword} />

          <div className="flex items-center h-11 pl-3 gap-1 text-[#3162FF]">
            <div className="font-bold text-lg text-[#3162FF]">提示词编辑框</div>
          </div>
          <div
            className="bg-[#F7F7F7] relative rounded-xl"
          >
            <div className="block-input w-full h-full  overflow-y-auto   border-none rounded-lg" style={{ height: cueWordHeight }}>
              <div className="config-textarea h-full  border-box rounded   overflow-y-scroll pb-[30px]">
                <textarea
                  disabled={generateLoading}
                  value={cueWord}
                  className="w-full flex h-full font-bold bg-[#f7f7f8]  text-md text-gray-900  p-5 pb-9 h-full outline-0"
                  onChange={e => {
                    setCueWord(e?.target?.value)
                    setChangeCueword(true)
                  }}
                  onSelect={e => setTextareaStart(e.target.selectionStart)}
                  ref={cueWordRef}
                  onBlur={() => setCueWordVisible(!cueWordVisible)}
                />
                <div
                  className="flex justify-center items-center bg-[#E4E4E4] 
                  h-[25px] cursor-pointer	 text-[#3162FF] absolute bottom-0 w-full"
                  onClick={insert}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                    fill="none"
                    version="1.1"
                    width="12"
                    height="12"
                    viewBox="0 0 22 22"
                  >
                    <g>
                      <g transform="matrix(0,1,-1,0,11.0009765625,-9.0009765625)">
                        <line
                          x1="10.0009765625"
                          y1="0"
                          x2="30.0009765625"
                          y2="0"
                          fillOpacity="0"
                          strokeOpacity="1"
                          stroke="#3162FF"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="ROUND"
                          strokeLinejoin="round"
                        />
                      </g>
                      <g transform="matrix(-1,1.2246468525851679e-16,-1.2246468525851679e-16,-1,42,20.001953125)">
                        <line
                          x1="21"
                          y1="9.0009765625"
                          x2="41"
                          y2="9.0009765625"
                          fillOpacity="0"
                          strokeOpacity="1"
                          stroke="#3162FF"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="ROUND"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  </svg>
                  插入填空变量
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onSave(appConfigRef.current.getNewDetail() || {})
            }}
            disabled={!appDetail}
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
      <div className="w-full md:w-2/3  rounded-r-2xl h-full overflow-y-scroll bg-[#f9fafb]">
        <div className='debugger-wrap'>
          <Debugger generateLoading={generateLoading} onGenerate={onGenerate} fieldList={fieldList} cueWord={cueWord} setModelId={(id) => { setModelId(id) }} onReload={onReload} />
        </div>
        <div className="flex flex-col  shrink-0 px-6 ">
          <div className="shrink-0 mb-4  flex items-center justify-between">
            <div className="flex items-center justify-between  w-full">
              <div className="text-lg text-[#3162FF] font-semibold ">生成结果</div>
            </div>
          </div>
          <div className="grow rounded-md mb-[20px] bg-[#EAEAEA] relative" style={{ flex: 'none', minHeight: resultHeight + 'px' }} >
            {!content ? (
              <div className="flex-col flex justify-center items-center h-full">
                <Image src={ChatLogo} className="w-[100px] mb-2 mr-6" />
                <div className="text-gray-400">
                  {' '}
                  下方输入您的问题
                  <br />
                  AI会在这里给你惊喜~
                </div>
              </div>
            ) : (
              <div ref={messageRef} className="basis-3/4 h-max p-5     rounded">
                <Markdown content={content} />
                {actionState && <div className="flex text-gray-400 absolute bottom-[20px] right-[20px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    version="1.1"
                    width="12"
                    height="12"
                    viewBox="0 0 20.666667938232422 20"
                    className="cursor-pointer hover:text-gray-800"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => {
                      action(1)
                    }}
                  >
                    <path
                      d="M14.0427,2.23289L14.0546,2.29291L14.0665,2.31692C14.0784,2.34093,14.0784,2.35294,14.0903,2.37695L14.1023,2.43697C14.2453,3.10924,14.3168,3.7695,14.3168,4.44177C14.3168,4.76825,14.2992,5.09118,14.2658,5.41056C14.2379,5.67836,14.1989,5.94367,14.1499,
                  6.20648L14.1023,6.41056L17.4878,6.41056C17.5474,6.41056,17.607,
                  6.41056,17.6666,6.42257L17.75,6.42257C18.7156,6.49459,19.5977,6.9988,
                  20.1342,7.81512L20.1938,7.91116C20.5292,8.47023,20.6963,9.10841,20.6624,9.7599C20.662,
                  9.76783,20.6615,9.77575,20.661,9.78368L20.661,9.78391C20.6607,9.78903,20.6604,9.79416,
                  20.6601,9.79928C20.6606,9.80617,20.6611,9.81305,20.6615,9.81993C20.6681,9.92786,20.6563,
                  10.0348,20.6348,10.1321L20.6229,10.2041L19.6587,14.4766L19.5663,14.8859L18.8944,
                  17.8631C18.8526,18.021,18.7833,18.1696,18.6946,18.309C18.6894,18.3172,18.6841,18.3254,
                  18.6788,18.3335L18.6606,18.3701L18.656,18.3794C18.6523,18.3858,18.6486,18.3923,18.6449,
                  18.3988C18.4076,18.8106,18.0896,19.1639,17.7023,19.4358L17.595,19.5078C17.0944,19.8319,
                  16.5102,20,15.9142,20L1.58546,20C0.739087,20,0.047683,19.3277,0,18.4754L0,9.51981C0,
                  8.7395,0.560276,8.07923,1.33512,7.95918L1.41857,7.94718C3.80272,7.67107,5.36434,
                  7.21489,6.07959,6.61465C7.05709,5.79832,7.83194,4.15366,7.93922,3.13325C8.14188,1.17647,
                  9.31011,0,11.0386,0C12.4095,0,13.6135,0.90036,14.0427,2.23289ZM13.0997,2.61835L13.1324,
                  2.68425Q13.3168,3.56986,13.3168,4.44177Q13.3168,5.2073,13.1709,6.00165L12.8417,
                  7.41056L17.4878,7.41056L17.5074,7.41059L17.5669,7.42257L17.7098,7.42257Q18.733,
                  7.51201,19.2922,8.35481L19.3362,8.42562Q19.7108,9.0499,19.6612,9.74918L19.8124,
                  9.7599L19.6587,9.7599L19.6587,9.91498L19.6583,9.91657L19.6526,9.94252L19.6411,
                  10.0122L17.9242,17.6195Q17.9154,17.6491,17.9012,17.6804L17.7969,17.8555L17.8491,
                  17.8889L17.7961,17.8626L17.7736,17.9079Q17.5227,18.3401,17.1449,18.6055L17.0516,
                  18.6684Q16.5393,19,15.9142,19L1.58546,19Q1.3558,19,1.18757,18.8377Q1.02018,18.6762,
                  1,18.4416L1,9.51981Q1,9.02304,1.47751,8.949L1.54739,8.93894Q5.39914,8.49116,6.72058,
                  7.38219Q7.57856,6.66568,8.22515,5.40759Q8.82918,4.23229,8.9339,3.23627Q9.1655,1,
                  11.0386,1Q11.7341,1,12.2966,1.41883Q12.8458,1.82779,13.074,2.48905L13.0997,
                  2.61835Z"
                    />
                  </svg>

                  <svg
                    className="ml-1 cursor-pointer hover:text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    version="1.1"
                    width="16"
                    height="13"
                    viewBox="0 0 20 20"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => {
                      action(3)
                    }}
                  >
                    <path d="M12,5L9,5L9,16L0,16L0,0L12,0L12,5ZM8,5L8,15L1,15L1,1L11,1L11,4L9,4Q8.90151,4,8.80491,4.01921Q8.70831,4.03843,8.61732,4.07612Q8.52632,4.11381,8.44443,4.16853Q8.36254,4.22325,8.29289,4.29289Q8.22325,4.36254,8.16853,4.44443Q8.11381,4.52632,8.07612,4.61732Q8.03843,4.70831,8.01921,4.80491Q8,4.90151,8,5Z" />
                    <path d="M20,4L8,4L8,20L20,20L20,4ZM9,19L9,5L19,5L19,19L9,19Z" />
                    <path d="M15,9.5L11,9.5L11,8.5L15,8.5L15,9.5Z" />

                    <path d="M17,12.5L11,12.5L11,11.5L17,11.5L17,12.5Z" />

                    <path d="M14,15.5L11,15.5L11,14.5L14,14.5L14,15.5Z" />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 cursor-pointer	hover:text-gray-800"
                    fill="none"
                    version="1.1"
                    width="14"
                    height="14"
                    viewBox="0 0 23.77294921875 21"
                    onClick={() => {
                      onReload(); onGenerate(inputFieldList)
                    }}
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <g>
                      <g>
                        <path d="M8.529578550262451,18.7329Q6.399758550262451,17.5029,5.129988550262452,15.3956L4.273468550262451,15.9117Q5.676338550262451,18.2399,8.029488550262451,19.5989Q10.45578855026245,21,13.273158550262451,21Q15.40905855026245,21,17.36035855026245,20.1747Q19.244758550262453,19.3776,20.697758550262453,17.9246Q22.150758550262452,16.471600000000002,22.947858550262453,14.5872Q23.77315855026245,12.6359,23.77315855026245,10.5Q23.77315855026245,8.36411,22.947858550262453,6.41277Q22.150758550262452,4.52837,20.697758550262453,3.07538Q19.244758550262453,1.62238,17.36035855026245,0.825346Q15.40905855026245,-0.0000010000000000287557,13.273158550262451,-0.0000010000000000287557Q11.137268550262451,0,9.185928550262451,0.825347Q7.3015385502624515,1.62238,5.848538550262451,3.07538Q4.395538550262451,4.52838,3.5985045502624513,6.41277Q2.773157550262451,8.36411,2.773157550262451,10.5L3.773157550262451,10.5Q3.773157550262451,8.5669,4.519508550262451,6.80232Q5.240558550262451,5.09757,6.555648550262451,3.78249Q7.870728550262451,2.4674,9.575478550262451,1.74635Q11.340058550262452,1,13.273158550262451,0.9999990000000001Q15.20625855026245,0.9999990000000001,16.97085855026245,1.74635Q18.67555855026245,2.4674,19.990658550262452,3.78249Q21.30575855026245,5.09756,22.02675855026245,6.80232Q22.77315855026245,8.56689,22.77315855026245,10.5Q22.77315855026245,12.4331,22.02675855026245,14.1977Q21.30575855026245,15.9024,19.990658550262452,17.2175Q18.67555855026245,18.5326,16.97085855026245,19.2536Q15.20625855026245,20,13.273158550262451,20Q10.723788550262451,20,8.529578550262451,18.7329Z" />
                      </g>
                      <g>
                        <path d="M3.550505625,10.916025850524903L7.836225625,8.058885850524902L7.281525625,7.226835850524902L3.411835625,9.806625850524902L0.832040625,5.936935850524902L-0.00000937499999997815,6.4916358505249026L2.857135625,10.777345850524902Q2.884445625,10.818325850524904,2.919235625,10.853185850524902Q2.954025625,10.888045850524902,2.994935625,10.915445850524902Q3.035855625,10.942845850524902,3.081335625,10.961735850524903Q3.126805625,10.980635850524902,3.175095625,10.990285850524902Q3.223385625,10.999945850524902,3.272635625,10.999995850524902Q3.321875625,11.000055850524902,3.370185625,10.990495850524901Q3.418495625,10.980935850524903,3.464015625,10.962135850524902Q3.509535625,10.943345850524903,3.550505625,10.916025850524903Z" />
                      </g>
                    </g>
                  </svg>
                </div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(TextGenerate)
