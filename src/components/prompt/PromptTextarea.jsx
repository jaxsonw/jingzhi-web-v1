"use client";

import React, { useEffect, useState, useRef } from 'react'
import { Layout, Tabs, Radio, Button, Checkbox, Spin, Dropdown, Input } from 'antd'
import { isEmpty } from 'lodash'
import { openAi } from '../../services/promptService'
import { Markdown } from '../base/markdown'

const { TextArea } = Input;

const PromptTextarea = (props) => {
  const messageRef = useRef()

  const { promptText, setPromptText } = props;
  const [keys, setKeys] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)



  const onTextChange = (e) => {
    const list = JSON.parse(JSON.stringify(keys))
    const indexItem = {
      'key': e?.target?.value,
    }
    console.log(indexItem, 'indexItem')
    list[0] = indexItem
    setKeys(list)

    // setPromptText(e.target.value)
  }

  const onGenerate = () => {
    // const userInfo = localStorage.getItem('userInfo') || '{}'
    // if (Object.keys(JSON.parse(userInfo)) && !JSON.parse(userInfo)?.mobile) {
    //   // showConfirm()
    //   return
    // }

    // const allValuesNotEmpty = every(keys, obj => {
    //   return every(obj, value => !isEmpty(value))
    // })
    // if (!allValuesNotEmpty) {
    //   Toast.error('请填写必要参数！')
    //   return
    // }

    setLoading(true)
    // Router.push(`/app/${Router.query?.appId}?time=${new Date().getTime()}`)
    const params = {
      path: '/v1/service/apiAppGenerate',
      appId: '649d0349ce107',
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

  console.log(keys, 'keys')

  //649d0349ce107
  return (
    <div className='bg-[#fff] rounded-xl p-[24px] h-[70vh] flex justify-between'>
      <div className='h-[100%] w-[49%]'>
        <div className='mb-[12px]'>原始prompt</div>
        <div style={{ height: 'calc(100% - 36px)' }} className='rounded-xl  border-solid border border-slate-300 overflow-hidden p-3'>
          <TextArea onChange={onTextChange} style={{ height: 'calc(100% - 36px)', resize: 'none', padding: '0', border: 'none', boxShadow: 'none' }} autoSize={false}></TextArea>
          <div className='flex items-center justify-between mt-[8px]'>
            <span></span>
            <span>
              <span className='mr-[8px]'>
                <span>{keys[0]?.key?.length}</span>
                /1000
              </span>
              <Button onClick={onGenerate} loading={loading} className='bg-[#fff]' type="primary" size={'small'} disabled={isEmpty(keys[0]?.key)}>优化</Button>
            </span>
          </div>
        </div>

      </div>
      <div className='h-[100%] w-[49%] ' >
        <div className='mb-[12px]'>优化prompt</div>
        <div style={{ height: 'calc(100% - 36px)' }} className='rounded-xl  border-solid border border-slate-300 overflow-hidden p-3'>
          {/* <TextArea style={{ height: 'calc(100% - 36px)', resize: 'none', padding: '0', border: 'none', boxShadow: 'none', }} autoSize={false}></TextArea> */}
          <div className="grow h-[calc(100%_-38px)] overflow-y-auto rounded-md  bg-white  ">
            <div ref={messageRef} className="basis-3/4 h-max p-5    rounded">
              <Markdown content={content} />

            </div>
          </div>

          <div className='flex items-center justify-between mt-[8px]'>
            <span>本次消耗Token数为：</span>
            <span>
              <Button type="primary" size={'small'} className='mr-[4px]'>复制</Button>
              <Button type="primary" size={'small'}>保存为模版</Button>
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PromptTextarea