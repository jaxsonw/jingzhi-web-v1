"use client"
import { useEffect } from "react"
import moment from "moment"
import { DatePicker, Space } from 'antd';

import { getChartDetail, getChartModelList } from "../../../services/overflow"

export default function Overflow() {
    const init = async () => {
        const res = await getChartModelList({
            date: moment().unix() * 1000
        })
        console.log("res", res)

    }

    useEffect(() => {
        init()
    }, [])

    return <div>
        <DatePicker />
    </div>
}