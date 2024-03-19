"use client"
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Col, Row, Button, Select,  message } from 'antd'
import {  openAi, checkCodeValid } from '../../services/index'
import { browser, copyValue } from '../../utils/index'
import { clearTokenKey } from '../../utils/localStorage'
  import { saveAnswer, saveQuestion } from '../../services/recordService'

import Markdown from '../../components/code/codeMarkdown'
 
// react-markdown
const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
]

const options = [
  { value: 'java', label: 'java' },
  { value: 'javascript', label: 'javascript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Python', label: 'Python' },
  { value: 'PHP', label: 'PHP' },
  { value: 'C++', label: 'C++' },
  { value: 'C#', label: 'C#' }
]

const methods = [
  { value: '1', label: '疑问解答' },
  { value: '2', label: '错误检测' },
  { value: '3', label: '添加类型' },
  { value: '4', label: '语言转换' }
]

const CodeEdit = dynamic(
  () => {
    return import('../../components/code/codeEdit')
  },
  { ssr: false }
)

const pl = `
/ * 在这里，您可以使用AI：
  * - 重构代码
  * - 样式检查
  * - 添加类型
  * 然后，选择语言。
  * 最后，按下“发送”，观看神奇的发生！
* /
`

const Index = () => {
  const [msg, setMessage] = useState('')
   const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [method, setMethod] = useState('1')
  const [loading, setLoading] = useState(false)

  const { mobile } = browser()

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
      const res = await checkCodeValid({
        type: method,
        language,
        message: msg
      })
      let key = undefined
      if (res.code === 0) {
        console.log(atob(res.data.token))
        key = atob(res.data.token)
        window.sessionStorage.setItem('openkey', key)
      }
      if (!key) {
        if (res.message === '请先登录') {
          clearTokenKey()
        }
        return message.info(res.message)
      }
      setLoading(false)
      //setCode(res.data.content);
    } catch {
      setCode('')
      message.info('请再试一次')
    } finally {
      setLoading(false)
    }
    //流开始
    const mm = createLanguage()
    openAi(mm, {
      onMessage(data) {
        // console.log(data.content, "<=====")
        setCode(data.content)
        // setMarkdownContent(marked(data.content))
      },
      onEnd(data) {
        setLoading(false)
        // 记录问答
        record(msg.trim(), data.content)
      }
    }).then(
      res => {
        console.log(res.data.content)
        // setCode(res.data.content);
        // setLoading(false);
      },
      () => setLoading(false)
    )
  }

  const getMessage = message => {
    setMessage(message)
  }

  return (
    <div className="w-full h-screen pt-[95px]">
      <Row className="h-full">
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="h-[calc(100%_-_50px)]">
            <CodeEdit placeholder={pl} showGutter={!mobile} onChange={getMessage} mode={language} />
          </div>

          <div className="flex items-center justify-between h-[50px] py-0  px-[15px] bg-[#18181b]">
            <Select
              className="selectAnt"
              placement="topRight"
              popupClassName="menu"
              defaultValue="1"
              style={{ width: 180, border: '0px' }}
              onChange={val => setMethod(val)}
              options={methods}
            />

            <Button type="primary" style={{ background: '#333' }} loading={loading} onClick={submit}>
              发送
            </Button>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="border-r border-[1px] border-[#666666] h-[calc(100%_-_50px)]">
            <Markdown code={code} placeholder="```// 构建代码将出现在这里 ```" />
          </div>

          <div className="flex items-center justify-between h-[50px] py-0  px-[15px] bg-[#18181b]">
            <Select
              className="selectAnt"
              placement="topRight"
              popupClassName="menu"
              defaultValue="javascript"
              style={{ width: 180, border: '0px' }}
              onChange={val => setLanguage(val)}
              options={options}
            />

            {!loading && code && (
              <Button type="primary" style={{ background: '#333' }} onClick={copy}>
                复制
              </Button>
            )}
          </div>
        </Col>
      </Row>
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
