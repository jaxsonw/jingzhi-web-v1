'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Button, Progress } from '@nextui-org/react'
import { PulseLoader as Loading } from 'react-spinners'
import { Dialog } from '@headlessui/react'
import Router from 'next/router'
import Avatar from 'react-avatar'
import ChatModal from './chatModal'
import { getMyAppDialog, getRecord, deleteAppDialog, createAppChat, openAi } from '../../../../services/promptService'
// import { AppAvatorColors } from '../../../consts/'
import { toast } from 'react-toastify'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { Modal } from 'antd-xijing'
interface ChatProps { 
  appDetail: any
  loading: boolean
  appColor: string
}

const CHAT_URL = '/v1/service/chat/generate'

const Chat = ({ appColor, loading, appDetail }: ChatProps) => {
  const router = useRouter()

  const configList = appDetail?.config?.fieldList

  const newDialog: any = {
    name: '新的对话',
    dialogId: 0,
    isNew: true,
    config: configList || [],
  }
  const messageRef = useRef<HTMLDivElement>(null)
  const isUseInputMethod = useRef(false)

  const [input, setInput] = useState('')

  const [appDialogs, setAppDialogs] = useState([])
  const [appRecord, setAppRecord] = useState([])
  const [currentDialog, setCurrentDislog] = useState<any>()
  const [deleteDialogLoading, setDeleteDialogLoading] = useState(false)
  //   sse loading
  const [generateLoading, setGenerateLoading] = useState(false)

  //   记录 loading
  const [recordLoading, setRecordLoading] = useState(false)

  //   会话列表 loading
  const [dialogsLoading, setDialogsLoading] = useState(false)
  //   create loading
  const [createLoading, setCreateLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { confirm } = Modal

  const onCreate = async () => {
    if (createLoading) return
    setCreateLoading(true)
    const params = {
      appId: appDetail?.appId,
      name: `新会话`,
    }

    await createAppChat(params)
    setMobileMenuOpen(false)

    setCreateLoading(false)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getAppDialogList()
  }

  const onDelete = async id => {
    if (deleteDialogLoading) return
    setDeleteDialogLoading(true)

    const res = await deleteAppDialog({ dialogId: id })
    setDeleteDialogLoading(false)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getAppDialogList()
    if (res?.code === 0) {
      toast.success('删除成功～')
    } else {
      toast.error('删除失败～')
    }
  }

  const getAppDialogList = async () => {
    setDialogsLoading(true)

    const appDialogsRes: any = await getMyAppDialog({
      appId: appDetail?.appId,
    })
    setDialogsLoading(false)
    if (appDialogsRes?.data?.recordList.length === 0 || !appDialogsRes?.data?.recordList) {
      onCreate()
      return
    }
    const cloneObj = JSON.parse(JSON.stringify(appDialogsRes?.data?.recordList))
    setAppDialogs(cloneObj)
    setCurrentDislog(cloneObj?.[0] || newDialog)
  }

  const getAppRecord = async ({ dialogId }: { dialogId: string }) => {
    setRecordLoading(true)
    const appRecordRes = await getRecord({
      appId: appDetail?.appId,
      dialogId,
    })
    setRecordLoading(false)

    const list = appRecordRes?.data?.recordList
    if (list?.length === 0 && appDetail?.config?.welcome) {
      list.push({
        id: (new Date().getTime() / 1000) * Math.random(),
        content: appDetail?.config?.welcome,
        isAnswer: true,
      })
    }
    setAppRecord(list)
  }

  const showConfirm = () => {
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleFilled />,
      className: 'top-[35%] w-[500px]',
      content: '检测到您当前的账号并未绑定手机号，根据相关规定，您需要绑定手机号才可以使用人工智能服务。',
      okText: '去绑定',
      onOk() {
        router.push('/login?bindphone=1')
      },
      onCancel() {
        router.push('/')
      },
    })
  }

  const onSend = () => {
    const userInfo = localStorage.getItem('userInfo') || '{}'
    if (!JSON.parse(userInfo)?.mobile) {
      showConfirm()
      return
    }

    if (!input || generateLoading) return
    setGenerateLoading(true)
    setInput('')
    const sendData = {
      id: (new Date().getTime() / 1000) * Math.random(),
      content: input,
      isAnswer: false,
    }

    const answerData = {
      id: (new Date().getTime() / 1000) * Math.random(),
      content: '',
      isAnswer: true,
    }
    Router.push(`/app/${Router.query?.appId}?time=${new Date().getTime()}`)

    const list = [...appRecord, sendData, answerData]
    setAppRecord(JSON.parse(JSON.stringify(list)))
    const paramsData = {
      path: CHAT_URL,
      appId: appDetail.appId,
      dialogId: currentDialog.dialogId,
      message: input,
      paramsList: currentDialog.paramsList,
    }

    try {
      const options = {
        scene: 2,
        onMessage: (data: any) => {
          const newMsg = data?.content
          list[list.length - 1].content = newMsg
          setAppRecord(JSON.parse(JSON.stringify(list)))
        },
        onEnd: async (data: { content: any }) => {
          console.log('end', data)
          setGenerateLoading(false)
          const newMsg = data?.content
          list[list.length - 1].content = newMsg
          setAppRecord(JSON.parse(JSON.stringify(list)))
        },
      }

      openAi(paramsData, options)
    } catch {
      setGenerateLoading(false)
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current) {
        onSend()
      }
    }
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setInput(input.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  useEffect(() => {
    getAppDialogList()
  }, [appDetail])

  useEffect(() => {
    if (!currentDialog) return
    getAppRecord({
      dialogId: currentDialog?.dialogId,
    })
  }, [currentDialog])

  const onWheel = (event: any) => {
    if (event.deltaY !== 0) {
      messageRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [appRecord])

  return (
    <>
      <div className="flex h-full  overflow-y-auto">
        <div className="h-full  hidden  md:block  w-1/5 overflow-scroll border-box shrink-0 flex flex-col bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px]  border-r border-gray-200  ">
          <div className="my-4 px-4 flex items-center space-x-3">
            <div className="w-[45px] h-[45px] flex items-center justify-center explore-item flex-none overflow-hidden rounded-lg   bg-white p-1">
              <Avatar
                value="86%"
                textSizeRatio={20}
                // @ts-ignore
                color={appColor}
                name={appDetail?.name}
              />
            </div>
            <div className="w-0  flex flex-col grow text-lg font-semibold   overflow-hidden  text-ellipsis whitespace-nowrap justify-between">
              {appDetail?.name}
              <span className="text-xs whitespace-wrap text-gray-500 ">{appDetail?.desc}</span>
            </div>
          </div>
          <div className="flex flex-shrink-0 p-4 !pb-0">
            <div
              onClick={onCreate}
              className="inline-flex text-gray-900 border-[#1c64f2] justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base border-solid border border-gray-200 cursor-pointer  hover:bg-white hover:shadow-sm   group block w-full flex-shrink-0 !justify-start !h-9 text-gray-600 items-center text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="mr-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              {createLoading ? <Loading color="#36d7b7" /> : '新对话'}
            </div>
          </div>
          <nav className="mt-4  flex-1 space-y-1 bg-white p-4 !pt-0 overflow-y-auto">
            {dialogsLoading && <Progress size="sm" isIndeterminate color="primary" />}
            {appDialogs?.map((item: any, index: number) => {
              const active = item.dialogId === currentDialog?.dialogId

              return (
                <div
                  onClick={() => setCurrentDislog(item)}
                  key={`${item.dialogId}${index}`}
                  style={{
                    background: active ? appColor : '',
                    color: active ? 'white' : '',
                  }}
                  className="text-gray-700 hover:text-gray-700 group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium cursor-pointer"
                >
                  <span className="flex items-center">
                    {!active ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5 flex-shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="text-white mr-3 h-5 w-5 flex-shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {item.name}
                  </span>
                  {!active && (
                    <span className="py-1 px-1  hover:bg-gray-50 rounded">
                      <svg
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          onDelete(item.dialogId)
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
        <div className="w-full md:w-4/5 flex flex-col h-full justify-between relative">
          {/* header */}

          <div className="h-[64px] flex items-center">
            <span className="block w-10  shrink-0 md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
              </svg>
            </span>
            <div className="h-[64px]  flex w-full items-center  border-b border-gray-100 mobile:h-12 tablet:h-16 md:px-8 bg-white">
              <div className="  text-lg font-bold">{currentDialog?.name}</div>
            </div>
          </div>
          {recordLoading && <Progress size="sm" isIndeterminate color="primary" />}
          <div onWheel={onWheel} className="overflow-scroll bg-white grow top-[64px] bottom-0  ">
            <ChatModal appColor={appColor} appDetail={appDetail} messageRef={messageRef} record={appRecord} />
          </div>

          <div className="h-[56px]  bottom-0 border-box">
            <div className="flex border border-solid border-[#3162ff] items-center h-[56px] border-box  w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded shadow-xs dark:shadow-xs">
              <textarea
                id="prompt-textarea"
                tabIndex={0}
                onKeyUp={handleKeyUp}
                onKeyDown={onInputKeyDown}
                placeholder="请输入内容"
                className="m-0   grow resize-none    p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
                style={{
                  maxHeight: '200px',
                  overflowY: 'hidden',
                  outline: 'none',
                }}
                value={input}
                onChange={e => setInput(e?.target?.value)}
              />

              <Button
                onClick={onSend}
                className="h-[56px]"
                style={{
                  height: '56px',
                  width: '110px',
                  background: appColor,
                  borderRadius: 0,
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                }}
              >
                {generateLoading ? (
                  <Loading color="#36d7b7" size="sm" />
                ) : (
                  <span className="text-[white] text-sm whitespace-pre-line flex">发送</span>
                )}
              </Button>
            </div>
          </div>
        </div>
        <Dialog as="div" className="block md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10  " />
          <Dialog.Panel className="fixed inset-y-0 bg-[white] top-[65px] left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="h-[calc(100%_-_65px)]   w-full overflow-scroll border-box shrink-0 flex flex-col bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px]   ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 fixed right-5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

              <div className="my-4 px-4 flex items-center space-x-3">
                <div className="w-[45px] h-[45px] flex items-center justify-center explore-item flex-none overflow-hidden rounded-lg   bg-white p-1">
                  <Avatar
                    value="86%"
                    textSizeRatio={20}
                    // @ts-ignore
                    color={appColor}
                    name={appDetail?.name}
                  />
                </div>
                <div className="w-0  flex flex-col grow text-lg font-semibold   overflow-hidden  text-ellipsis whitespace-nowrap justify-between">
                  {appDetail?.name}
                  <span className="text-xs whitespace-wrap text-gray-500 ">{appDetail?.desc}</span>
                </div>
              </div>
              <div className="flex flex-shrink-0 p-4 !pb-0">
                <div
                  onClick={onCreate}
                  className="inline-flex text-[#1c64f2] border-[#1c64f2] justify-center items-center content-center h-9 leading-5 rounded-lg px-4 py-2 text-base border-solid border border-gray-200 cursor-pointer text-gray-500 hover:bg-white hover:shadow-sm   group block w-full flex-shrink-0 !justify-start !h-9 text-primary-600 items-center text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>

                  {createLoading ? <Loading color="#36d7b7" /> : '新对话'}
                </div>
              </div>
              <nav className="mt-4  flex-1 space-y-1 bg-white p-4 !pt-0 overflow-y-auto">
                {dialogsLoading && <Progress size="sm" isIndeterminate color="primary" />}
                {appDialogs?.map((item: any, index: number) => {
                  const active = item.dialogId === currentDialog?.dialogId

                  return (
                    <div
                      onClick={() => {
                        setCurrentDislog(item)
                        setMobileMenuOpen(false)
                      }}
                      key={`${item.dialogId}${index}`}
                      style={{
                        background: active ? appColor : '',
                        color: active ? 'white' : '',
                      }}
                      className="text-gray-700 hover:text-gray-700 group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer"
                    >
                      {!active ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5 flex-shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="text-primary-600 mr-3 h-5 w-5 flex-shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {item.name}
                    </div>
                  )
                })}
              </nav>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  )
}

export default Chat
