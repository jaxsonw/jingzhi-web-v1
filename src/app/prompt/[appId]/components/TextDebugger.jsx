import React, { useEffect, useState, memo } from 'react'
import { PulseLoader } from 'react-spinners'
import { cloneDeep } from 'lodash'
import { Select } from 'antd-xijing'
import { getModelList } from '@/services/home'

const Debugger = ({ generateLoading, fieldList, cueWord, onGenerate, setModelId, onReload }) => {
  const [inputFieldList, setInputFieldList] = useState([])
  const [modelList, setModelList] = useState([])

  useEffect(() => {
    getModules()
  }, [])

  const onReset = () => {
    let list = cloneDeep(inputFieldList)
    list.forEach((item, index) => {
      list[index] = {
        ...item,
        [item.field]: '',
      }
    })
    setInputFieldList(list)
  }

  const getModules = async () => {
    const { data } = await getModelList({ sceneType: 3 })
    const list = data.map(v => ({ ...v, value: v.modelId, label: v.modelName }))
    setModelList(list)
  }

  useEffect(() => {
    const newList = []
    fieldList?.forEach(item => {
      const matchingVal = inputFieldList.find(val => val.fieldId === item.fieldId)

      if (matchingVal) {
        newList.push({
          ...item,
          [item.field]: matchingVal[matchingVal?.field],
          remark: item.remark !== matchingVal.remark ? item.remark : matchingVal.remark,
          ref: React.createRef(),
        })
      } else {
        newList.push({ ...item, [item.field]: '' })
      }
    })

    setInputFieldList(newList)
  }, [fieldList])

  const onKeyChange = (index, event) => {
    const textarea = document.getElementById(`custom-textarea-${index}`)
    textarea.style.height = '40px'
    textarea.style.height = `${textarea.scrollHeight}px`
    const list = cloneDeep(inputFieldList)

    list[index] = {
      ...list[index],
      [list[index].field]: event?.target?.value,
    }

    setInputFieldList([...list])
  }

  const onSubmit = () => {
    onReload()
    onGenerate(inputFieldList)
  }

  return (
    <div className="relative grow h-full overflow-y-auto  py-4 px-6 bg-gray-50 flex flex-col">
      <div className="shrink-0">
        <div className="pb-5  rounded-xl ">
          {/* keylist title */}
          <div className="mb-4 px-3">
            <div className="flex justify-between items-center">
              <div className="font-bold text-[#3162FF] text-lg">运行模拟测试</div>
              <div style={{ height: '46px', overflow: 'hidden' }}>
                {modelList.length > 0 && <div style={{ height: '46px', overflow: 'hidden' }} >
                  <Select placeholder="选择模型" className="w-[150px] text-gray-900"
                    defaultValue={modelList.find(v => v.isDefault === 1)?.value}
                    options={modelList}
                    onChange={value => {
                      setModelId(value)
                    }} />
                </div>}
              </div>
            </div>
            <div className="mt-1 text-sm leading-normal text-gray-500">
              温馨提示：输入框内使用Ctrl+Enter（windows系统）或Command+Enter换行（MAC系统）
            </div>
          </div>

          {/* keyList */}
          <div className="px-3">
            {inputFieldList?.map((item, index) => {
              return (
                <div key={item?.fieldId} className="flex py-2 items-center justify-between">
                  <div className="mr-1 shrink-0 w-[100px] text-gray-900">{item.remark || '变量名称'}</div>
                  <textarea
                    id={`custom-textarea-${index}`}
                    disabled={generateLoading}
                    value={item[item?.field]}
                    onChange={e => onKeyChange(index, e)}
                    className="w-full  px-3 p-2.5 h-12 text-gray-900 border-0 rounded-lg grow bg-[#EAEAEA] focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-200"
                    placeholder={'请输入 “' + (item.remark || '变量名称') + '“'}
                    type="text"
                  />
                </div>
              )
            })}
          </div>
          {/* 运行 */}
          <div className="flex w-full mt-4 px-5 justify-end">
            <button
              disabled={generateLoading || !cueWord}
              className="w-[200px] h-[40px] bg-[#D96666] text-[white]  font-bold rounded-md mr-2 flex justify-center items-center"
              onClick={onReset}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="16" height="16" viewBox="0 0 21 21" className='mr-7'><g><g><ellipse cx="10.5" cy="10.5" rx="10" ry="10" fillOpacity="0" strokeOpacity="1" stroke="#FFFFFF" fill="none" strokeWidth="1" /></g><g transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-2.5918799276194022,6.2573574337263835)"><path d="M5.757358551025391,18.257354736328125L5.757358551025391,6.257354736328125L6.757358551025391,6.257354736328125L6.757358551025391,18.257354736328125L5.757358551025391,18.257354736328125Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="1" /></g><g transform="matrix(-0.7071067690849304,-0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.25735487888664466,29.591890111853672)"><path d="M5.757358551025391,26.742645263671875L5.757358551025391,14.742645263671875L6.757358551025391,14.742645263671875L6.757358551025391,26.742645263671875L5.757358551025391,26.742645263671875Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="1" /></g></g></svg>
              清空
            </button>
            <button
              disabled={generateLoading || !cueWord}
              className="w-[200px] h-[40px] bg-[#767676] text-[white] font-bold rounded-md"
              onClick={onSubmit}
            >
              {generateLoading ? <PulseLoader color="#fff" size={'12'} /> :
                <span className='flex justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="14" height="17" viewBox="0 0 18 21" className='mr-7'><g><path d="M0.75351,20.931L17.7535,10.931Q17.8652,10.8652,17.931,10.7535Q17.9559,10.7111,17.9721,10.6646Q17.9883,10.6181,17.9952,10.5693Q18.002,10.5205,17.9992,10.47135Q17.9964,10.42219,17.984,10.37452Q17.9716,10.32685,17.9502,10.28251Q17.9288,10.23816,17.8991,10.19885Q17.8695,10.15954,17.8327,10.12677Q17.796,10.094,17.7535,10.06903L0.75351,0.06903300000000001Q0.636154,0,0.5,0Q0.4507543,0,0.4024549,0.009606999999999977Q0.354155,0.019214999999999982,0.308658,0.03805999999999998Q0.263161,0.05690600000000001,0.222215,0.08426499999999998Q0.181269,0.11162499999999997,0.146447,0.146447Q0.11162499999999997,0.181269,0.08426499999999998,0.222215Q0.05690600000000001,0.263161,0.03805999999999998,0.308658Q0.019214999999999982,0.354155,0.009606999999999977,0.4024549Q0,0.4507543,0,0.5L0,20.5Q0,20.6362,0.06903300000000001,20.7535Q0.094001,20.796,0.12677100000000002,20.8327Q0.159541,20.8695,0.19885199999999997,20.8991Q0.238164,20.9288,0.282507,20.9502Q0.326849,20.9716,0.374519,20.984Q0.4221886,20.9964,0.4713534,20.9992Q0.5205182,21.002,0.5692888,20.9952Q0.618059,20.9883,0.664561,20.9721Q0.711064,20.9559,0.75351,20.931ZM16.5138,10.5L1,1.3742079999999999L1,19.6258L16.5138,10.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="1" /></g></svg>
                  运行</span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Debugger)
