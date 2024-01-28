"use client"
import { useEffect } from "react"
import moment from "moment"
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
        overflow
    </div>
}