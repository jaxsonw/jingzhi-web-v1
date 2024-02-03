import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from "react-toastify";
import { editKey } from "../../services/key"


export default function Example({ open, setOpen, onOk }) {

  const cancelButtonRef = useRef(null)

  const [keyName, setKeyName] = useState("")


  const onCreate = async () => {

    if (!keyName) {
      return toast.error("请输入key名称")
    }

    const res = await editKey({
      name: keyName,
    })
    if (res?.code === 0) {
      setOpen(false)
      toast.success("创建成功～")
      onOk()
    } else {
      toast.error(res?.message || "创建失败～")
    }
  }

  const onKeyNameChange = (e) => setKeyName(e?.target?.value)



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative p-5 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    名称 <span className='text-rose-700'>*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={onKeyNameChange}
                      type="text"
                      className="shadow-sm h-[45px] outline-none border px-4 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="名称"
                    />
                  </div>
                </div>

                <div className="  flex justify-end items-center mt-10 ">

                  <button
                    type="button"
                    className="flex  w-[65px] justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    className="flex  w-[65px] justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 ml-3 "
                    onClick={onCreate}
                  >
                    创建
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
