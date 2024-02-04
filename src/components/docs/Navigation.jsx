import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation({ navigation, className }) {
  const pathName = usePathname()

  return (
    <div className=" w-64 h-[calc(100vh_-_82px)]  overflow-y-scroll scrollbar  shrink-0  bg-white z-0">
      <div className="h-full py-10 border-r">

        {navigation?.map((item, index) => <div key={index} className="mb-5">
          <h4 className="w-full cursor-default">
            <div className="flex justify-between">
              <p className="text-slate-800 mb-4 tracking-wide font-semibold text-md lg:text-sm">{item?.title}</p>
            </div>
          </h4>
          <ul>
            {
              item?.children?.map((child, ind) => <li key={ind} className="items-center">
                <a href={child?.href}>
                  <span
                    className={`text-slate-500 hover:text-slate-700 hover:border-slate-400 relative block border-l-2 ml-1 pl-4 py-1.5  font-normal text-md lg:text-sm transition-all ${pathName === child?.href ? "text-blue-500 border-current" : ""}`}
                    aria-hidden="true"
                  > {child?.title}
                  </span>
                </a>
              </li>)
            }
          </ul>

        </div>)}

      </div>
    </div>
  )
}
