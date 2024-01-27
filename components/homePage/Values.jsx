import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: '创新性',
        description:
            '我们相信在创新中寻求解决方案是实现技术突破和推动进步的关键。',
        icon: CloudArrowUpIcon,
    },
    {
        name: '用户体验',
        description: '我们始终以用户为中心，致力于提供出色的用户体验和优质的服务质量。',
        icon: LockClosedIcon,
    },
    {
        name: '可持续性',
        description: '我们致力于推动可持续发展，将人工智能技术应用于环境保护、社会责任和经济增长。',
        icon: ServerIcon,
    },
    {
        name: '安全性',
        description: '我们倡导安全优先原则，致力于保护用户数据的隐私和安全。',
        icon: ServerIcon,
    },
]

export default function Example() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto grid max-w-2xl text-left grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的价值观</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                成为全球领先的AI聚合平台，推动人工智能技术的广泛应用，并为人们创造更智能、更优化和更可持续的未来。
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>
                                        <br />
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        src="https://ew6.cn/bg2.png"
                        alt="Product screenshot"
                        className="hidden lg:block absolute w-auto h-full z-[99] rounded-xl  right-0  top-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    )
}
