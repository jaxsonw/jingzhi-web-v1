"use client"
import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Select,  message } from 'antd'
import Selector from './components/Selector'
import { openAi, checkCodeValid, chatCode, getModel } from '../../services/index'
import { browser, copyValue } from '../../utils/index'
import { clearTokenKey } from '../../utils/localStorage'
import { saveAnswer, saveQuestion } from '../../services/recordService'
import menuIcons from "./menuIcons"
import Markdown from '../../components/code/codeMarkdown'
import baseHooks from '../../components/hooks/base'
import { navList, pl, options, methods, CodeEdit } from './consts'
// react-markdown

const people = [
  {
    id: 1,
    name: 'Wade Cooper',
    icon:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    icon:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Devon Webb',
    icon:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Tom Cook',
    icon:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Tanya Fox',
    icon:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    icon:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    icon:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Mason Heaney',
    icon:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    icon:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    icon:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
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
        const defaultValue = res.data.recordList.find(item => item.apiModelName === 'gemma-7b-it')
        setModel(defaultValue || res.data.recordList[0].apiModelName)
      }
    }
  }
  useEffect(() => {
    getModelList()
  }, [])
  const createLanguage = () => {
    if (method === '3') {
      return `I hope you can help me convert this code into TypeScript. i will do so by putting text inside curly brackets {like this}. My first command is {“${msg}}`
    }

    if (method === '2') {
      return `I hope you can help me find out the error in this code.I hope you only reply to the terminal output in a unique code block with a detailed explanation in Chinese, i will do so by putting text inside curly brackets {like this}. My first command is {“${msg}}`
    }

    if (method === '4') {
      return `I hope you can convert my input code into ${language} interpreter and return it to me.I hope you only reply to the terminal output in a unique code block with a detailed explanation in Chinese, i will do so by putting text inside curly brackets {like this}. My first command is {“${msg}}`
    }

    return `Your name is 小蓝, the language learning assistant, and you can only answer questions related to programming.  I hope you only reply to the output in code  with a detailed explanation in Chinese, and nothing else.    Do not type commands unless I instruct you to do so.    When i need to tell you something in english, i will do so by putting text inside curly brackets {like this}.My first command is {“${msg}“}`
    // return `I will write you the code and you will respond with the output of the ${language} interpreter. I hope you only reply to the terminal output in a unique code block with a detailed explanation in Chinese, and nothing else. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. My first command is {“${msg}“}`;
  }

  const copy = () => {
    copyValue(code)
    message.success('复制成功')
  }

  const record = (question = '', answer = '') => {
    saveQuestion(question)
    saveAnswer(answer)
  }
  const onCopy = () => {
    message.success('复制成功')
  }
  const submit = async () => {
    if (!msg) {
      return message.info('请输入要问的问题！')
    }

    //     https://codeapi.xixibot.com/v1/service/checkCodeValid
    // 这个接口新增了请求参数
    //     language 语言，如javascript
    //     type 类型 1疑问解答 2错误检测 3添加类型 4语言转换

    // 拿接口返回的message字段直接请求，不用C端处理指令了

    setLoading(true)
    setCode('加载中')
    try {
      const res = await chatCode({
        codeType: currentMenu,
        codeText: msg,
        model,
      }, {
        onMessage(data) {
          // console.log(data.content, "<=====")
          setCode(data.content)
          // setMarkdownContent(marked(data.content))
        },
        onEnd(data) {
          setLoading(false)
          // 记录问答
          record(msg, data.content)
          // setCode(data.content)
          // setMarkdownContent(marked(data.content))
        },
        onError(err) {
          setLoading(false)
          message.error(err.message)
          setLoading(false)
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
    //   let key = undefined
    //   if (res.code === 0) {
    //     console.log(atob(res.data.token))
    //     key = atob(res.data.token)
    //     window.sessionStorage.setItem('openkey', key)
    //   }
    //   if (!key) {
    //     if (res.message === '请先登录') {
    //       clearTokenKey()
    //     }
    //     return message.info(res.message)
    //   }
    //   setLoading(false)
    //   //setCode(res.data.content);
    // } catch {
    //   setCode('')
    //   message.info('请再试一次')
    // } finally {
    //   setLoading(false)
    // }
    // codeType: currentMenu,
    //   codeType: msg,
    //   model: 'Qfan/ERNIE-Bot',
    //流开始
    // const mm = createLanguage()
    // openAi(mm, {
    //   onMessage(data) {
    //     // console.log(data.content, "<=====")
    //     setCode(data.content)
    //     // setMarkdownContent(marked(data.content))
    //   },
    //   onEnd(data) {
    //     setLoading(false)
    //     // 记录问答
    //     record(msg.trim(), data.content)
    //   }
    // }).then(
    //   res => {
    //     console.log(res.data.content)
    //     // setCode(res.data.content);
    //     // setLoading(false);
    //   },
    //   () => setLoading(false)
    // )
  }

  const getMessage = message => {
    setMessage(message)
  }

  const onClickMenu = (menu) => {
    setCurrentMenu(menu.type)
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
            <Selector options={modelList} defaultValue={modelList && modelList.length ? modelList[0] : null} placeholder="请选择模型" onChange={(v) => {
              setModel(v.id)
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
              <button type="button" className="ml-[10px] text-white text-xs md:text-sm" onClick={onCopy}>复制</button>
              {/* 后期在加导出 导出各类型文件*/}
              {/*<button type="button" className="ml-[10px]" onClick={submit}>导出</button>*/}
            </div>
            <div className="flex justify-center">
              <Button type="primary" style={{ background: '#3162FF' }} loading={loading}
                      onClick={submit}>发送</Button>
            </div>
          </div>
        </div>
      </div>
      {/*<Row className="h-full">*/}
      {/*  <Col xs={24} sm={24} md={24} lg={12} xl={12}>*/}
      {/*    <div className="h-[calc(100%_-_50px)]">*/}
      {/*      <CodeEdit placeholder={pl} showGutter={!mobile} onChange={getMessage} mode={language} />*/}
      {/*    </div>*/}

      {/*<div className="flex items-center justify-between h-[50px] py-0  px-[15px] bg-[#18181b]">*/}
      {/*  <Select*/}
      {/*    className="selectAnt"*/}
      {/*    placement="topRight"*/}
      {/*    popupClassName="menu"*/}
      {/*    defaultValue="1"*/}
      {/*    style={{ width: 180, border: '0px' }}*/}
      {/*    onChange={val => setMethod(val)}*/}
      {/*    options={methods}*/}
      {/*  />*/}

      {/*  <Button type="primary" style={{ background: '#333' }} loading={loading} onClick={submit}>*/}
      {/*    发送*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*  </Col>*/}

      {/*  <Col xs={24} sm={24} md={24} lg={12} xl={12}>*/}
      {/*    <div className="border-l border-slate-700 h-[calc(100%_-_50px)]">*/}
      {/*      <Markdown code={code} placeholder="```// 构建代码将出现在这里 ```" />*/}
      {/*    </div>*/}

      {/*    <div className="flex items-center justify-between h-[50px] py-0  px-[15px] bg-[#18181b]">*/}
      {/*      <Select*/}
      {/*        className="selectAnt"*/}
      {/*        placement="topRight"*/}
      {/*        popupClassName="menu"*/}
      {/*        defaultValue="javascript"*/}
      {/*        style={{ width: 180, border: '0px' }}*/}
      {/*        onChange={val => setLanguage(val)}*/}
      {/*        options={options}*/}
      {/*      />*/}

      {/*      {!loading && code && (*/}
      {/*        <Button type="primary" style={{ background: '#333' }} onClick={copy}>*/}
      {/*          复制*/}
      {/*        </Button>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

      {/* 操作面板暂时不要 */}
      {/*<div className={`fixed ${openPanel ? 'right-0' : 'right-[-100%]'} top-0 h-full w-1/4 z-50 transition-all`}>*/}
      {/*  {*/}
      {/*    !openPanel && (*/}
      {/*      <button onClick={() => setOpenPanel(true)} type="button" className="text-white fixed right-0 top-[calc(100%/2)] animate-bounceLR">*/}
      {/*        <svg t="1710987058045" className="icon" viewBox="0 0 1024 1024" version="1.1"*/}
      {/*             xmlns="http://www.w3.org/2000/svg" p-id="20326" width="48" height="48">*/}
      {/*          <path*/}
      {/*            d="M512 1024c-159.061333 0-238.549333 0-301.269333-25.984a341.333333 341.333333 0 0 1-184.746667-184.746667C0 750.549333 0 671.018667 0 512c0-159.061333 0-238.549333 25.984-301.269333a341.333333 341.333333 0 0 1 184.746667-184.746667C273.450667 0 352.938667 0 512 0c159.018667 0 238.549333 0 301.269333 25.984a341.333333 341.333333 0 0 1 184.746667 184.746667C1024 273.450667 1024 352.938667 1024 512c0 159.018667 0 238.549333-25.984 301.269333a341.333333 341.333333 0 0 1-184.746667 184.746667C750.549333 1024 671.018667 1024 512 1024z"*/}
      {/*            fill="#27AD9A" p-id="20327"></path>*/}
      {/*          <path*/}
      {/*            d="M245.845333 485.546667a34.133333 34.133333 0 0 0 0 52.906666L475.434667 725.333333a34.133333 34.133333 0 0 0 55.68-26.453333v-85.76l301.866666-67.84c35.584-7.936 35.584-58.581333 0-66.56l-301.866666-67.84V325.12A34.133333 34.133333 0 0 0 475.434667 298.666667l-229.546667 186.88z"*/}
      {/*            fill="#FFFFFF" p-id="20328"></path>*/}
      {/*        </svg>*/}
      {/*      </button>*/}
      {/*    )*/}
      {/*  }*/}
      {/*  <div className="h-full w-full bg-slate-950/80">*/}
      {/*    <div className="flex items-center text-white px-[20px] py-[10px] border-b border-slate-700 cursor-pointer">*/}
      {/*      <button type="button" className="flex items-center" onClick={() => setOpenPanel(false)}>*/}
      {/*        <svg t="1710988174253" className="icon" viewBox="0 0 1024 1024" version="1.1"*/}
      {/*             xmlns="http://www.w3.org/2000/svg" p-id="21305" width="32" height="32">*/}
      {/*          <path*/}
      {/*            d="M631.04 161.941333a42.666667 42.666667 0 0 1 63.061333 57.386667l-2.474666 2.730667-289.962667 292.245333 289.706667 287.402667a42.666667 42.666667 0 0 1 2.730666 57.6l-2.474666 2.752a42.666667 42.666667 0 0 1-57.6 2.709333l-2.752-2.474667-320-317.44a42.666667 42.666667 0 0 1-2.709334-57.6l2.474667-2.752 320-322.56z"*/}
      {/*            fill="#ffffff" p-id="21306"></path>*/}
      {/*        </svg>*/}
      {/*        返回*/}
      {/*      </button>*/}
      {/*      <div className="flex-1 text-center text-white text-base">操作面板</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
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
