// import copyValue from 'copy-to-clipboard'
import { copyValue } from "../../utils/index"

export default function InviteModal({ open = true, setOpen, url }) {
  const onCancel = () => setOpen(false)
  const onCopy = () => {
    copyValue(`${url} 创建可训练、多模型的AI应用，快来试试吧！`)
  }
  return (
    <div
      style={{ display: open ? 'flex' : 'none' }}
      className="w-screen h-screen fixed left-0 top-0   z-[90] flex items-center justify-center"
    >
      <div
        onClick={onCancel}
        className="w-screen h-screen absolute top-0 left-0  bg-[rgba(0,0,0,.2)] z-[90] flex items-center justify-center"
      />
      <div className=" bg-gradient-to-r from-green-100 to-blue-100     p-4 relative z-[99] w-full max-w-[320px]  rounded-lg">
        <div className="flex items-center justify-end">
          <span onClick={onCancel} className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        <div className="text-lg text-center font-bold py-2">邀请好友，领取无限免费额度</div>
        <div className=" p-1 relative h-[150px] flex flex-col items-center justify-center">
          <svg width="274" height="148" viewBox="0 0 274 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
            <g filter="url(#big-card_svg__a)">
              <mask id="big-card_svg__c" fill="#fff">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 20.5c0-5.523 4.477-10 10-10h226c5.523 0 10 4.477 10 10v26.272c0 2 0 2.999-.254 3.765s-2.213 3.397-6.131 8.659C251.385 62.192 250 66.374 250 71s1.385 8.808 3.615 11.804c3.918 5.262 5.877 7.894 6.131 8.66.254.765.254 1.765.254 3.764V120.5c0 5.523-4.477 10-10 10H24c-5.523 0-10-4.477-10-10V96.228c0-2 0-2.999.254-3.765.254-.765 2.213-3.397 6.13-8.659C22.615 80.808 24 76.626 24 72s-1.385-8.808-3.616-11.804c-3.917-5.262-5.876-7.893-6.13-8.66C14 50.772 14 49.772 14 47.773V20.5Z"
                ></path>
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 20.5c0-5.523 4.477-10 10-10h226c5.523 0 10 4.477 10 10v26.272c0 2 0 2.999-.254 3.765s-2.213 3.397-6.131 8.659C251.385 62.192 250 66.374 250 71s1.385 8.808 3.615 11.804c3.918 5.262 5.877 7.894 6.131 8.66.254.765.254 1.765.254 3.764V120.5c0 5.523-4.477 10-10 10H24c-5.523 0-10-4.477-10-10V96.228c0-2 0-2.999.254-3.765.254-.765 2.213-3.397 6.13-8.659C22.615 80.808 24 76.626 24 72s-1.385-8.808-3.616-11.804c-3.917-5.262-5.876-7.893-6.13-8.66C14 50.772 14 49.772 14 47.773V20.5Z"
                fill="#fff"
                fillOpacity="0.3"
                shapeRendering="crispEdges"
              ></path>
              <path
                d="m14.254 51.537.474-.158-.474.158Zm0 40.926-.475-.157.475.157Zm239.361-9.659-.401.299.401-.299Zm6.131 8.66.475-.158-.475.157Zm-6.131-32.268.402.298-.402-.298Zm6.131-8.66.475.158-.475-.157ZM24 10c-5.799 0-10.5 4.701-10.5 10.5h1A9.5 9.5 0 0 1 24 11v-1Zm226 0H24v1h226v-1Zm10.5 10.5c0-5.799-4.701-10.5-10.5-10.5v1a9.5 9.5 0 0 1 9.5 9.5h1Zm0 26.272V20.5h-1v26.272h1ZM250.5 71c0-4.531 1.357-8.605 3.517-11.506l-.803-.597C250.913 61.99 249.5 66.278 249.5 71h1Zm3.517 11.506C251.857 79.605 250.5 75.53 250.5 71h-1c0 4.722 1.413 9.011 3.714 12.103l.803-.597ZM260.5 120.5V95.228h-1V120.5h1ZM250 131c5.799 0 10.5-4.701 10.5-10.5h-1a9.5 9.5 0 0 1-9.5 9.5v1Zm-226 0h226v-1H24v1Zm-10.5-10.5c0 5.799 4.701 10.5 10.5 10.5v-1a9.5 9.5 0 0 1-9.5-9.5h-1Zm0-24.272V120.5h1V96.228h-1ZM23.5 72c0 4.531-1.357 8.605-3.517 11.506l.803.597C23.087 81.01 24.5 76.722 24.5 72h-1Zm-3.517-11.506C22.143 63.395 23.5 67.47 23.5 72h1c0-4.722-1.413-9.011-3.714-12.103l-.803.597ZM13.5 20.5v27.272h1V20.5h-1Zm7.286 39.397c-1.96-2.633-3.427-4.602-4.434-6.008-.505-.704-.89-1.26-1.164-1.687-.283-.44-.419-.7-.46-.823l-.949.315c.086.26.29.617.568 1.049.288.447.685 1.02 1.192 1.728 1.014 1.416 2.487 3.394 4.444 6.023l.803-.597ZM13.5 47.772c0 .994 0 1.76.032 2.371.033.614.1 1.106.247 1.55l.95-.314c-.107-.321-.167-.712-.198-1.289-.03-.579-.031-1.313-.031-2.318h-1Zm1 48.456c0-1.005 0-1.74.031-2.318.03-.577.09-.968.197-1.29l-.949-.314c-.147.445-.214.937-.247 1.55-.032.613-.032 1.378-.032 2.372h1Zm5.483-12.722c-1.957 2.629-3.43 4.607-4.444 6.023a43.87 43.87 0 0 0-1.192 1.728c-.278.432-.482.79-.568 1.05l.95.314c.04-.124.176-.382.46-.823.273-.426.659-.983 1.163-1.687 1.008-1.407 2.473-3.375 4.434-6.008l-.803-.597Zm233.231-.403c1.961 2.633 3.427 4.602 4.434 6.008.505.704.89 1.26 1.163 1.687.284.44.42.7.461.823l.949-.315c-.086-.26-.29-.617-.568-1.049a44.64 44.64 0 0 0-1.192-1.728c-1.014-1.416-2.487-3.394-4.444-6.023l-.803.597Zm7.286 12.125c0-.994 0-1.76-.032-2.371-.033-.614-.1-1.106-.247-1.55l-.949.314c.106.321.166.712.197 1.289.031.579.031 1.313.031 2.318h1Zm-1-48.456c0 1.005 0 1.74-.031 2.318-.031.577-.091.968-.197 1.29l.949.314c.147-.445.214-.937.247-1.55.032-.612.032-1.378.032-2.372h-1Zm-5.483 12.722c1.957-2.629 3.43-4.607 4.444-6.023.507-.707.904-1.28 1.192-1.728.278-.432.482-.79.568-1.05l-.949-.314c-.041.124-.177.383-.461.823-.273.426-.658.983-1.163 1.687-1.007 1.406-2.473 3.375-4.434 6.008l.803.597Z"
                fill="url(#big-card_svg__b)"
                fillOpacity="0.1"
                mask="url(#big-card_svg__c)"
              ></path>
            </g>
            <defs>
              <linearGradient id="big-card_svg__b" x1="23.849" y1="-35.277" x2="237.508" y2="-16.449" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff"></stop>
                <stop offset="1" stopColor="#fff"></stop>
              </linearGradient>
              <filter
                id="big-card_svg__a"
                x="-13.068"
                y="-16.568"
                width="300.137"
                height="174.137"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="13.534"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4_88"></feComposite>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                <feOffset dy="3.609"></feOffset>
                <feGaussianBlur stdDeviation="6.767"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix values="0 0 0 0 0.0246528 0 0 0 0 0.165667 0 0 0 0 0.295833 0 0 0 0.03 0"></feColorMatrix>
                <feBlend in2="effect1_backgroundBlur_4_88" result="effect2_dropShadow_4_88"></feBlend>
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_4_88" result="shape"></feBlend>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                <feOffset dy="-8"></feOffset>
                <feGaussianBlur stdDeviation="10"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"></feColorMatrix>
                <feBlend in2="shape" result="effect3_innerShadow_4_88"></feBlend>
              </filter>
            </defs>
          </svg>
          <span className="block relative  max-w-[225px] text-md text-center">邀请好友注册后获得</span>
          <span className="block relative  font-bold text-2xl py-2 text-cyan-700">3元免费额度</span>

          <span className="block relative text-md  font-bold  ">
            邀请奖励<span className=" text-md text-cyan-700">无上限</span>
          </span>
        </div>
        <div
          onClick={onCopy}
          className="w-full  cursor-pointer max-w-[225px] h-[45px] flex items-center justify-center rounded-lg shadow m-auto text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm text-center "
        >
          复制链接，邀请好友
        </div>
      </div>
    </div>
  )
}
