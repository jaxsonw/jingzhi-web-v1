'use client'

import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Highlight from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown'
import './style.model.css'
import { github, routeros } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { copyValue } from '@/src/utils'
import { HeaderJingzhi } from '@/src/components/common/HeaderJingzhi'
import { FooterJingzhi } from '@/src/components/common/FooterJingzhi'
import { BASE_URL } from '../../../consts/env'

const ModelDetail = ({ data, status, codeHtml, code }) => {
  const router = useRouter()
  const modelData = data
  const [pageStatus, setPageState] = useState(status)
  const [codeType, setCodeType] = useState('curl')

  const codes = {
    python: `from openai import OpenAI

client = OpenAI(
    api_key = "自己的API key",
    base_url = "${BASE_URL}"
)
        
chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "你是谁，用中文回答",
        }
    ],
    model="${modelData.modelName}",
)
print(chat_completion.choices[0].message.content)`,

    javascript: `import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '你自己的 key',
  baseURL: '${BASE_URL}',
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                "role": "user",
                "content": "你是谁，用中文回答",
            }],
        model: "${modelData.modelName}",
    });

    console.log(completion.choices[0]);
}

main();`,

    curl: `curl "${BASE_URL}" \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer $JINGZHI_API_KEY" \\
    -d '{
        "model": "${modelData.modelName}",
        "messages": [
            {
                "role": "user",
                "content": "你是谁，用中文回答"
            }
        ]
    }'`
  }

  const setUrl = status => {
    const url = window.location
    const arr = url.pathname.split('?')
    arr.pop()
    history.replaceState('', '', `?status=${status}`)
  }

  return (
    <div>
      <HeaderJingzhi active="/modelplaza/" />

      <div className={" max-w-[1440px] m-auto px-[10px] md:px-[120px] pt-[90px]"}>

        <title>{modelData.modelName + '模型详情'}</title>
        <meta name="description" content={modelData.desc} />
        <meta name="keywords" content={`${modelData.modelName}`} />
        <div className="flex justify-between leading-[22px] text-base mb-[37px]">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => {
              router.back()
            }}
          >
            <img
              className="w-[10px] h-[14px] mr-[4px]"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAcCAYAAABh2p9gAAACC0lEQVRIS62WvU7bUBSAz73XJrabOA1UhAxUNDRLt1ZN2foWeQcYujAwAlHHUjWo7QaiUtWtQ4r6AB2glSqVBbGgVFilYgQSHP/c3JtUrhMnim4SG9mz9fn8fOccI7jdg9Pa4uMOyPsyUXOUXW/d2GdrHgpF55VIUjl6jrH8SZaSOQQIKKvXGtZp4RbAEplWj5cY6nz2YRh4m3KXXZYt5/xlVCDW1UdFhDsfJaIVfJjLW6yxYzrGCgB0IgF1dWEJkFKVpTtzPsyhjDffZG28UYOa2ytdqBomEvOLipT6LhNt1is7b7uUcbOSymTKFxe/rME+TAQqyv28QrQDiSRzPoxyxpuvZmxWNsBwhps6DojTWv4JIOWrTLSsD3MY5fX3TfvPKgC0RYaMAJaIrp48BdSuylJyzlPDg7V4/Z3pw/43ICTQV4Nj9KHfTcopv3rbjWwkTNTlUWrsmo6xPC4yYZd19cEzQIkvk9QYN11BDQVqcMbNrbSdLf+FH3bYEQ2Aulb4OSWliz01Wux6756DXojUCBVh7MBuyod951wv5deiaQgVofeSruWLAFP7Q02pZG28PjivoYEAEK82/pfjFbubTayjF1QozuXQL3uc6yugihdsczuVubsZecH2qOITYFVm7PkNA74Fi3bixh5wLpRSUYCBUnGd0UApwaH/3bBOH0Y6o0PjNvJX5B/ruW4syLef1AAAAABJRU5ErkJggg=="
            />
            <span>返回</span>
          </div>
          {/* <Link href="/docs">
                <div className="flex items-center">
                    <img className="w-[12px] h-[14px] " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAAXNSR0IArs4c6QAAAhhJREFUSEu11snLzVEcx/HXg5AyLWSjCFGysGFrY4qFEhY2LAwLMpQiREQRZSgrGywsKGWjiH9AyFyEpRILQ+Ex9+HcerrufZzr5tTtV797zvf9+46f0+P3GoJDWINh5V3N4zbW4Wa7zT3ljyW4gAd4iR8V1idgCu5idTtIAPntwhbMwtMK49myCYcxCA+xCreaz8b4AOzBSszDkwpAzm3DRlzGMjwrkHt9z/cF5AsCeNwBYH05Mw7n8Rp5d7VhoxvAdmzAXDzCIpzDC2zGlUD+FZCzK3AWZ3AHAzEfC0qYl+J+N4CxxfjMEo5UXuyl5FPqO1L63QBiN4ZmYHQp7W8Yj4M4gX3dAlrVwyRcL97t/R+AqaWKTqMtIL2RpluIuN3fSnLTCzfwHVWAJGo/tlb0RLYcKdOgtxaQ0I3BxErAc7wqia7yIIARGFkJeIt3nQAGYzd2VgIOpCTxuTZESdwcLK5M8iVcK3urQtT48FEV2pBwvunjaRUgVZR5n3nzN/EJIEPuOKqrKCKyvEhoTR+cKuP6a20O4nESPbyNB/Eq4MaA+4gvJUxVIUqSZyMjN93ZLFLvi4b/IZG1HgwtJRoZbc5BYp5YH8PJFmVc5UHOJTzT2njwqYhKns2rLaAT0e+v/3KViSZH6X5N03+9trSDTC6T9WgGZjcXr1aA2IuUTi9XmYsNQBorMre2w6tjK8gHpC9yb+r9CYTzsEFYol9MAAAAAElFTkSuQmCC" />
                    <span className="ml-[4px]">帮助文档</span>
                </div>
            </Link> */}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="leading-[33px] text-2xl mr-[8px] font-bold">{modelData.modelName}</div>
              {modelData.isFree === 1 && (
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="80px" height="26px" viewBox="0 0 80 26" version="1.1">
                  <title>free</title>
                  <defs>
                    <linearGradient x1="0%" y1="44.71875%" x2="100%" y2="55.28125%" id="linearGradient-1">
                      <stop stopColor="#46AD76" offset="0%" />
                      <stop stopColor="#46CA92" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g id="模型详情" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="模型详情-模型介绍" transform="translate(-305.000000, -157.000000)">
                      <g id="free" transform="translate(305.000000, 157.000000)">
                        <path
                          d="M0,0 L68,0 C74.627417,-1.21743675e-15 80,5.372583 80,12 L80,26 L80,26 L12,26 C5.372583,26 2.18216909e-15,20.627417 0,14 L0,0 L0,0 Z"
                          id="Rectangle"
                          fill="url(#linearGradient-1)"
                        />
                        <text
                          id="免费使用"
                          fontFamily="Alibaba-PuHuiTi-R, Alibaba PuHuiTi"
                          fontSize="14"
                          fontWeight="normal"
                          letterSpacing="0.000311111111"
                          fill="#FFFFFF"
                        >
                          <tspan x="12" y="18">
                            免费使用
                          </tspan>
                        </text>
                      </g>
                    </g>
                  </g>
                </svg>
              )}
            </div>
            <div className="flex items-center">
              <div>
                <div className="text-[#80838A] text-xs mb-[8px]">
                  <span>{`由${modelData.companyName}提供`}</span>
                  {modelData.tagList?.map((item, index) => (
                    <span key={`modelDetailTags${index}`}>{` | ${item}`}</span>
                  ))}
                </div>
                <ul>
                  {modelData.attrList?.map((Item, index) => (
                    <li className="flex items-center" key={'modelDetailAttr' + index}>
                      <div className="w-[7px] h-[7px] rounded-full bg-[#30BD71] mr-[6px]" />
                      <span>{Item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <Link href={`/playground/?model=${modelData?.apiModelName}&modelType=message`}>
                        <div className="bg-[#3162FF] w-[201px] h-[42px] ml-[81px] rounded-lg leading-[42px] text-center text-[#fff] text-[16px]">
                            立即体验
                        </div>
                    </Link> */}
            </div>
          </div>
        </div>
        <div className="flex w-full mt-[28px] relative z-1 text-[16px]">
          <div
            className={`px-[33px] py-[6px]  ${pageStatus == 1 ? 'border-b-[3px] border-[#ff5005] border-solid text-[#ff5005] cursor-default' : 'cursor-pointer'
              } `}
            onClick={() => {
              if (pageStatus != 1) {
                setPageState(1)
                setUrl(1)
              }
            }}
          >
            模型介绍
          </div>
          <div
            className={`px-[33px] py-[6px]  ${pageStatus == 2 ? 'border-b-[3px] border-[#ff5005] border-solid text-[#ff5005] cursor-default' : 'cursor-pointer'
              }`}
            onClick={() => {
              if (pageStatus != 2) {
                setPageState(2)
                setUrl(2)
              }
            }}
          >
            API调用
          </div>
        </div>
        <div className="relative top-[-1px] w-full h-[2px] bg-[#140E3533] z-0"></div>
        <div className="w-full px-[32px] pb-[50px]">
          {pageStatus == 1 && <ReactMarkdown className="mdrom min-h-[300px]">{modelData?.mdContent?.replaceAll('\\n', '\n') || "暂无介绍"}</ReactMarkdown>}
          {pageStatus == 2 && (
            <div className="w-[100%] md:w-[70%]">
              <div className="text-[24px] mt-[45px] leading-[33px] mb-[20px]">简单示例</div>
              <div className="flex justify-between  mb-[4px]">
                <div className="flex">
                  {/* <div
                    className={`text-[12px] py-[4px] px-[8px] border border-solid border-[#D8D8D8FF] rounded ${codeType === 'python' ? 'bg-[#EEEEEEFF]' : 'text-[#140E3580] cursor-pointer'
                      }`}
                    onClick={() => {
                      if (codeType !== 'python') {
                        setCodeType('python')
                      }
                    }}
                  >
                    Python
                  </div>
                  <div
                    className={`ml-[10px] text-[12px] py-[4px] px-[8px] border border-solid border-[#D8D8D8FF] rounded ${codeType === 'javascript' ? 'bg-[#EEEEEEFF]' : 'text-[#140E3580] cursor-pointer'
                      }`}
                    onClick={() => {
                      if (codeType !== 'javascript') {
                        setCodeType('javascript')
                      }
                    }}
                  >
                    JavaScript
                  </div> */}
                  {/* <div
                    className={`ml-[10px] text-[12px] py-[4px] px-[8px] border border-solid border-[#D8D8D8FF] rounded ${codeType === 'curl' ? 'bg-[#EEEEEEFF]' : 'text-[#140E3580] cursor-pointer'
                      }`}
                    onClick={() => {
                      if (codeType !== 'curl') {
                        setCodeType('curl')
                      }
                    }}
                  >
                    Curl
                  </div> */}
                </div>
                <div
                  className="text-[10px] text-[#140E3580] flex items-center border-solid border border-[#140E351A] py-[4px] px-[8px] rounded cursor-pointer"
                  onClick={() => {
                    copyValue(code || "")
                    message.success('复制成功')
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
                    <title>复制</title>
                    <g id="prompt" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.5">
                      <g id="Prompt工程" transform="translate(-323.000000, -328.000000)" fill="#140E35" fillRule="nonzero">
                        <g id="Group-4" transform="translate(120.000000, 306.000000)">
                          <g id="Group-6" transform="translate(199.000000, 16.000000)">
                            <g id="复制" transform="translate(4.000000, 6.000000)">
                              <path
                                d="M4.2631579,0 L10.8947369,0 C11.5051568,0 12,0.494843171 12,1.10526315 L12,7.7368421 C12,8.34726209 11.5051568,8.84210527 10.8947369,8.84210527 L4.2631579,8.84210527 C3.65273791,8.84210527 3.15789473,8.34726209 3.15789473,7.7368421 L3.15789473,1.10526315 C3.15789473,0.494843165 3.65273791,0 4.2631579,0 Z M4.2631579,0.947368422 C4.17595505,0.947368422 4.10526316,1.0180603 4.10526316,1.10526315 L4.10526316,7.7368421 C4.10526316,7.82404496 4.17595504,7.89473684 4.2631579,7.89473684 L10.8947369,7.89473684 C10.9819397,7.89473684 11.0526316,7.82404495 11.0526316,7.7368421 L11.0526316,1.10526315 C11.0526316,1.0180603 10.9819397,0.947368422 10.8947369,0.947368422 L4.2631579,0.947368422 Z M7.89473684,9.78947369 C7.89473684,9.52786512 8.10681249,9.31578948 8.36842105,9.31578948 C8.63002962,9.31578948 8.84210527,9.52786512 8.84210527,9.78947369 L8.84210527,10.8947369 C8.84210527,11.5051568 8.34726209,12 7.7368421,12 L1.10526315,12 C0.494843171,12 0,11.5051568 0,10.8947369 L0,4.2631579 C0,3.65273791 0.494843165,3.15789473 1.10526315,3.15789473 L2.21052631,3.15789473 C2.47213488,3.15789473 2.68421052,3.36997038 2.68421052,3.63157895 C2.68421052,3.89318751 2.47213488,4.10526316 2.21052631,4.10526316 L1.10526315,4.10526316 C1.0180603,4.10526316 0.947368422,4.17595505 0.947368422,4.2631579 L0.947368422,10.8947369 C0.94736843,10.9819397 1.0180603,11.0526316 1.10526315,11.0526316 L7.7368421,11.0526316 C7.82404495,11.0526316 7.89473684,10.9819397 7.89473684,10.8947369 L7.89473684,9.78947369 Z"
                                id="Shape"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span className="text-[12px] ml-1">复制</span>
                </div>
              </div>
              <div className="bg-[#FDF6E3] p-4 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: codeHtml }} />
                {/* <Highlight language={codeType} style={github}>
                  {codes[codeType] || ""}
                </Highlight> */}
                {/* <pre style={{ display: "block", overflowX: "auto", padding: "0.5em", color: "#333", background: "#f8f8f8" }}>
                  <code className="language-curl" style={{ whiteSpace: "pre" }}>
                    <span>curl </span><span style={{ color: "#d14" }}>"{BASE_URL}/v1/chat/completions"</span><span> \</span><br />
                    <span>    -H </span><span style={{ color: "#d14" }}>"Content-Type: application/json"</span><span> \</span><br />
                    <span>    -H </span><span style={{ color: "#d14" }}>"Authorization: Bearer <a href="/space/apikey/" className=" underline">JINGZHI_API_KEY</a>"</span><span> \</span><br />
                    <span>    -d '</span><span>{`{`}</span><br />
                    <span>        </span><span>"model"</span><span>: </span><span style={{ color: "#d14" }}>"{modelData.modelName}"</span><span>,</span><br />
                    <span>        </span><span>"messages"</span><span>: [</span><br />
                    <span>            {`{`}</span><br />
                    <span>                </span><span>"role"</span><span>: </span><span style={{ color: "#d14" }}>"user"</span><span>,</span><br />
                    <span>                </span><span>"content"</span><span>: </span><span style={{ color: "#d14" }}>"你是谁，用中文回答"</span><br />
                    <span>            {`}`}</span><br />
                    <span>        ]</span><br />
                    <span>    {`}`}</span><span>'</span>
                  </code>
                </pre> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='hidden md:block'>
        <FooterJingzhi />
      </div>
    </div>
  )
}

export default ModelDetail
