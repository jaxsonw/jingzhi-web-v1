import React, { useEffect, useState } from 'react'
import { Modal, Input, Button, Radio } from "antd"
import { useRouter, usePathname, useSearchParams, NextRequest } from 'next/navigation'

// import { toast } from 'react-toastify'
import { createApp, updateApp } from '../../services/promptService'

const { TextArea } = Input

export default function AppSetting({ setAppDetail, reload, appDetail, visible, setVisible }) {
  const router = useRouter()
  const [appValue, setAppValue] = useState(appDetail?.name)
  const [descValue, setDescValue] = useState(appDetail?.desc)
  const [appType, setAppType] = useState(appDetail?.type || 2)

  const closeHandler = () => {
    setVisible(false)
    setAppValue("")
    setDescValue("")
    setAppType(2)
    if (setAppDetail) {
      setAppDetail("")
    }

  }

  const onOk = async () => {
    const params = {
      appId: appDetail?.appId,
      name: appValue || appDetail?.name,
      desc: descValue,
      type: appType,
    }
    let res
    if (appDetail) {
      res = await updateApp(params)
    } else {
      res = await createApp(params)
      if (res?.data?.appId) {
        router.push(`/creator/apps/${res?.data?.appId}`)
      }
      // if(res?.)
    }

    if (res?.code === 0) {
      // toast.success('保存成功')
      setVisible(false)
      reload && reload(res?.data?.appId)
      closeHandler()
    } else {
      // toast.error(res?.message || '保存失败～')
    }
  }

  // useEffect(() => {
  //   if (!visible) {
  //     setCurrentApp(null)
  //     setAppValue('')
  //     setDescValue('')
  //     setAppType('')
  //   }
  // }, [visible])

  return (
    <div>
      <Modal centered open={visible} footer={<>
        <Button onClick={closeHandler}>
          关闭
        </Button>
        <Button type="primary" onClick={onOk}>
          保存
        </Button></>} title="设置我的App" onCancel={closeHandler}>
        <div>
          <div className="py-5 w-full app-setting-input">
            <Input
              size="md"
              // css={{
              //   width: '100%',
              // }}
              onChange={e => setAppValue(e?.target?.value)}
              defaultValue={appDetail?.name}
              maxLength={20}
              placeholder="应用名"
              status="default"
            />
          </div>
          <div className="py-5 w-full app-setting-input">
            <TextArea
              maxLength={300}
              onChange={e => setDescValue(e?.target?.value)}
              defaultValue={appDetail?.desc}
              // css={{
              //   width: '100%',
              // }}
              placeholder="应用描述"
              status="default"
            />
          </div>
          <Radio.Group
            // disabled={Boolean(appDetail)}
            onChange={e => {
              const value = e?.target?.value
              setAppType(Number(value))
            }}
            label="应用类型"
            value={appType}
            options={
              [
                {
                  label: "文本生成型应用",
                  value: 2
                }, {
                  label: "对话型应用",
                  value: 1
                }
              ]
            }
          />

        </div>
      </Modal >
    </div >
  )
}
