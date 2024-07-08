// 在服务端组件获取数据,完成服务端渲染

import { getAppDetail } from "../../../services/promptService";
import Content from './content'

const getPromptData = async (params) => {
    const res = await getAppDetail(params)
    if (res.code === 0) {
        return res.data
    } else {
        console.error("网络错误")
    }
}



const PromptContentServer = async ({ appId: appId }) => {
    const promptData = await getPromptData(appId);
    return <Content promptData={promptData}></Content>
}

export default PromptContentServer