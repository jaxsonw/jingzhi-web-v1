

import { getModelDetail } from "../../../services/overflow"
import ModelDetail from "./content"


const getData = async (params) => {
    try {
        const res = await getModelDetail(params)
        if (res.code === 0) {
            return res.data
        } else {
            console.log("请求失败")
        }
    } catch (err) {
        console.log("网络错误：" + err)
    }
}

const ModelContentServer = async ({ modelName: modelName }) => {
    const data = await getData(modelName)
    return <ModelDetail data={data}></ModelDetail>
}

export default ModelContentServer