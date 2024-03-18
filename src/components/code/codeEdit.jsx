import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-terminal' // monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'

const CodeEdit = ({ onChange, ...other }) => {
  function change(newValue) {
    console.log('change', newValue)
    onChange && onChange(newValue)
  }
  return (
    <>
      <AceEditor
        style={{
          height: '100%',
          width: '100%',
          minHeight: '300px'
        }}
        wrapEnabled={true}
        mode="markdown"
        theme="terminal"
        showPrintMargin={false} // 右侧的竖线
        fontSize={14}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: true,
          showLineNumbers: true,
          wrap: true,
          copy: false,
          showFoldWidgets: false, // 显示折叠小三角
          displayIndentGuides: false // 显示缩进辅助线
        }}
        {...other}
      />
    </>
  )
}

export default CodeEdit
