

import { getModelDetail } from "../../../services/overflow"
import ModelDetail from "./content"


const getData = async (params) => {
    try {
        const res = await getModelDetail(params)
        if (res.code === 0) {
            return { data: res.data, flag: true }
        } else {
            console.log("请求失败")
            return { data: res.message, flag: false }
        }
    } catch (err) {
        console.log("网络错误：" + err)
    }
}

const ModelContentServer = async ({ modelName: modelName }) => {
    const { data, flag } = await getData(modelName)
    if (flag) {
        return <ModelDetail data={data}></ModelDetail>
    } else {
        return <div className="h-screen text-center leading-[100vh] text-[30px]">{data}</div>
    }
}

export default ModelContentServer