import dynamic from 'next/dynamic'
export const navList = [
  {
    name: "改善",
    children: [
      {
        name: "检测错误",
        component: null,
        icon: null,
        type: '1'
      },
      {
        name: "解释代码",
        component: null,
        icon: null,
        type: '2'
      },
      // {
      //   name: "硬编码",
      //   component: null,
      //   icon: null,
      //   type: "literals"
      // },
      // {
      //   name: "调试",
      //   component: null,
      //   icon: null,
      //   type: "debug"
      // },
      // {
      //   name: "重构",
      //   component: null,
      //   icon: null,
      //   type: "refactor"
      // },
      // {
      //   name: "风格检查",
      //   component: null,
      //   icon: null,
      //   type: "style"
      // },
      // {
      //   name: "添加类型",
      //   component: null,
      //   icon: null,
      //   type: "addType"
      // },
      // {
      //   name: "改进代码",
      //   component: null,
      //   icon: null,
      //   type: "improve"
      // }
    ]
  },
  // {
  //   name: "生成",
  //   children: [
  //     {
  //       name: "创建函数",
  //       component: null,
  //       icon: null,
  //       type: "createFunction"
  //     },
  //     {
  //       name: "创建文档",
  //       component: null,
  //       icon: null,
  //       type: "createDocument"
  //     },
  //     {
  //       name: "创建CI/CD",
  //       component: null,
  //       icon: null,
  //       type: "createCICD"
  //     },
  //     {
  //       name: "生成单元测试",
  //       component: null,
  //       icon: null,
  //       type: "createUnitTest"
  //     },
  //     {
  //       name: "生成正则表达式",
  //       component: null,
  //       icon: null,
  //       type: "createRegex"
  //     },
  //     {
  //       name: "生成SQL查询",
  //       component: null,
  //       icon: null,
  //       type: "createSQL"
  //     },
  //     {
  //       name: "生成CSP",
  //       component: null,
  //       icon: null,
  //       type: "createCSP"
  //     },
  //     {
  //       name: "生成图表",
  //       component: null,
  //       icon: null,
  //       type: "createChart"
  //     }
  //   ]
  // },
  // {
  //   name: "转换",
  //   children: [
  //     {
  //       name: "转换代码",
  //       component: null,
  //       icon: null,
  //       type: "convertCode"
  //     },
  //     {
  //       name: "转换CSS",
  //       component: null,
  //       icon: null,
  //       type: "convertCSS"
  //     }
  //   ]
  // }
]
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

export const options = [
  { value: 'java', label: 'java' },
  { value: 'javascript', label: 'javascript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Python', label: 'Python' },
  { value: 'PHP', label: 'PHP' },
  { value: 'C++', label: 'C++' },
  { value: 'C#', label: 'C#' }
]

export const methods = [
  { value: '1', label: '疑问解答' },
  { value: '2', label: '错误检测' },
  { value: '3', label: '添加类型' },
  { value: '4', label: '语言转换' }
]

export const CodeEdit = dynamic(
  () => {
    return import('../../components/code/codeShow')
  },
  { ssr: false }
)

export const pl = `
/ * 在这里，您可以使用AI：
  * - 重构代码
  * - 样式检查
  * - 添加类型
  * 然后，选择语言。
  * 最后，按下“发送”，观看神奇的发生！
* /
`
