'use client'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
// import { Radio.Group, Radio, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { Radio, Button, Popover } from "antd-xijing"
// import { Listbox, ListboxItem } from "@nextui-org/react";
import { getCateList, getModelList } from '../../../../services/promptService'


const AppConfig = ({ appDetail, changeCueword, setChangeCueword }, ref) => {
  const [open, setOpen] = useState(+appDetail?.open || 0)
  const [openPrompt, setOpenPrompt] = useState(+appDetail?.openPrompt || 0)
  const [model, setModel] = useState(+appDetail?.modelId || 0)
  const [modelList, setModelList] = useState([])

  const [cate, setCate] = useState(+appDetail?.cid || 0)
  const [cateList, setCateList] = useState([])
  useEffect(() => {
    getClientCateList()
    getModules()
  }, [])

  useEffect(() => {
    if (changeCueword == null) {
      setOpen(+appDetail?.open)
      setOpenPrompt(+appDetail?.openPrompt)
      setModel(+appDetail?.modelId)
      setCate(+appDetail?.cid)
    }
  }, [appDetail])

  const getModules = async () => {
    const { data } = await getModelList({ sceneType: 3 })
    setModelList(data?.recordList)
  }

  useImperativeHandle(ref, () => {
    return {
      getNewDetail: () => {
        return {
          open,
          cid: cate,
          modelId: model,
          openPrompt
        }
      }
    }
  })

  const getClientCateList = async () => {
    const res = await getCateList()
    const renderCateList = (res?.data?.recordList || []).map(item => ({ ...item, label: item.name }))
    setCateList(renderCateList)
  }


  return (
    <div ref={ref}>
      <div className='flex justify-between items-center h-16 border-b pl-3'>
        <div className='flex items-center '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="20" height="20" viewBox="0 0 29 29" className='mr-3'>
            <path d="M8.36128,27.64Q11.2643,29,14.5,29Q17.4493,29,20.1444,27.8601Q22.7467,26.7594,24.753,24.753Q26.7594,22.7467,27.8601,20.1444Q29,17.4493,29,14.5Q29,11.5507,27.8601,8.855640000000001Q26.7594,6.25332,24.753,4.24695Q22.7467,2.24058,20.1444,1.139893Q17.4493,0.0000010000000000287557,14.5,0.0000010000000000287557Q11.5506,0,8.855640000000001,1.139892Q6.25333,2.24058,4.24695,4.24695Q2.24058,6.25332,1.139893,8.855640000000001Q0.0000010000000000287557,11.5506,0.0000010000000000287557,14.5Q0,17.8513,1.45072,20.8294L0.16928299999999996,27.0736Q0.006047000000000025,27.869,0.591094,28.4389Q1.155059,28.9883,1.928254,28.8437L4.93391,28.2813L8.36128,27.64ZM14.5,27Q11.6387,27,9.08196,25.7682Q8.636849999999999,25.5538,8.15833,25.6433L4.56609,26.3154L2.27872,26.7434L2.72958,24.5464L3.55064,20.5456L3.38832,20.2316Q2,17.546,2,14.5Q2,11.9562,2.9819,9.63474Q3.93063,7.3917,5.66117,5.66117Q7.3917,3.93063,9.63474,2.9819Q11.9562,2,14.5,2Q17.0438,2,19.3653,2.9819Q21.6083,3.93062,23.3388,5.66117Q25.0694,7.3917,26.0181,9.63474Q27,11.9562,27,14.5Q27,17.0438,26.0181,19.3653Q25.0694,21.6083,23.3388,23.3388Q21.6083,25.0694,19.3653,26.0181Q17.0438,27,14.5,27Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
            <path d="M11.706240000000001,21.5016L21.7335,10.679699L20.2665,9.320372L11.76235,18.49841L7.7584,13.83954L6.2416,15.14312L11.706240000000001,21.5016Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
          </svg>
          <span>应用访问权限</span>
        </div>
        <Radio.Group
          onChange={(e) => {
            setOpen(e?.target?.value)
            setChangeCueword(true)
          }}

          value={open}
        >
          <Radio value={1} >
            公开
          </Radio>
          <Radio value={0} >
            私密
          </Radio>
        </Radio.Group>
      </div>
      <div className='flex justify-between items-center h-16 border-b pl-3'>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="20" height="20" viewBox="0 0 29 25" className='mr-3'>
            <path d="M24.0388,10.83583Q18.4677,6.5,14.5,6.5Q10.53321,6.5,4.9635,10.83404Q2.2492,12.946159999999999,0.26898900000000003,15.067630000000001L0.268976,15.06765Q0.20473200000000003,15.136479999999999,0.15446400000000005,15.21608Q0.10419599999999996,15.29569,0.06966899999999998,15.38328Q0.03514200000000001,15.47087,0.017571000000000003,15.56336Q0,15.65586,0,15.75001Q0.0000010000000000287557,15.84416,0.01757399999999998,15.93666Q0.03514799999999996,16.02915,0.06967699999999999,16.11674Q0.10420499999999999,16.20433,0.15447500000000003,16.28394Q0.20474499999999995,16.36354,0.26898900000000003,16.43237Q2.2484200000000003,18.5529,4.9612,20.6642Q10.53236,25,14.5,25Q18.4668,25,24.0365,20.666Q26.7508,18.553800000000003,28.731,16.43235Q28.7953,16.36353,28.8455,16.283920000000002Q28.8958,16.20432,28.9303,16.11673Q28.9649,16.029139999999998,28.9824,15.93664Q29,15.84415,29,15.75Q29,15.65585,28.9824,15.56335Q28.9649,15.47085,28.9303,15.38326Q28.8958,15.295670000000001,28.8455,15.21607Q28.7953,15.13646,28.731,15.067630000000001Q26.7516,12.94711,24.0388,10.83583ZM6.19174,12.412469999999999Q11.2197,8.5,14.5,8.5Q17.7811,8.5,22.8104,12.41417Q24.9577,14.08529,26.6116,15.75001Q24.9569,17.415599999999998,22.8083,19.0875Q17.7803,23,14.5,23Q11.2189,23,6.18956,19.0858Q4.04233,17.414720000000003,2.3884499999999997,15.74999Q4.04313,14.084399999999999,6.19174,12.412469999999999Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
            <ellipse cx="14.5" cy="15.75" rx="4.5" ry="4.5" fillOpacity="0" strokeOpacity="1" stroke="#767676" fill="none" strokeWidth="2" strokeLinejoin="round" />
            <path d="M15.5,0L15.5,4.5L13.5,4.5L13.5,0L15.5,0Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
            <path d="M2.457107,3.042893L5.45711,6.04289L4.04289,7.45711L1.0428929999999998,4.457107L2.457107,3.042893Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
            <g transform="matrix(-1,0,0,1,54.5,0)"><path d="M27.957107,3.042893L30.95711,6.04289L29.54289,7.45711L26.542893,4.457107L27.957107,3.042893Z" fillRule="evenodd" fill="#767676" fillOpacity="1" /></g>
          </svg>
          <span>提示词查看权限</span>
        </div>
        <Radio.Group
          onChange={(e) => {
            setOpenPrompt(e?.target?.value)
            setChangeCueword(true)
          }}
          value={openPrompt}
        // onValueChange={(v) => {
        //   setOpenPrompt(v)
        //   
        // }}
        // size='sm'
        // orientation="horizontal"
        // value={openPrompt}
        >
          <Radio value={1} color="primary">
            公开
          </Radio>
          <Radio value={0} color="primary">
            隐藏
          </Radio>
        </Radio.Group>
      </div>
      <div className='flex justify-between items-center h-16 border-b pl-3'>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="20" height="20" viewBox="0 0 22.7998046875 28" className='mr-3'>
            <path d="M11.4,23.5415L1.400819,27.9162Q1.209179,28,1,28Q0.9015086,28,0.80491,27.9808Q0.708311,27.9616,0.617317,27.9239Q0.526322,27.8862,0.44443,27.8315Q0.362537,27.7767,0.29289299999999996,27.7071Q0.22324900000000003,27.6375,0.16852999999999996,27.5556Q0.11381200000000002,27.4737,0.076121,27.3827Q0.038429999999999964,27.2917,0.019214999999999982,27.1951Q0,27.0985,0,27L0,14L0,2.9712899999999998Q0,1.726454,0.879353,0.859374Q1.750889,0,2.99137,0L11.4,0L19.8086,0Q21.0491,0,21.9206,0.859374Q22.8,1.726455,22.8,2.9712899999999998L22.8,27Q22.8,27.2092,22.7162,27.4008Q22.6364,27.5831,22.493,27.7209Q22.3496,27.8588,22.1644,27.9312Q21.9792,28.0037,21.7803,27.9998Q21.5814,27.9959,21.3992,27.9162L11.4,23.5415ZM20.8,25.471L11.8008,21.5338Q11.6092,21.45,11.4,21.45Q11.1908,21.45,10.99918,21.5338L2,25.471L2,14L2,2.9712899999999998Q2,2.56313,2.2835900000000002,2.28349Q2.5711,2,2.99137,2L11.4,2L19.8086,2Q20.2289,2,20.5164,2.28349Q20.8,2.56313,20.8,2.9712899999999998L20.8,25.471Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
            <path d="M8.706240000000001,18.5016L18.7335,7.679699L17.2665,6.320372L8.76235,15.49841L4.7584,10.83954L3.2416,12.14312L8.706240000000001,18.5016Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
          </svg>
          <span>推荐默认模型</span>
        </div>
        <Popover placement="right" content={
          <div className='flex flex-col'>
            {modelList?.map((item, index) => <Button onClick={() => setModel(+item.modelId)} key={item.modelId} type={model === +item.modelId ? "primary" : ""}  >{item?.modelName}</Button>)}
          </div>
        }>
          <span className='cursor-pointer'>  {modelList.find(v => +v.modelId === model)?.modelName || '未选择'}</span>
        </Popover>
      </div>
      <div className='flex justify-between items-center h-16 border-b pl-3'>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="20" height="20" viewBox="0 0 23.10009765625 28" className='mr-3'>
            <ellipse cx="4.249999761581421" cy="4.25" rx="3.249999761581421" ry="3.25" fillOpacity="0" strokeOpacity="1" stroke="#767676" fill="none" strokeWidth="2" strokeLinejoin="round" />
            <ellipse cx="4.249999761581421" cy="14" rx="3.249999761581421" ry="3.25" fillOpacity="0" strokeOpacity="1" stroke="#767676" fill="none" strokeWidth="2" strokeLinejoin="round" />
            <ellipse cx="4.249999761581421" cy="23.75" rx="3.249999761581421" ry="3.25" fillOpacity="0" strokeOpacity="1" stroke="#767676" fill="none" strokeWidth="2" strokeLinejoin="round" />
            <path d="M23.099999618530273,5.25L11.399999618530273,5.25L11.399999618530273,3.25L23.099999618530273,3.25L23.099999618530273,5.25Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
            <path d="M23.099999618530273,15L11.399999618530273,15L11.399999618530273,13L23.099999618530273,13L23.099999618530273,15Z" fillRule="evenodd" fill="#767676" fillOpacity="1" /><path d="M23.099999618530273,24.75L11.399999618530273,24.75L11.399999618530273,22.75L23.099999618530273,22.75L23.099999618530273,24.75Z" fillRule="evenodd" fill="#767676" fillOpacity="1" />
          </svg>
          <span>选择所属分类</span>
        </div>
        <Popover placement="right" content={
          <div className='flex flex-col'>
            {cateList?.map((item, index) => <Button onClick={() => setCate(index)} key={index} type={cate === index ? "primary" : ""}  >{item?.label}</Button>)}
          </div>

        }>
          <span className='cursor-pointer'> {cateList?.[cate]?.label || "未选择"}</span>

        </Popover>
      </div>
    </div>
  )
}

export default forwardRef(AppConfig)
