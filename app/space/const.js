import { Bars3Icon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'API keys', href: '/space/apikey', icon: HomeIcon, title: 'API keys', isMenu: true },
  { name: '充值中心', href: '/space/recharge', icon: UsersIcon, title: '充值中心', isMenu: true },
  { name: '订单列表', href: '/space/order', icon: UsersIcon, title: '订单列表', isMenu: true },
  // { name: '费用明细', href: '/space/overflow', icon: UsersIcon, title: '费用明细', isMenu: true },

  { name: '订单支付', href: '/space/recharge/pay', icon: UsersIcon, title: '订单支付', isMenu: false }

  // { name: "Projects", href: "apiKeys", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "apiKeys", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "apiKeys", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "apiKeys", icon: ChartPieIcon, current: false },
]

export default navigation
