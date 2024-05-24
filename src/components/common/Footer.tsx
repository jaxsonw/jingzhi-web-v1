import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <ul className="flex space-x-4"></ul>
        </div>
        <div className="w-full md:w-auto">
          <ul className="md-4 grid grid-cols-2 gap-4">
            <h3 className="mb-4 text-2xl font-bold">官方客服</h3>
          </ul>
          <div className="flex space-x-2">
            <Image src="https://ew6.cn/agicto_product_agent_wechat.png" alt="QR Code 1" width={120} height={120} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 text-center text-sm">
        <p>Copyright © 2024 AGICTO & AGI大模型基座</p>
        <p>冀ICP备2023005620号-4</p>
      </div>
    </footer>
  )
}

export default Footer
