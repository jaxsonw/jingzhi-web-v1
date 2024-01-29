import { Bars3Icon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'API keys', href: '/space/apikey', icon: HomeIcon, title: 'API keys', isMenu: true },
  {
    name: '充值中心',
    href: '/space/recharge',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: '充值中心',
    isMenu: true
  },
  {
    name: '订单列表',
    href: '/space/order',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
    ),
    title: '订单列表',
    isMenu: true
  },
  // { name: '费用明细', href: '/space/overflow', icon: UsersIcon, title: '费用明细', isMenu: true },

  { name: '订单支付', href: '/space/recharge/pay', icon: UsersIcon, title: '订单支付', isMenu: false }

  // { name: "Projects", href: "apiKeys", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "apiKeys", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "apiKeys", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "apiKeys", icon: ChartPieIcon, current: false },
]

export default navigation
