import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: '超越期望，持续创新',
        description:
            '我们追求超越期望的目标，并持续创新来满足用户的不断变化的需求。 ',
        icon: CloudArrowUpIcon,
    },
    {
        name: '创造更智能、更优化和更可持续的未来',
        description: '通过人工智能技术的应用，创造一个更智能、更优化和更可持续的未来。 ',
        icon: LockClosedIcon,
    },
    {
        name: '推动人工智能技术的广泛应用',
        description: '我们相信人工智能的潜力是无限的，可以在各个行业和领域创造巨大的价值。我们致力于让更多的人了解人工智能并应用它，帮助他们解决问题、优化流程、提高效率并实现更大的成功。',
        icon: ServerIcon,
    },
    {
        name: '成为全球领先的AI聚合平台',
        description: '我们致力于汇集来自各个领域的优秀人工智能解决方案，为用户提供全面的AI服务和工具，帮助他们在不同领域实现业务增长和创新发展。',
        icon: ServerIcon,
    },
]

export default function Example() {
    return (
        <div className="overflow-hidden bg-white w-full py-24 sm:py-32 flex justify-end lg:pr-56">
            <div className="mr-0 max-w-7xl px-6 lg:px-8 ">
                <div className="mr-0 grid max-w-2xl text-left grid-cols-1 gap-x-8 gap-y-16  ">
                    <div className="lg:pr-8 lg:pt-4 sm:p-4">
                        <div className="lg:max-w-lg">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的愿景</p>
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
                        src="https://ew6.cn/bg1.png"
                        alt="Product screenshot"
                        className="hidden lg:block absolute w-auto h-full z-[99] rounded-xl  left-0  top-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>

        </div>
    )
}
