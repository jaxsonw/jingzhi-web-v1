export default function Example() {
    return (
        <div className="flex flex-col">
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <div className="flex items-center justify-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的使命</p>
                    </div>
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-indigo-600 sm:text-2xl sm:leading-9">
                            <p>“为全球用户提供灵活、高效且创新的人工智能解决方案，帮助他们实现更好的工作效率、更高的决策准确性和更大的业务成功。”</p>
                        </blockquote>
                        <figcaption className="mt-10">
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <img className="h-20" src="https://ew6.cn/agicto-logo.png" alt="" />
                                <div className="font-semibold text-gray-900">Stark Wang</div>
                                <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <div className="text-gray-600">CEO & 创始人</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>
            <footer className="bg-white">
                <div className="max-w-7xl border-t border-gray-200 mx-auto overflow-hidden sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">

                        <p className="w-full lg:mt-8 flex flex-col text-center   justift-end text-gray-400 md:mt-0 md:order-1">
                            <span>官方客服</span>
                            <img src="https://ew6.cn/stark_qrcode.jpg" alt="stark_wechat" className="w-40 m-auto" />
                            <span>2024 AGICTO & AI终极智能枢纽</span>
                            <a href="https://beian.miit.gov.cn" className="underline lg:mt-2">
                                冀ICP备2023005620号-4
                            </a>

                        </p>

                    </div>
                </div>
            </footer>
        </div>
    )
}
