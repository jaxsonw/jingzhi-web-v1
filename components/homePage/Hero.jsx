// import config from "../../config"

// export default function Hero() {
//     return <div className="relative isolate px-6 lg:px-8">
//         <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl -top-40" aria-hidden="true">
//             <div
//                 className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//                 style={{
//                     clipPath:
//                         'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
//                 }}
//             />
//         </div>
//         <div className="mx-auto max-w-2xl py-4 sm:py-16 lg:py-10">
//             {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
//         <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
//           开发文档，请移步
//           <a href="/docs" className="font-semibold text-indigo-600 ml-1">
//             <span className="absolute inset-0" aria-hidden="true" />
//             开发者中心 <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </div> */}
//             <div className="text-center">
//                 <h4 className="stroke-2 font-mono	stroke-[black] text-black  sm:text-6xl flex flex-col">
//                     <span
//                         style={{
//                             textShadow: '0 1px white, 1px 0 white, -1px 0 white, 0 -1px white'
//                         }}
//                     >
//                         {config.title} 终极智能枢纽
//                     </span>
//                 </h4>
//                 <p className="mt-6 text-lg leading-8 text-gray-600">
//                     作为一个汇聚AI模型接口调用方式的终极智能枢纽，{config.title}
//                     为用户带来了无限的便利和可能性。无论是开发者、研究人员还是普通用户，您都可以通过AGICTO快速接入和使用各种优秀的AI模型，提升工作效率和创造力。
//                 </p>
//                 <div className="mt-10 flex items-center justify-center gap-x-6">
//                     <a
//                         href="#"
//                         className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                         开始使用
//                     </a>
//                 </div>
//             </div>
//         </div>
//     </div>
// }

import Image from 'next/image'
import Button from '../common/Button'
import Container from '../common/Container'
import config from "../../config"

export default function Hero() {
    return (
        <Container className="pb-16 pt-20 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                {config.title}
                <span className="relative whitespace-nowrap text-blue-600">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                        preserveAspectRatio="none"
                    >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                    <span className="relative">终极智能枢纽</span>
                </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                作为一个汇聚AI模型接口调用方式的终极智能枢纽，{config.title}
                为用户带来了无限的便利和可能性。无论是开发者、研究人员还是普通用户，您都可以通过{config.title}快速接入和使用各种优秀的AI模型，提升工作效率和创造力。
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
                <Button href="/register">立即开始</Button>
            </div>
        </Container>
    )
}
