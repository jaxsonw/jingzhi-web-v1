import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: '多样化的AI服务',
        description:
            '我们平台提供了广泛的AI服务，您可以根据项目的需求选择最适合的AI工具，将其灵活应用于各种应用场景。',
        icon: CloudArrowUpIcon,
    },
    {
        name: '简单易用的界面',
        description:
            '我们的平台采用直观的界面设计，使用户能够快速上手，无需编写复杂的代码',
        icon: LockClosedIcon,
    },
    {
        name: '安全可靠的平台',
        description:
            '我们致力于保护客户数据的安全和隐私，采取严格的数据保护措施和安全协议。数据在传输和存储时进行加密，确保客户数据的机密性和完整性。',
        icon: ArrowPathIcon,
    },
    {
        name: '协作和团队管理工具',
        description:
            '我们的平台提供了协作和团队管理工具，方便用户与团队成员进行高效合作。',
        icon: FingerPrintIcon,
    },
]

export default function Example() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="absolute inset-0 z-20 bg-[radial-gradient(45rem_100rem_at_top,theme(colors.indigo.200),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-8 w-[300%] origin-top-left skew-x-[-40deg] skew-y-[0deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-8 xl:origin-center" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        我们的优势
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16 text-left">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
