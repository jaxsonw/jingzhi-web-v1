'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Button, Input, Modal } from 'antd-xijing'

import { every, isEmpty } from 'lodash'
import Avatar from 'react-avatar'
import Empty from '../components/Empty'
import { toast as Toast } from 'react-toastify'
import { openAi } from '../../../../services/promptService'

import { Markdown } from '../../../../components/base/markdown'
import copy from 'copy-to-clipboard'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'



const { TextArea } = Input

const TextGenerate = ({ appDetail, appColor }) => {
  const messageRef = useRef()

  const [loading, setLoading] = useState(false)
  const [keys, setKeys] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [content, setContent] = useState('')
  const { confirm } = Modal
  const router = useRouter()

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

  const onGenerate = () => {
    const userInfo = localStorage.getItem('userInfo') || '{}'
    if (Object.keys(JSON.parse(userInfo)) && !JSON.parse(userInfo)?.mobile) {
      showConfirm()
      return
    }

    const allValuesNotEmpty = every(keys, obj => {
      return every(obj, value => !isEmpty(value))
    })
    if (!allValuesNotEmpty) {
      Toast.error('请填写必要参数！')
      return
    }

    setLoading(true)
    router.push(`/app/${router.query?.appId}?time=${new Date().getTime()}`)
    const params = {
      path: '/v1/service/text/generate',
      appId: appDetail?.appId,
      dialogId: 0,
      paramsList: keys,
      model: 'gpt-3.5-turbo'
    }

    try {
      const options = {
        scene: 2,
        onMessage: (data) => {
          const newMsg = data?.content
          setContent(newMsg)
        },
        onEnd: async data => {
          setLoading(false)
          const newMsg = data?.content
          setContent(newMsg)
        },
      }

      openAi(params, options)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    const keyList = appDetail?.config?.fieldList.map((item) => {
      return {
        [item.field]: '',
      }
    })
    setKeys(keyList)
  }, [appDetail])

  const onWheel = (event) => {
    if (isEdit) return
    if (event.deltaY !== 0) {
      // setStopAutoScroll(true);
      messageRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }

  const onClear = () => {
    appDetail?.config?.fieldList.forEach((item, index) => {
      const list = JSON.parse(JSON.stringify(keys))
      const indexItem = {
        [item.field]: '',
      }
      list[index] = indexItem
      setKeys(list)
    })
  }

  useEffect(() => {
    if (isEdit) return
    // if (stopAutoScroll) return;
    messageRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [content])

  console.log('keys', keys)

  return (
    <div className="flex h-full flex-col md:flex-row overflow-y-auto">
      <section className="max-w-full md:w-1/3 p-4 rounded-l-2xl shrink-0 relative flex flex-col pb-10 md:h-full border-r border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-[45px] h-[45px] flex items-center justify-center explore-item flex-none overflow-hidden rounded-lg   bg-white p-1">
            <Avatar
              value="86%"
              textSizeRatio={20}
              // @ts-ignore
              color={appColor}
              name={appDetail?.name}
            />
            {/* <AvatarGenerator width="20" height="20" colors={['#2f54eb', '#c41d7f', '#722ed1']} backgroundColor="#fff" /> */}
          </div>
          <div className="text-xl flex flex-col text-gray-800 font-semibold">
            {appDetail?.name}
            <span className="text-lg whitespace-wrap text-gray-500 ">{appDetail?.desc}</span>
          </div>
        </div>
        <div>
          {appDetail?.config?.fieldList?.map((item, index) => {
            return (
              <div key={index} className="w-full mt-4">
                {/* <label className="text-gray-900 text-md font-medium">
                  <span>{item.remark}</span> <button>清空</button>
                </label> */}
                <div className="mt-2">
                  {/* <textarea
                    onChange={e => {
                      const list = JSON.parse(JSON.stringify(keys))
                      const indexItem = {
                        [item.field]: e?.target?.value,
                      }
                      list[index] = indexItem
                      setKeys(list)
                    }}
                    className="block w-full h-[450px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  text-md focus:ring[#3162FF] focus:border-[#3162FF] "
                    placeholder={item.remark}
                  /> */}
                  <TextArea
                    onChange={e => {
                      const list = JSON.parse(JSON.stringify(keys))
                      const indexItem = {
                        [item.field]: e?.target?.value,
                      }
                      list[index] = indexItem
                      setKeys(list)
                    }}
                    value={keys?.[index]?.[item.field]}
                    // label={item.remark}
                    // variant="bordered"
                    // labelPlacement="outside"
                    placeholder={item.remark}
                    // size="lg"
                    className="max-w-full text-lg font-bold"
                  />
                </div>
              </div>
            )
          })}

          <div className="flex justify-end mt-[20px]">
            <Button className="mr-2" onClick={onClear}>
              清空内容
            </Button>
            <Button loading={loading} onClick={onGenerate} disabled={loading} type="primary">
              <span className="font-bold text-md">运行</span>
            </Button>
          </div>
        </div>
      </section>
      <div className="w-full h-full md:w-2/3  rounded-r-2xl bg-[#f9fafb]">
        <div className="flex  flex-col  h-full shrink-0 px-4 py-4">
          <div className="shrink-0 mb-4  flex items-center justify-between">
            <div className="flex items-center justify-between  w-full">
              <div className="text-lg text-gray-800 font-semibold">生成结果</div>
              {content && !loading && (
                <div className="flex items-center">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    type="button"
                    className=" flex items-cetenr text-gray-900  hover:bg-[black] hover:text-[white] border border-gray-800  font-medium rounded-lg text-sm px-5 h-[35px] flex items-center text-center mr-2     "
                  >
                    <svg
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    {isEdit ? '取消编辑' : '编辑文案'}
                  </button>

                  <Button
                    onClick={() => {
                      copy(content)
                      Toast.success('复制成功')
                    }}
                  // icon={
                  //   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  //     <path
                  //       d="M9.3335 2.33341C9.87598 2.33341 10.1472 2.33341 10.3698 2.39304C10.9737 2.55486 11.4454 3.02657 11.6072 3.63048C11.6668 3.85302 11.6668 4.12426 11.6668 4.66675V10.0334C11.6668 11.0135 11.6668 11.5036 11.4761 11.8779C11.3083 12.2072 11.0406 12.4749 10.7113 12.6427C10.337 12.8334 9.84692 12.8334 8.86683 12.8334H5.1335C4.1534 12.8334 3.66336 12.8334 3.28901 12.6427C2.95973 12.4749 2.69201 12.2072 2.52423 11.8779C2.3335 11.5036 2.3335 11.0135 2.3335 10.0334V4.66675C2.3335 4.12426 2.3335 3.85302 2.39313 3.63048C2.55494 3.02657 3.02665 2.55486 3.63056 2.39304C3.8531 2.33341 4.12435 2.33341 4.66683 2.33341M5.60016 3.50008H8.40016C8.72686 3.50008 8.89021 3.50008 9.01499 3.4365C9.12475 3.38058 9.21399 3.29134 9.26992 3.18158C9.3335 3.05679 9.3335 2.89345 9.3335 2.56675V2.10008C9.3335 1.77338 9.3335 1.61004 9.26992 1.48525C9.21399 1.37549 9.12475 1.28625 9.01499 1.23033C8.89021 1.16675 8.72686 1.16675 8.40016 1.16675H5.60016C5.27347 1.16675 5.11012 1.16675 4.98534 1.23033C4.87557 1.28625 4.78634 1.37549 4.73041 1.48525C4.66683 1.61004 4.66683 1.77338 4.66683 2.10008V2.56675C4.66683 2.89345 4.66683 3.05679 4.73041 3.18158C4.78634 3.29134 4.87557 3.38058 4.98534 3.4365C5.11012 3.50008 5.27347 3.50008 5.60016 3.50008Z"
                  //       stroke="#ffffff"
                  //       strokeWidth="1.25"
                  //       strokeLinecap="round"
                  //       strokeLinejoin="round"
                  //     ></path>
                  //   </svg>
                  // }
                  >
                    复制
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div onWheel={onWheel} className="grow h-full overflow-y-auto rounded-md  bg-white  ">
            {!content ? (
              <Empty />
            ) : (
              <div ref={messageRef} className="basis-3/4 h-max p-5    rounded">
                {isEdit ? (
                  <textarea
                    rows={25}
                    value={content}
                    onChange={e => setContent(e?.target?.value)}
                    id="message"
                    className="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring[#3162FF] focus:border-[#3162FF] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring[#3162FF] dark:focus:border-[#3162FF]"
                    placeholder="Write your thoughts here..."
                  />
                ) : (
                  <Markdown content={content} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextGenerate
