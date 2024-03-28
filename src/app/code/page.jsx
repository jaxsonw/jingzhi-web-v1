"use client"
import React, { useState, useEffect } from 'react'
import { Button,  message } from 'antd'
import Selector from './components/Selector'
import { chatCode, getModel } from '../../services/index'
import { browser, copyValue } from '../../utils/index'
import { saveAnswer, saveQuestion } from '../../services/recordService'
import menuIcons from "./menuIcons"
import Markdown from '../../components/code/codeMarkdown'
import baseHooks from '../../components/hooks/base'
import { navList, pl, CodeEdit } from './consts'
// react-markdown

const Index = () => {
  const [msg, setMessage] = useState('')
   const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [method, setMethod] = useState('1')
  const [loading, setLoading] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('1')
  const [collapse, setCollapse] = useState(true)
  const [model, setModel] = useState('')
  const [modelList, setModelList] = useState([])
  const { userInfo } = baseHooks()

  const { mobile } = browser()
  const getModelList = async () => {
    const res = await getModel({})
    if (res.code === 0) {
      console.log(res)
      if(res.data.recordList && res.data.recordList.length > 0) {
        setModelList(res.data.recordList.map(item => ({ id: item.apiModelName, name: item.apiModelName})))
        const defaultValue = res.data.recordList.find(item => item.apiModelName === 'gemma-7b-it')?.apiModelName
        setModel(defaultValue || res.data.recordList[0].apiModelName)
      }
    }
  }
  useEffect(() => {
    getModelList()
  }, [])
  const copy = () => {
    copyValue(code)
    message.success('复制成功')
  }

  const record = (question = '', answer = '') => {
    saveQuestion(question)
    saveAnswer(answer)
  }
  const submit = async () => {
    if (!msg) {
      return message.info('请输入要问的问题！')
    }

    setLoading(true)
    setCode('加载中')
    try {
      const res = await chatCode({
        codeType: Number(currentMenu),
        codeText: msg,
        model,
      }, {
        onMessage(data) {
          setCode(data.content)
        },
        onEnd(data) {
          setLoading(false)

          // 记录问答
          // record(msg, data.content)
          setCode(data.content)
        },
        onError(err) {
          setLoading(false)
          message.error(err.message)
          setLoading(false)
          setCode(err.message)

        }
      }).then(res => {
        console.log(res)
        setLoading(false)
      })
    } catch (e) {
      console.log(e)
      setCode('')
      setLoading(false)
      message.info('请再试一次')
    }
  }

  const getMessage = message => {
    setMessage(message)
  }

  const onClickMenu = (menu) => {
    setCurrentMenu(menu.type)
    setCollapse(true)
    if(msg) {
      submit()
    }
  }

  return (
    <div className="w-full h-screen bg-black/90 overflow-hidden">
      <div className="fixed left-0 right-0 top-0 z-50 bg-black/90 backdrop-blur-sm w-full h-16 flex items-center justify-between px-[20px] border-b border-slate-700	">
        <div className="flex">
          {mobile ?
            <button onClick={() => setCollapse(!collapse)} type="button"
                    className="mr-[1rem]">
              <svg t="1710999362926" className="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="23240" width="16" height="16">
                <path
                  d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0"
                  p-id="23241" fill="#ffffff"></path>
              </svg>
            </button>
            : <div className={`md:text-2xl sm:text-[0.4rem] font-bold text-[#3162FF]`}>Chat Code</div>}
          <div className="lg:w-64 md:w-64 sm:w-64 xs:42 ml-[10px]">
            <Selector options={modelList} defaultValue={model ? modelList.find(item => item.id === model) : modelList[0]} placeholder="请选择模型" onChange={(v) => {
              setModel(v.id)
              if(msg) {
                submit()
              }
            }}/>
          </div>
        </div>
        <div>
          {userInfo?.name ? (
            <a href="/space" className="text-sm font-semibold text-[#3162FF] text-xs md:text-base">
              个人中心
            </a>
          ) : (
            <a href="/login" className="text-sm font-semibold text-[#3162FF] border-hidden text-xs md:text-base">
              注册/登录
            </a>
          )}
        </div>
      </div>
      <div className="h-full pt-16 flex">
        {/*hidden w-full shrink-0 flex-grow flex-col border-r border-neutral-800 bg-black transition-all md:flex max-w-[73px]*/}
        <div
          className={`fixed left-0 top-16 w-full z-[9] shrink-0 flex-grow flex-col border-r border-neutral-800 bg-black transition-all ${collapse ? 'max-w-[0px]' : 'max-w-[200px]'}`}>
          <div className="flex flex-1 flex-col overflow-y-auto pb-4 h-[calc(100vh-4rem)]">
            <div className="mt-4 flex flex-grow flex-col">
              <nav className="flex-1 space-y-4" data-label="Sidebar">
                {
                  navList.map(item => {
                    if (item.children) {
                      return (
                        <div key={item.name}>
                          <p className="pb-[20px] px-[20px]">{item.name}</p>
                          {
                            item.children.map(menu => {
                              return (
                                <a
                                  onClick={() => onClickMenu(menu)}
                                  key={menu.name}
                                  className={`${currentMenu === menu.type ? collapse ? 'text-white border-transparent' : 'text-white' : 'border-transparent'} px-[20px] text-neutral-400 cursor-pointer hover:bg-neutral-900 hover:text-white group flex items-center gap-3 py-2 text-sm font-medium`}>
                                  {menuIcons[menu.type] && currentMenu === menu.type ? menuIcons[menu.type].active : menuIcons[menu.type]?.normal}
                                  {!collapse ? menu.name : ''}
                                </a>
                              )
                            })
                          }
                        </div>
                      )
                    }
                  })
                }
              </nav>
            </div>
            {
              !mobile && <button onClick={() => setCollapse(!collapse)} type="button"
                                 className="absolute right-[-2.6rem] top-[35%] z-[999] shrink-0 border-neutral-800 p-[0.2rem] border rounded-r-[3rem]">
                <svg t="1710988174253" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="21305" width="32" height="32"
                     className={`icon ${collapse ? 'transform rotate-180' : ''}`}>
                  <path
                    d="M631.04 161.941333a42.666667 42.666667 0 0 1 63.061333 57.386667l-2.474666 2.730667-289.962667 292.245333 289.706667 287.402667a42.666667 42.666667 0 0 1 2.730666 57.6l-2.474666 2.752a42.666667 42.666667 0 0 1-57.6 2.709333l-2.752-2.474667-320-317.44a42.666667 42.666667 0 0 1-2.709334-57.6l2.474667-2.752 320-322.56z"
                    fill="#ffffff" p-id="21306"></path>
                </svg>
              </button>
            }
          </div>
        </div>
        <div className="h-full w-full bg-black pb-[4.5rem]">
          <div
            className="h-full relative flex py-[10px] h-full flex-col gap-4 overflow-auto sm:flex-row [&>*]:flex-1 px-[10px]">
            <div className="relative flex flex-1 overflow-hidden rounded">
              <CodeEdit placeholder={pl} showGutter={!mobile} onChange={getMessage} mode={language} />
            </div>
            <div className="relative flex flex-1 overflow-hidden rounded">
              <Markdown code={code} placeholder="```// 构建代码将出现在这里 ```" />
            </div>
          </div>
          <div
            className="fixed bottom-0 left-0 w-full z-[999] flex items-center justify-between px-[15px] py-[15px] bg-black border-t border-slate-700 mb-[10px]">
            <div className="flex">
              <button type="button" className="ml-[10px] text-white text-xs md:text-sm" onClick={copy}>复制</button>
            </div>
            <div className="flex justify-center">
              <Button type="primary" style={{ background: '#3162FF' }} loading={loading}
                      onClick={submit}>发送</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
  return {
    footer: false,
    header: true,
    suggest: false
  }
}
