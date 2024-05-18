
'use client'
import { useRef } from 'react'
import InView from '../../components/baseg/inView'
import Footer from '@/src/components/common/Footer'

const ComplateIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w - 6 h - 6 ${className} `}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
)

const DoingIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w - 6 h - 6 ${className} `}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
    />
  </svg>
)

const PlanIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w - 6 h - 6 ${className} `}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  </svg>
)

export default function About() {
  const listRef = useRef(null)
  return (
    <>
    <div ref={listRef} className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <InView containerRef={listRef}>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth={0} />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
      </InView>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <InView containerRef={listRef}>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">使命</h1>
              </InView>
              <InView containerRef={listRef}>
                <p className="mt-6 text-base leading-8 text-gray-700">
                    在 AGICTO，我们坚信人工智能，特别是大型语言模型（LLM），具有提升人类能力的变革力量。我们的使命是让 LLM 应用程序的开发变得简单、高效，并惠及所有人。我们致力于为开发者提供一套集成工具，以简化 LLM 系统的创建和部署，确保每个人都能享受到这些技术带来的好处，从而为人类进步做出积极贡献。
                </p>
              </InView>
            </div>
            <div className="lg:pr-4">
              <InView containerRef={listRef}>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">愿景</h2>
              </InView>
              <InView containerRef={listRef}>
                <p className="mt-6 text-base leading-8 text-gray-700">
                    我们的愿景是赋能百万开发者和企业,让他们轻松驾驭大模型的力量,用创新重塑行业格局。我们提供易用灵活的LLM平台和定制化方案,显著降低技术门槛,助力实现数字化转型和业务增长。
                </p>
              </InView>
              <InView containerRef={listRef}>
                <div className="mt-6 text-base leading-8 text-gray-700">
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">我们的定位</h2>
                  <p className="mt-6 text-base leading-8 text-gray-700">
                    AGICTO是一个全方位的AI开发平台和生态,致力于赋能开发者快速构建和部署高质量的AI应用。
                  </p>
                  <p >
                    我们提供:
                  </p>
                  <ol>
                    <li>丰富的模型选择</li>
                    <li>强大的开发工具</li>
                    <li>多模态支持</li>
                    <li>易用的应用组件</li>
                    <li>AI低代码能力</li>
                    <li>客服系统、RagCTO等开箱即用的解决方案</li>
                    <li>统一的兼容OpenAI的SDK</li>
                  </ol>
                  <p>
                    全面覆盖AI应用开发周期的各个环节。
                  </p>
                  <p>
                    通过AGICTO,开发者可以轻松访问和调试海量模型,利用模型广场和Prompt工程快速调试模型质量,集成知识库、智能体等应用组件,借助RAG增强技术快速构建支持多模态交互的AI应用,进一步加速AI应用的落地。
                  </p>
                </div>
              </InView>
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <InView containerRef={listRef}>
                    <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">我们做了哪些事情</h2>
                  </InView>
                  <InView containerRef={listRef}>
                    <div>
                      <h3 className="mt-8 font-semibold text-gray-900">第一阶段: 构建 AI 基础设施</h3>
                      <p className="mt-2">
                        我们提供40+主流模型调用服务，并搭建了模型调用、API Key管理、计费和token统计系统：
                      </p>
                      <ul className="mt-4 space-y-2 text-gray-600">
                        <li>- 调用统计: 分析调用数据</li>
                        <li>- 计费管理: 多样化计费方案</li>
                        <li>- API Key管理: 统一、安全管理</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mt-8 font-semibold text-gray-900">第二阶段: 打造模型服务中心</h3>
                      <p className="mt-2">
                        我们提供了一站式模型体验和选择，以及优化和管理工具，加强模型测试和对比。
                      </p>
                      <ul className="mt-4 space-y-2 text-gray-600">
                        <li>- 模型广场: 一站式模型体验和选择</li>
                        <li>- Prompt 工具: 提供优化和管理功能</li>
                        <li>- 调试平台升级: 加强模型测试和对比</li>
                      </ul>
                    </div>
                  </InView>

              </div>
            </div>
          </div>
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <InView containerRef={listRef}>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">近期我们在做的事情</h2>
              </InView>
                <InView containerRef={listRef}>
                  <div>
                    <h3 className="mt-8 font-semibold text-gray-900">第三阶段: 构建应用中心</h3>
                    <p className="mt-2">
                      我们构建了功能丰富、可扩展的应用中心，满足各类 AI 应用需求。
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-600">
                      <li>- 知识库: 支持多源异构数据集成，提供高效知识管理</li>
                      <li>- 智能体: 引入对话型、任务型等智能体，提供智能服务</li>
                      <li>- 插件系统: 允许用户灵活扩展和定制应用功能</li>
                    </ul>
                    <p className="mt-4">
                      我们正在开源企业级项目 RagCTO，基于检索增强生成技术，提供完整的知识管理和智能客服功能，支持快速部署。RagCTO作为一个RAG引擎，可灵活更换向量数据库和大语言模型，助力企业快速搭建特定垂直领域的智能客服系统。
                    </p>
                  </div>
                </InView>

            </div>
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <InView containerRef={listRef}>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">未来计划</h2>
              </InView>
              <InView containerRef={listRef}>
                <h3 className="mt-8 font-semibold text-gray-900">第四阶段:构建AI生态</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>- 丰富AI业务场景:深入探索AI在各行业的应用,提供行业解决方案和最佳实践</li>
                  <li>- 完善AI工具链:提供覆盖AI开发全流程的工具套件,提升开发效率和质量</li>
                  <li>- 升级AI SDK:优化SDK的易用性和性能,支持更多编程语言和平台</li>
                </ul>
              </InView>
              <InView containerRef={listRef}>
                <h3 className="mt-8 font-semibold text-gray-900">第五阶段:引入AI低代码平台</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>- 打造AI低代码开发平台:通过可视化拖拽、组件化开发等方式,降低AI应用开发门槛</li>
                  <li>- 提供AI应用模板和组件库:集成常见AI应用模板和预置组件,实现快速搭建和交付</li>
                  <li>- 支持定制化AI应用开发:允许用户灵活定制和扩展AI应用,满足特定业务需求</li>
                </ul>
              </InView>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Footer></Footer>
    </>
  )
}
