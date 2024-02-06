import { Bars3Icon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AiOutlineKey } from "react-icons/ai";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoStatsChartOutline } from "react-icons/io5";




const navigation = [
  { name: 'API keys', href: '/space/apikey', icon: AiOutlineKey, title: 'API keys', enTitle:"CREATE YOUR KEY", isMenu: true },
  {
    name: '充值中心',
    href: '/space/recharge',
    icon: RiMoneyCnyCircleLine,
    title: '充值中心',
    enTitle:"RECHARGE CENTER",
    isMenu: true
  },
  {
    name: '我的订单',
    href: '/space/order',
    icon: HiOutlineClipboardList,
    title: '我的订单',
    enTitle:"MY ORDER",
    isMenu: true
  },
  { name: '消耗统计', href: '/space/costs', icon: IoStatsChartOutline, title: '消耗统计', enTitle:"EXPENDITURE STATISTICS", isMenu: true },

  { name: '订单支付', href: '/space/recharge/pay', icon: UsersIcon, title: '订单支付', isMenu: false }

  // { name: "Projects", href: "apiKeys", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "apiKeys", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "apiKeys", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "apiKeys", icon: ChartPieIcon, current: false },
]

export default navigation
