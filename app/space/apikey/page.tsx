import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const statuses = {
  enabled: 'text-green-700 bg-green-50 ring-green-600/20',
  disabled: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20'
}
const projects = [
  {
    id: 1,
    name: 'GraphQL API',
    href: '#',
    status: 'enabled',
    createdBy: 'Leslie Alexander',
    dueDate: 'March 17, 2023',
    createTime: '2023-03-17T00:00Z'
  },
  {
    id: 2,
    name: 'New benefits plan',
    href: '#',
    status: 'disabled',
    createdBy: 'Leslie Alexander',
    dueDate: 'May 5, 2023',
    createTime: '2023-05-05T00:00Z'
  },
  {
    id: 3,
    name: 'Onboarding emails',
    href: '#',
    status: 'disabled',
    createdBy: 'Courtney Henry',
    dueDate: 'May 25, 2023',
    createTime: '2023-05-25T00:00Z'
  },
  {
    id: 4,
    name: 'iOS app',
    href: '#',
    status: 'disabled',
    createdBy: 'Leonard Krasner',
    dueDate: 'June 7, 2023',
    createTime: '2023-06-07T00:00Z'
  },
  {
    id: 5,
    name: 'Marketing site redesign',
    href: '#',
    status: 'enabled',
    createdBy: 'Courtney Henry',
    dueDate: 'June 10, 2023',
    createTime: '2023-06-10T00:00Z'
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function APIKeys() {
  return (
    <div>
      <h4 className="font-bold">请勿与他人共享API密钥，或在浏览器或其他客户端代码中公开该密钥。</h4>
      <ul role="list" className="divide-y divide-gray-100">
        {projects.map(project => (
          <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                <p
                  className={classNames(
                    statuses[project?.status || ''],
                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {project.status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  <time dateTime={project.createTime}>{project.createTime}</time>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
