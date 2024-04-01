"use client";

import { React } from 'react'
import { Layout, Tabs, Radio, Button, Checkbox, Spin, Dropdown, Input } from 'antd'
const { TextArea } = Input;

const PromptTextarea = (props) => {
  const { promptText, setPromptText } = props;
  const onTextChange = (e) => {
    setPromptText(e.target.value)
  }
  return (
    <div className='container bg-[#fff] rounded-xl p-[24px] h-[70vh] flex justify-between'>
      <div className='h-[100%] w-[49%]'>
        <div className='mb-[12px]'>原始prompt</div>
        <div style={{ height: 'calc(100% - 36px)' }} className='rounded-xl  border-solid border border-slate-300 overflow-hidden p-3'>
          <TextArea onChange={onTextChange} style={{ height: 'calc(100% - 36px)', resize: 'none', padding: '0', border: 'none', boxShadow: 'none' }} autoSize={false}></TextArea>
          <div className='flex items-center justify-between mt-[8px]'>
            <span></span>
            <span>
              <span className='mr-[4px]'>
                <span>{promptText?.length}</span>
                /1000
              </span>
              <Button defaultBg='#ffffff' styles={{ defaultBg: 'red' }} className='bg-[#fff]' type="primary" size={'small'}>优化</Button>
            </span>
          </div>
        </div>

      </div>
      <div className='h-[100%] w-[49%] ' >
        <div className='mb-[12px]'>优化prompt</div>
        <div style={{ height: 'calc(100% - 36px)' }} className='rounded-xl  border-solid border border-slate-300 overflow-hidden p-3'>
          <TextArea style={{ height: 'calc(100% - 36px)', resize: 'none', padding: '0', border: 'none', boxShadow: 'none', }} autoSize={false}></TextArea>
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