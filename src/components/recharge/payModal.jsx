'use client'

import { useState, useEffect } from 'react'
import { Button, Dialog, DialogPanel, Title } from '@tremor/react'
import { Divider } from '@tremor/react'
import qrcode from 'qrcode'
import { toast } from 'react-toastify'

import AliPay from '../../icons/aliPay'
import WeChatPay from '../../icons/wechatPay'
import { agicto_product_agent_wechat } from '../../consts/img'
import { getOrderStatus } from '../../services/recharge'

import { IoClose } from 'react-icons/io5'

const rechargeType = [
  {
    name: '微信',
    value: 1,
    icon: <WeChatPay className="mr-2 text-[#15BA11] w-[24px] h-[20px]" />
  },
  {
    name: '支付宝',
    value: 2,
    icon: <AliPay className="mr-2 text-[#1678FF] w-[24px] h-[20px]" />
  }
]

const SelectIconTrue = ({ className }) => (
  <svg
    className={className}
    fill="none"
    version="1.1"
    width="9.94083720445633"
    height="8.019159138202667"
    viewBox="0 0 9.94083720445633 8.019159138202667"
  >
    <g>
      <path
        d="M9.434706656732558,0.4166666567325592L8.654566656732559,0.4166666567325592C8.545196656732559,0.4166666567325592,8.44139665673256,0.4668898567325592,8.37443665673256,0.5528276567325592L3.772876656732559,6.382066656732559L1.5663966567325591,3.586306656732559C1.4983166567325592,3.500376656732559,1.3956416567325594,3.450146656732559,1.2862666567325594,3.450146656732559L0.5061328567325591,3.450146656732559C0.4313561567325592,3.450146656732559,0.3900614567325592,3.536086656732559,0.4358203567325592,3.594126656732559L3.4927366567325593,7.46688665673256C3.635596656732559,7.647696656732559,3.910146656732559,7.647696656732559,4.054126656732559,7.46688665673256L9.50501665673256,0.5595236567325592C9.550776656732559,0.5026041567325592,9.50947665673256,0.4166666567325598,9.434706656732558,0.4166666567325592Z"
        fillRule="evenodd"
        fill="#FFFFFF"
        fillOpacity="1"
      />
      <path
        d="M4.380076656732559,7.726446656732559L9.83117665673256,0.8188156567325592L9.83210665673256,0.8176466567325592Q10.02902665673256,0.5699926567325592,9.88954665673256,0.28407365673255924Q9.75097665673256,-3.4326744080548366e-7,9.434706656732558,-3.4326744080548366e-7L8.654566656732559,-3.4326744080548366e-7Q8.276986656732559,-3.4326744080548366e-7,8.04576665673256,0.29672165673255924L3.7729066567325593,5.709556656732559L1.8934766567325592,3.328176656732559Q1.6600166567325592,3.0334866567325594,1.2862666567325594,3.0334866567325594L0.5061328567325591,3.0334866567325594Q0.1892556567325592,3.0334866567325594,0.05093965673255918,3.318416656732559Q-0.08742834326744076,3.6034466567325594,0.10862465673255922,3.852106656732559L3.165686656732559,7.725046656732559Q3.398066656732559,8.019156656732559,3.773016656732559,8.019156656732559Q4.146986656732559,8.019156656732559,4.380076656732559,7.726446656732559ZM8.75816665673256,0.8333336567325592L3.773426656732559,7.149986656732559L1.181896656732559,3.866816656732559L1.2569826567325593,3.866816656732559L3.7728366567325593,7.0545866567325595L8.68383665673256,0.8333336567325592L8.75816665673256,0.8333336567325592Z"
        fillRule="evenodd"
        fill="#FFFFFF"
        fillOpacity="1"
      />
    </g>
  </svg>
)

const SelectIconBg = ({ className }) => (
  <svg className={className} fill="none" version="1.1" width="25.70703125" height="25.70703125" viewBox="0 0 25.70703125 25.70703125">
    <g>
      <rect x="0" y="0" width="25.70703125" height="25.70703125" rx="0" fill="#fff" fillOpacity="1" />
      <g>
        <path
          d="M22.22507125,4.5L21.44493125,4.5C21.335561249999998,4.5,21.231761249999998,4.5502232,21.16480125,4.636161L16.56324125,10.465399999999999L14.35676125,7.669639999999999C14.28868125,7.58371,14.18600625,7.53348,14.07663125,7.53348L13.29649745,7.53348C13.22172075,7.53348,13.18042605,7.61942,13.22618495,7.67746L16.28310125,11.55022C16.42596125,11.73103,16.700511249999998,11.73103,16.84449125,11.55022L22.29538125,4.642857C22.34114125,4.5859375,22.29984125,4.500000000000001,22.22507125,4.5Z"
          fillRule="evenodd"
          fill="#FFFFFF"
          fillOpacity="1"
        />
        <path
          d="M17.17044125,11.80978L22.62154125,4.902149L22.62247125,4.90098Q22.819391250000002,4.653326,22.67991125,4.367407Q22.541341250000002,4.083333,22.22507125,4.083333L21.44493125,4.083333Q21.06735125,4.083333,20.83613125,4.380055L16.56327125,9.79289L14.68384125,7.41151Q14.45038125,7.116820000000001,14.07663125,7.116820000000001L13.29649745,7.116820000000001Q12.97962025,7.116820000000001,12.84130425,7.40175Q12.70293625,7.686780000000001,12.89898925,7.93544L15.95605125,11.80838Q16.18843125,12.10249,16.56338125,12.10249Q16.93735125,12.10249,17.17044125,11.80978ZM21.54853125,4.916667L16.56379125,11.233319999999999L13.97226125,7.95015L14.04734725,7.95015L16.56320125,11.137920000000001L21.47420125,4.916667L21.54853125,4.916667Z"
          fillRule="evenodd"
          fill="#FFFFFF"
          fillOpacity="1"
        />
      </g>
      <g>
        <path
          d="M1.20703125,0.5L25.20703125,24.5L25.20703125,4.5C25.20703125,2.29086,23.41613125,0.5,21.20703125,0.5L1.20703125,0.5Z"
          fill="#3162FF"
          fillOpacity="1"
        />
        <path
          d="M-0.00007874999999990528,0L25.70703125,25.7071L25.70703125,4.5Q25.70703125,2.63604,24.38903125,1.31802Q23.07103125,0,21.20703125,0L-0.00007874999999990528,0ZM24.70703125,23.2929L24.70703125,4.5Q24.70703125,3.05025,23.68193125,2.02513Q22.65673125,1,21.20703125,1L2.41414125,1L24.70703125,23.2929Z"
          fillRule="evenodd"
          fill="#3162FF"
          fillOpacity="1"
        />
      </g>
    </g>
  </svg>
)
let countdown = null
export default function PayModal({ isOpen, setIsOpen, orderDetail }) {
  const [payType, setPayType] = useState(1)
  const [count, setCount] = useState(300)
  const [startCount, setStartCount] = useState(false)
  const [orderStatus, setOrderStatus] = useState(0)
  const [imgUrl, setImgUrl] = useState('')

  const checkOrderStatus = async () => {
    const res = await getOrderStatus({ orderSn: orderDetail?.orderSn })
    if (res?.data?.orderStatus === 1) {
      setStartCount(false)
      clearInterval(countdown)
      setOrderStatus(1)
      setCount(0)
      toast.success('支付成功～')
      window.location.href = '/space/recharge'
    }
  }

  useEffect(() => {
    if (!orderDetail || !isOpen) return
    const codeUrl = payType === 2 ? orderDetail?.aliCodeUrl : orderDetail?.wxCodeUrl
    setStartCount(true)
    qrcode
      .toDataURL(codeUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark: '#111111'
        }
      })
      .then(url => {
        setImgUrl(url)
      })
  }, [payType, orderDetail])

  useEffect(() => {
    if (!startCount) return
    checkOrderStatus()
    countdown = setInterval(() => {
      if (count <= 0) {
        clearInterval(countdown)
        setStartCount(false)
        window.location.reload()
      } else {
        setCount(count - 1)
      }
    }, 1000)
    if (!isOpen) {
      clearInterval(countdown)
    }
    return () => clearInterval(countdown) // 清理函数
  }, [isOpen, count, startCount, orderDetail])

  const getTwoDigitString = num => (num < 10 ? '0' + num : num)

  const min = getTwoDigitString(Math.floor(count / 60))
  const sec = getTwoDigitString(count % 60)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
      <DialogPanel className="w-[483px]">
        <Title className="mb-3 text-[24px] flex justify-between">
          <span>正在购买{orderDetail?.payFee || 0}元充值</span>
          <span className="p-1 cursor-pointer" onClick={() => setIsOpen(false)}>
            <IoClose />
          </span>
        </Title>
        <Divider className="my-2" />

        <span className="text-[12px] text-[rgba(0, 0, 0, 0.45)] tracking-widest	">
          请使用{payType === 1 ? '微信' : '支付宝'}扫码支付,订单支付剩余时间 {min}:{sec} ,请尽快支付
        </span>

        <div className="mt-[24px] flex items-center">
          <div className="mr-2">
            <img className="w-[160px]" src={imgUrl} />
          </div>
          <div>
            <div className="">
              <span className="text-[#9E9E9E]">支付</span>
              <span className="text-[#3162FF] text-[40px] ml-">¥{orderDetail?.payFee}</span>
            </div>
            <div className="text-[#9E9E9E] mt-5 mb-2">请选择支付方式</div>
            <div className="flex items-center">
              {rechargeType?.map(item => {
                const active = payType === item?.value
                return (
                  <button
                    key={item?.value}
                    className={`w-[124px] relative  mr-4 h-[40px] border rounded flex items-center justify-center ${
                      active ? 'border border-[#3162FF]' : ''
                    }`}
                    onClick={() => setPayType(item?.value)}
                  >
                    {item?.icon}
                    <span className="text-[14px] text-gray-900 font-semibold">{item?.name}</span>
                    {active ? <SelectIconBg className="absolute right-[-1px] top-[-1px]" /> : null}
                    {active ? <SelectIconTrue className="absolute right-[3px] top-[3px]" /> : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}
