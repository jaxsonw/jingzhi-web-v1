'use client'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { AreaChart, BarChart, Card, Title, DatePicker, Select, SelectItem } from '@tremor/react'
import { zhCN } from 'date-fns/locale'
import { consumeChart, consumeModelList, getModelPriceList } from '../../../services/overflow'

export default function Overflow() {
    const [singleDayDate, setSingleDayDate] = useState(moment().format('YYYY-MM-DD'))
    const [dataList, setDataList] = useState([])
    const [modelList, setModelList] = useState([])
    const [totalFee, setTotalFee] = useState(0)

    const [selectModel,setSelectModel] = useState(null)

  
    const init = async () => {
        const modelListRes = await getModelPriceList()
        setModelList(modelListRes?.data?.modelPriceList)

    }

    const getSingleDayData = async () => {
        const consumeModelRes = await consumeModelList({
            date: singleDayDate
        })

        const consumeModel = consumeModelRes?.data?.modelList?.map(item => ({
            ...item,
            消费金额: item.fee
        }))
        setDataList(consumeModel)
        setTotalFee(consumeModelRes?.data?.totalFee)
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        getSingleDayData()
    }, [singleDayDate])

    return (
        <>
            <div className="flex justify-between items-center mb-4 mt-[18px]">
                <span className="text-[#545759]">单日消耗统计：<span className="text-[#3162FF] font-bold text-xl">{totalFee?.toFixed(4)}元</span> </span>
                <DatePicker
                    locale={zhCN}
                    placeholder="请选择日期"
                    value={new Date(singleDayDate)}
                    onValueChange={e => setSingleDayDate(moment(e)?.format('YYYY-M-D'))}
                    className="max-w-sm"
                />
            </div>
            <Card>
                <BarChart
                    className="mt-6"
                    data={dataList}
                    index="model"
                    categories={['消费金额']}
                    colors={['blue-600']}
                    valueFormatter={v => Number(v)?.toFixed(4)}
                    yAxisWidth={80}
                    showXAxis
                />
            </Card>


            <div className="flex justify-between items-center mb-4 mt-[54px]">
                <span className="text-[#545759]">所选日期范围共消耗： <span className="text-[#3162FF] font-bold text-xl">{totalFee?.toFixed(4)}元</span> </span>
                <div className="flex items-center justify-end">
                    <div className="mr-6">
                        <Select onValueChange={(e)=>console.log("e",e)} placeholder="选择模型" >
                            {
                                modelList?.map((item, index) => <SelectItem key={index} value={item?.model} >
                                    {item?.model}
                                </SelectItem>)
                            } 
                        </Select>
                    </div>
                    <DatePicker
                        locale={zhCN}
                        placeholder="请选择日期"
                        value={new Date(singleDayDate)}
                        onValueChange={e => setSingleDayDate(moment(e)?.format('YYYY-M-D'))}
                        className="max-w-sm"
                    />
                </div>
            </div>
            <Card>
                <BarChart
                    className="mt-6"
                    data={dataList}
                    index="model"
                    categories={['消费金额']}
                    colors={['blue-600']}
                    valueFormatter={v => Number(v)?.toFixed(4)}
                    yAxisWidth={80}
                    showXAxis
                />
            </Card>
        </>
    )
}
