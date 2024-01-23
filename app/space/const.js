import { Bars3Icon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'API keys', href: '/space/apikey', icon: HomeIcon, title: 'API keys' },
  { name: '账户中心', href: '/space/recharge', icon: UsersIcon, title: '账户中心' }

  // { name: "Projects", href: "apiKeys", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "apiKeys", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "apiKeys", icon: DocumentDuplicateIcon, current: false },
  // { name: "Reports", href: "apiKeys", icon: ChartPieIcon, current: false },
]

export default navigation
