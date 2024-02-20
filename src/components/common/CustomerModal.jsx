import { Dialog, DialogPanel } from '@tremor/react'
import { IoMdClose } from 'react-icons/io'
import {agicto_product_agent_wechat} from "../../consts/img"
import {title} from "../../../config"

export default function CustomerModal({ isOpen,setIsOpen }) {
  return (
    <Dialog open={isOpen} onClose={val => setIsOpen(val)} static={true}>
      <DialogPanel className="w-full flex flex-col justify-center items-center">
        <div className='flex justify-end w-full text-right'><span className="flex p-1 cursor-pointer" onClick={()=>setIsOpen(false)}><IoMdClose size={24} /></span></div>
        <img src={agicto_product_agent_wechat} alt={title} />
        <span className="mt-4">任何问题均可联系官方客服</span>
      </DialogPanel>
    </Dialog>
  )
}
