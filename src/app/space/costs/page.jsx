"use client"
import { useEffect, useState } from "react"
import moment from "moment"
import { AreaChart, BarChart, Card, Title, DatePicker } from "@tremor/react";
import { zhCN } from "date-fns/locale";
import { getChartDetail, getChartModelList } from "../../../services/overflow"






export default function Overflow() {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [dataList, setDataList] = useState([])
    const [totalFee, setTotalFee] = useState(0)

    const init = async () => {
        const res = await getChartModelList({
            date
        })

        const modelList = res?.data?.modelList?.map(item => ({
            ...item,
            "消费金额": item.fee,
        }))
        setDataList(modelList)
        setTotalFee(res?.data?.totalFee)
    }

    useEffect(() => {
        init()
    }, [date])

    console.log("moment(date)", moment(date)?.format('ddd MMM DD YYYY HH:mm:ss ZZ'))
    return <Card>
        <div className="flex justify-end"><DatePicker locale={zhCN}
            placeholder="请选择日期" 
            // value={
            //     `${moment(date)?.format('ddd MMM DD YYYY HH:mm:ss ZZ')} (中国标准时间)`
            // }
            
            value={
                {
                    form:`${moment(date)?.format('ddd MMM DD YYYY HH:mm:ss ZZ')}`,
                    to:`${moment(date)?.format('ddd MMM DD YYYY HH:mm:ss ZZ')}`
                }
            }
            onValueChange={(e) => {
                console.log("e", e)
                setDate(moment(e)?.format("YYYY-M-D"))
            }} className="max-w-sm" /></div>
        <Title className="flex justify-between"><span className="text-rose-400">消费总金额：{totalFee?.toFixed(4)} </span></Title>
        <BarChart
            className="mt-6"
            data={dataList}
            index="model"
            categories={["消费金额"]}
            colors={["blue-300"]}
            valueFormatter={(v) => Number(v)?.toFixed(4)}
            yAxisWidth={80}
            showXAxis
        />
    </Card>
}