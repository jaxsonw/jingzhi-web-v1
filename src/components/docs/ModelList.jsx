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
        href: "https://platform.openai.com/doc",

        name: '通义千问',
        description:
            '国内大模型；可联网',
        // logo: logoRuby,
    },
    {
        href: "https://platform.openai.com/doc",

        name: '百川',
        description:
            '国内大模型；可联网',
        // logo: logoNode,
    },
    {
        href: "https://platform.openai.com/doc",

        name: '文心一言',
        description:
            '国内大模型；不可联网',        // logo: logoPython,
    },
    {
        href: "https://platform.openai.com/doc",

        name: '讯飞星火',
        description:
            '国内大模型；不可联网',          // logo: logoGo,
    },
    {
        href: "https://platform.openai.com/doc",

        name: '腾讯混元',
        description:
            '国内大模型；不可联网',          // logo: logoGo,
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
