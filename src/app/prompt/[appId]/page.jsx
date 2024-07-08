// page为服务端组件
import PromptContentServer from './contentServer'

const PromptDetail = ({ params: appId }) => {
    return (
        <PromptContentServer appId={appId}></PromptContentServer>
    )
}

export default PromptDetail