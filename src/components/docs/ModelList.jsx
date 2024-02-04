import Image from 'next/image'

import { Button } from '../common/Button'
// import { Heading } from '@/components/Heading'
// import logoGo from '@/images/logos/go.svg'
// import logoNode from '@/images/logos/node.svg'
// import logoPhp from '@/images/logos/php.svg'
// import logoPython from '@/images/logos/python.svg'
// import logoRuby from '@/images/logos/ruby.svg'

const libraries = [
    {
        href: "https://platform.openai.com/doc",
        name: 'OpenAI',
        description:
            '全球最先进的大模型',
        // logo: logoPhp,
    },
    {
        href: "https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.dbf912b02dNFsa",

        name: '通义千问',
        description:
            '阿里通义千问大模型；可联网',
        // logo: logoRuby,
    },
    {
        href: "https://platform.baichuan-ai.com/docs/api",

        name: '百川',
        description:
            '汇聚世界知识，创作妙笔生花；可联网',
        // logo: logoNode,
    },
    {
        href: "https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Nlks5zkzu",

        name: '文心大模型',
        description:
            '百度全新一代知识增强大语言模型',        // logo: logoPython,
    },
    {
        href: "https://www.xfyun.cn/doc/spark/Web.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E",

        name: '讯飞星火',
        description:
            '科大讯飞推出的新一代认知智能大模型',          // logo: logoGo,
    },
    {
        href: "https://cloud.tencent.com/document/product/1729/101848",
        name: '腾讯混元',
        description:
            `由腾讯研发的大语言模型`,          // logo: logoGo,
    },
    {
        href: "https://ai.360.com/platform/docs/overview",
        name: '360智脑',
        description:
            `由腾讯研发的大语言模型，具备强大的中文创作能力`,          // logo: logoGo,
    },

]

export function Libraries() {
    return (
        <div className="my-2 xl:max-w-none">
            <div className="not-prose  grid grid-cols-1 gap-x-6 gap-y-10  pt-4  sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
                {libraries.map((library) => (
                    <div key={library.name} className="flex flex-row-reverse gap-6">
                        <div className="flex-auto">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                {library.name}
                            </h3>
                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                {library.description}
                            </p>
                            <p className="mt-4">
                                <Button href={library.href} variant="text" arrow="right">
                                    查看文档
                                </Button>
                            </p>
                        </div>
                        {/* <Image
                            src={library.logo}
                            alt=""
                            className="h-12 w-12"
                            unoptimized
                        /> */}
                    </div>
                ))}
            </div>
        </div>
    )
}
