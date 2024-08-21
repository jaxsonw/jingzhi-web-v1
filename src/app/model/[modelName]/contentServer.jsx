import { getModelDetail } from '../../../services/overflow'
import ModelDetail from './content'

const getData = async params => {
  try {
    const res = await getModelDetail(params)
    if (res.code === 0) {
      return { data: res.data, flag: true }
    } else {
      return { data: res.message, flag: false }
    }
  } catch (err) {
    return {
      data: '获取模型数据失败',
      flag: false
    }
  }
}

export async function getServerSideProps(context) {
  return context
}

const ModelContentServer = async ({ modelName: modelName, status }) => {
  const { data, flag } = await getData(modelName)
  console.log('data', data, flag)
  if (flag) {
    return <ModelDetail data={data} status={status}></ModelDetail>
  } else {
    return <div className="h-screen text-center leading-[100vh] text-[30px]">{data}</div>
  }
}

export default ModelContentServer
