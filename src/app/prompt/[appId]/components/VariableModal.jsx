import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-3.5 h-3.5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
  </svg>
)

const TooltipIcon = () => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-tooltip-id="config-var-tooltip">
    <path
      d="M8.66667 11.1667H8V8.5H7.33333M8 5.83333H8.00667M14 8.5C14 9.28793 13.8448 10.0681 13.5433 10.7961C13.2417 11.5241 12.7998 12.1855 12.2426 12.7426C11.6855 13.2998 11.0241 13.7417 10.2961 14.0433C9.56815 14.3448 8.78793 14.5 8 14.5C7.21207 14.5 6.43185 14.3448 5.7039 14.0433C4.97595 13.7417 4.31451 13.2998 3.75736 12.7426C3.20021 12.1855 2.75825 11.5241 2.45672 10.7961C2.15519 10.0681 2 9.28793 2 8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5C9.5913 2.5 11.1174 3.13214 12.2426 4.25736C13.3679 5.38258 14 6.9087 14 8.5Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
)

const defaultConfig = {
  id: uuidv4(),
  field: 'key',
  remark: '',
}
const VariableModal = ({ appDetail, getAllConfig }) => {
  const [configList, setConfigList] = useState(appDetail?.config?.fieldList?.length > 0 ? appDetail?.config?.fieldList : [defaultConfig])

  const addConfig = () => {
    setConfigList([
      ...configList,
      {
        id: uuidv4(),
        field: 'key' + (configList.length + 1),
        remark: '',
      },
    ])
  }

  const onKeyChange = (item, index, e) => {
    const list = JSON.parse(JSON.stringify(configList))
    list[index].field = e?.target?.value
    setConfigList(list)
  }

  const onKeyBlur = (event, index) => {
    const value = event?.target?.value
    const keyIndex = configList.findIndex(item => item.field === value)
    if (keyIndex > -1 && keyIndex !== index) {
      toast.error('key名重复请修改～')
    }
  }

  const onRemarkChange = (item, index, e) => {
    const list = JSON.parse(JSON.stringify(configList))
    list[index].remark = e?.target?.value
    setConfigList(list)
  }

  const onDeleteItem = (item, index) => {
    const list = JSON.parse(JSON.stringify(configList))
    list.splice(index, 1)
    setConfigList(list)
  }

  useEffect(() => {
    getAllConfig(configList)
  }, [configList])

  useEffect(() => {
    setConfigList(appDetail?.config?.fieldList)
  }, [appDetail])

  return (
    <div className="py-2 rounded-xl bg-gray-50  pb-3">
      <div className="pb-2 px-4">
        <div className="flex justify-between items-center h-8">
          <div className="flex items-center space-x-1 shrink-0">
            <div className="flex items-center justify-center w-4 h-4">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.71922 2.96714C3.91321 3.05239 4.06546 3.21112 4.14255 3.4085C4.21964 3.60588 4.21528 3.82578 4.13042 4.01994C3.51419 5.43299 3.1974 6.95838 3.20002 8.49994C3.20002 10.0943 3.53282 11.6087 4.13122 12.9799C4.20853 13.173 4.20766 13.3885 4.1288 13.5809C4.04993 13.7732 3.89927 13.9274 3.70873 14.0106C3.51819 14.0938 3.30274 14.0995 3.10802 14.0266C2.91331 13.9537 2.75464 13.8078 2.66562 13.6199C1.96073 12.0052 1.59791 10.2619 1.60002 8.49994C1.60002 6.68074 1.98002 4.94794 2.66562 3.37994C2.70767 3.28364 2.76829 3.19658 2.84401 3.12371C2.91973 3.05085 3.00906 2.99361 3.1069 2.95528C3.20474 2.91694 3.30917 2.89826 3.41424 2.9003C3.5193 2.90233 3.62293 2.92505 3.71922 2.96714ZM10.368 6.09994C10.0082 6.10002 9.65293 6.18102 9.32862 6.33695C9.0043 6.49288 8.7192 6.71974 8.49441 7.00074L8.23201 7.32874L8.14321 7.10554C8.02447 6.80879 7.81958 6.55441 7.55494 6.37518C7.2903 6.19594 6.97804 6.10008 6.65841 6.09994H6.40001C6.18784 6.09994 5.98436 6.18423 5.83433 6.33426C5.6843 6.48429 5.60002 6.68777 5.60002 6.89994C5.60002 7.11212 5.6843 7.3156 5.83433 7.46563C5.98436 7.61566 6.18784 7.69994 6.40001 7.69994H6.65841L7.08401 8.76394L6.25602 9.79994C6.18103 9.8936 6.08594 9.96919 5.97779 10.0211C5.86964 10.073 5.75119 10.1 5.63122 10.0999H5.60002C5.38784 10.0999 5.18436 10.1842 5.03433 10.3343C4.8843 10.4843 4.80001 10.6878 4.80001 10.8999C4.80001 11.1121 4.8843 11.3156 5.03433 11.4656C5.18436 11.6157 5.38784 11.6999 5.60002 11.6999H5.63122C5.99107 11.6999 6.34629 11.6189 6.67061 11.4629C6.99493 11.307 7.28003 11.0801 7.50481 10.7991L7.76721 10.4711L7.85601 10.6943C7.97481 10.9912 8.17982 11.2457 8.44462 11.4249C8.70942 11.6042 9.02185 11.7 9.34161 11.6999H9.60001C9.81219 11.6999 10.0157 11.6157 10.1657 11.4656C10.3157 11.3156 10.4 11.1121 10.4 10.8999C10.4 10.6878 10.3157 10.4843 10.1657 10.3343C10.0157 10.1842 9.81219 10.0999 9.60001 10.0999H9.34161L8.91602 9.03594L9.74401 7.99994C9.819 7.90629 9.91409 7.8307 10.0222 7.77877C10.1304 7.72684 10.2488 7.6999 10.3688 7.69994H10.4C10.6122 7.69994 10.8157 7.61566 10.9657 7.46563C11.1157 7.3156 11.2 7.11212 11.2 6.89994C11.2 6.68777 11.1157 6.48429 10.9657 6.33426C10.8157 6.18423 10.6122 6.09994 10.4 6.09994H10.3688H10.368ZM11.8672 4.01994C11.7837 3.82571 11.7804 3.6063 11.8581 3.40966C11.9359 3.21303 12.0883 3.05517 12.2821 2.97059C12.4759 2.88602 12.6953 2.8816 12.8923 2.9583C13.0894 3.03501 13.248 3.1866 13.3336 3.37994C14.0388 4.99468 14.4019 6.73795 14.4 8.49994C14.4 10.3191 14.02 12.0519 13.3344 13.6199C13.2946 13.7194 13.2352 13.8098 13.1597 13.8859C13.0843 13.9619 12.9943 14.0221 12.8952 14.0627C12.7961 14.1033 12.6898 14.1236 12.5827 14.1224C12.4756 14.1212 12.3698 14.0985 12.2716 14.0556C12.1735 14.0127 12.0849 13.9506 12.0112 13.8728C11.9375 13.7951 11.8802 13.7033 11.8426 13.603C11.805 13.5027 11.788 13.3959 11.7925 13.2888C11.797 13.1818 11.8229 13.0768 11.8688 12.9799C12.4853 11.567 12.8024 10.0416 12.8 8.49994C12.8 6.90554 12.4672 5.39114 11.868 4.01994H11.8672Z"
                  fill="#FF8A4C"
                ></path>
              </svg>
            </div>
            <div className="text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-2">
                <div>变量</div>
                <div className="tooltip-container">
                  <TooltipIcon />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={addConfig}
              className="flex items-center rounded-md h-7 px-3 space-x-1 text-gray-700 cursor-pointer hover:bg-gray-200"
            >
              <div>
                <AddIcon />
              </div>
              <div className="text-xs font-medium">添加</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 px-3">
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="style_table__7s7DH w-full border-collapse border-0 rounded-lg text-sm">
            <div className="border-b  border-gray-200 text-gray-500 text-xs font-medium">
              <div className="flex px-2">
                <div className="py-2 w-1/3 ">变量 Key</div>
                <div className="py-2 w-1/2 ">字段名称</div>
                <div className="py-2 flex-auto text-center">操作</div>
              </div>
            </div>
            <div className="text-gray-700">
              {configList?.map((item, index) => {
                return (
                  <div key={item?.fieldId || item?.id} className="h-9 leading-9">
                    <div className="h-9 leading-9 flex items-center">
                      <div className="w-1/3 border-b border-gray-100 pl-3">
                        <div className="flex items-center space-x-1">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.48913 4.08334H3.01083C2.70334 4.08333 2.43804 4.08333 2.21955 4.10118C1.98893 4.12002 1.75955 4.16162 1.53883 4.27408C1.20955 4.44186 0.941831 4.70958 0.774053 5.03886C0.66159 5.25958 0.619989 5.48896 0.601147 5.71958C0.583295 5.93807 0.583304 6.20334 0.583313 6.51084V10.9892C0.583304 11.2967 0.583295 11.5619 0.601147 11.7804C0.619989 12.0111 0.66159 12.2404 0.774053 12.4612C0.941831 12.7904 1.20955 13.0582 1.53883 13.2259C1.75955 13.3384 1.98893 13.38 2.21955 13.3988C2.43803 13.4167 2.70329 13.4167 3.01077 13.4167H7.48912C7.7966 13.4167 8.06193 13.4167 8.28041 13.3988C8.51103 13.38 8.74041 13.3384 8.96113 13.2259C9.29041 13.0582 9.55813 12.7904 9.72591 12.4612C9.83837 12.2404 9.87997 12.0111 9.89882 11.7804C9.91667 11.5619 9.91666 11.2967 9.91665 10.9892V6.51087C9.91666 6.20336 9.91667 5.93808 9.89882 5.71958C9.87997 5.48896 9.83837 5.25958 9.72591 5.03886C9.55813 4.70958 9.29041 4.44186 8.96113 4.27408C8.74041 4.16162 8.51103 4.12002 8.28041 4.10118C8.06192 4.08333 7.79663 4.08333 7.48913 4.08334ZM7.70413 7.70416C7.93193 7.47635 7.93193 7.107 7.70413 6.8792C7.47632 6.65139 7.10697 6.65139 6.87917 6.8792L4.66665 9.09172L3.91246 8.33753C3.68465 8.10973 3.31531 8.10973 3.0875 8.33753C2.8597 8.56534 2.8597 8.93468 3.0875 9.16249L4.25417 10.3292C4.48197 10.557 4.85132 10.557 5.07913 10.3292L7.70413 7.70416Z"
                              fill="#98A2B3"
                            ></path>
                            <path
                              d="M10.9891 0.583344H6.51083C6.20334 0.583334 5.93804 0.583326 5.71955 0.601177C5.48893 0.620019 5.25955 0.66162 5.03883 0.774084C4.70955 0.941862 4.44183 1.20958 4.27405 1.53886C4.16159 1.75958 4.11999 1.98896 4.10115 2.21958C4.08514 2.41545 4.08349 2.64892 4.08333 2.91669L7.51382 2.91668C7.79886 2.91662 8.10791 2.91654 8.37541 2.9384C8.67818 2.96314 9.07818 3.02436 9.49078 3.23459C10.0396 3.51422 10.4858 3.96041 10.7654 4.50922C10.9756 4.92182 11.0369 5.32182 11.0616 5.62459C11.0835 5.8921 11.0834 6.20115 11.0833 6.48619L11.0833 9.91666C11.3511 9.9165 11.5845 9.91485 11.7804 9.89885C12.011 9.88 12.2404 9.8384 12.4611 9.72594C12.7904 9.55816 13.0581 9.29045 13.2259 8.96116C13.3384 8.74044 13.38 8.51106 13.3988 8.28044C13.4167 8.06196 13.4167 7.7967 13.4166 7.48922V3.01087C13.4167 2.70339 13.4167 2.43807 13.3988 2.21958C13.38 1.98896 13.3384 1.75958 13.2259 1.53886C13.0581 1.20958 12.7904 0.941862 12.4611 0.774084C12.2404 0.66162 12.011 0.620019 11.7804 0.601177C11.5619 0.583326 11.2966 0.583334 10.9891 0.583344Z"
                              fill="#98A2B3"
                            ></path>
                          </svg>
                          <input
                            onBlur={e => onKeyBlur(e, index)}
                            onChange={e => onKeyChange(item, index, e)}
                            type="text"
                            placeholder="key"
                            maxLength="16"
                            className="h-6 leading-6 block w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-200"
                            defaultValue={item.field}
                          />
                        </div>
                      </div>
                      <div className="w-1/2 py-1 border-b border-gray-100">
                        <input
                          onChange={e => onRemarkChange(item, index, e)}
                          type="text"
                          placeholder="变量名称"
                          maxLength="16"
                          className="h-6 leading-6 block w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-200"
                          defaultValue={item.remark}
                        />
                      </div>

                      <div className="flex-auto border-b border-gray-100">
                        <div className="flex h-full items-center justify-center space-x-1">
                          <div
                            onClick={() => onDeleteItem(item, index)}
                            className="flex items-center justify-center w-6 h-6 text-gray-500 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                              width="16"
                              height="16"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariableModal
