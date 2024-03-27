import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

function Markdown({ code, placeholder }) {
  const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: true, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false // 使用更为时髦的标点
  })

  const changeContent = () => {
    setArticleContent(code)
    let html = marked(code || placeholder)
    setMarkdownContent(html)
  }

  useEffect(() => {
    changeContent()
  }, [code])

  return (
    <div
      style={{
        color: '#eee',
        background: '#000',
        height: '100%',
        width: '100%',
        padding: '3px 8px',
        minHeight: '300px',
        backgroundColor: 'rgb(23 23 23/var(--tw-bg-opacity))'
      }}
    >
      <div className="show-html" dangerouslySetInnerHTML={{ __html: marked.parse(markdownContent) }}></div>
    </div>
  )
}

export default Markdown
