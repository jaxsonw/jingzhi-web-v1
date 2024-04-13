import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-terminal' // monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'
// import 'ace-builds/webpack-resolver'

const CodeEdit = ({ onChange, ...other }) => {
  function change(newValue) {
    onChange && onChange(newValue)
  }
  return (
    <>
      <AceEditor
        style={{
          height: '100%',
          width: '100%',
          minHeight: '400px',
          padding: '16px'
          // backgroundColor: 'rgb(23 23 23/var(--tw-bg-opacity))'
        }}
        wrapEnabled={true}
        mode="javascript"
        theme="terminal"
        showPrintMargin={false} // 右侧的竖线
        fontSize={14}
        onChange={onChange}
        readOnly={true}
        enableSnippets={true}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}

        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: true,
          showLineNumbers: true,
          wrap: true,
          copyWithEmptySelection: true,
          showFoldWidgets: false, // 显示折叠小三角
          displayIndentGuides: false // 显示缩进辅助线
        }}
        {...other}
      />
    </>
  )
}

export default CodeEdit
