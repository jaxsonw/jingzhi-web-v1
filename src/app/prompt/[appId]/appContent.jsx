import { useEffect, useState } from 'react'
import { Button, Switch, Progress, Modal, Text } from '@nextui-org/react'
import { message } from 'antd'

import NProgress from 'nprogress'
// import ChatConfig from './components/ChatConfig'
// import TextConfig from './components/TextConfig'
import { getAppDetail, updateAppConfig } from '../../../services/promptService'
import { remarkToKey } from '../../../utils/index'
// import { toast } from 'react-toastify'

const OpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
)

export default function AppContent({ appId }) {
  const [reloadDetail, setReloadDetail] = useState(false)
  const [appDetail, setAppDetail] = useState({})
  const [newDetail, setNewDetail] = useState()
  const [saveLoading, setSaveLoading] = useState(false)

  const onSave = async (appConfigData = {}) => {
    setSaveLoading(true)
    let data = JSON.parse(JSON.stringify({ ...newDetail, ...appConfigData }))
    getAllNewDetail(data)
    data.preNotice = remarkToKey(data.fieldJson, data.preNotice)
    const res = await updateAppConfig(data)
    setSaveLoading(false)
    if (res?.code !== 0) {
      message.error(res?.message || '保存失败～')
      return
    }
    message.success('保存成功～')
  }
  const getAllNewDetail = detail => {

    setNewDetail({
      ...appDetail,
      ...newDetail,
      ...detail,
      appId: appDetail?.appId,
    })
  }
  const init = async () => {
    NProgress.start()

    const res = await getAppDetail({ appId })
    NProgress.done()
    setAppDetail(res?.data)
  }


  useEffect(() => {
    init()
  }, [appId, reloadDetail])

  return (
    <div className="w-full h-[calc(100vh_-_100px)] mt-[70px] pt-[10px]  bg-[#f5f7fa]">
      {saveLoading && (
        <Modal preventClose blur open>
          <Progress indeterminated value={30} color="gradient" status="secondary" />
        </Modal>
      )}
      <div className="  w-full h-full md:max-w-[1400px]  m-auto shadow-lg rounded-2xl bg-[white]  ">

        {/* {appDetail?.type === 2 ? (
          <TextConfig
            getAllNewDetail={getAllNewDetail}
            reloadDetail={reloadDetail}
            setReloadDetail={setReloadDetail}
            appDetail={appDetail}
            newDetail={newDetail}
            onSave={onSave}

          />
        ) : (
          <ChatConfig
            getAllNewDetail={getAllNewDetail}
            reloadDetail={reloadDetail}
            setReloadDetail={setReloadDetail}
            appDetail={appDetail}
            newDetail={newDetail}
            onSave={onSave}

          />
        )} */}
      </div>
    </div>
  )
}
