import { Bars3Icon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AiOutlineKey } from 'react-icons/ai'
import { RiMoneyCnyCircleLine } from 'react-icons/ri'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { IoStatsChartOutline } from 'react-icons/io5'
import { AiFillTags } from 'react-icons/ai'

const navigation = [
  { name: 'API keys', href: '/space/apikey/', icon: AiOutlineKey, title: '创建你的KEY', enTitle: 'CREATE YOUR KEY', isMenu: true },
  {
    name: '充值中心',
    href: '/space/recharge/',
    icon: RiMoneyCnyCircleLine,
    title: '充值中心',
    enTitle: 'RECHARGE CENTER',
    isMenu: true
  },
  {
    name: '我的订单',
    href: '/space/order/',
    icon: HiOutlineClipboardList,
    title: '我的订单',
    enTitle: 'MY ORDER',
    isMenu: true
  },
  { name: '消耗统计', href: '/space/costs/', icon: IoStatsChartOutline, title: '消耗统计', enTitle: 'EXPENDITURE STATISTICS', isMenu: true },

  { name: '订单支付', href: '/space/recharge/pay/', icon: UsersIcon, title: '订单支付', isMenu: false },
  // { name: '我要开发票', href: '/space/invoice', icon: AiFillTags, title: '我要开发票', enTitle: 'INVOICING', isMenu: true }
]

export default navigation
