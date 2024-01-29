'use client'
import { navigation } from './const'
import { Navigation } from '../../components/docs/Navigation'
import { MobileNavigation } from '../../components/docs/MobileNavigation'

export default function Layout({ children }) {
    return (
        <>

            <div className="relative flex flex-col max-w-8xl   sm:px-2 lg:px-8 xl:px-12">
                <div className="p-5 pb-0">
                    <MobileNavigation navigation={navigation} />
                </div>
                <div className="hidden w-[200px] lg:relative lg:block lg:flex-none  h-[calc(100vh_-_82px)] overflow-y-auto border-r">
                    <div className="sticky top-[4.6rem] -ml-0.5 py-16">
                        <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
                        <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />

                        <Navigation navigation={navigation} className="w-64 pr-8 xl:w-72 xl:pr-16" />
                    </div>
                </div>
                <div className="h-[calc(100vh_-_82px)] grow overflow-y-auto  px-5 py-5">{children}</div>
            </div>
        </>
    )
}

// function useTableOfContents(tableOfContents) {
//     let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

//     let getHeadings = useCallback(() => {
//         function* traverse(node) {
//             if (Array.isArray(node)) {
//                 for (let child of node) {
//                     yield* traverse(child)
//                 }
//             } else {
//                 let el = document.getElementById(node.id)
//                 if (!el) return

//                 let style = window.getComputedStyle(el)
//                 let scrollMt = parseFloat(style.scrollMarginTop)

//                 let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
//                 yield { id: node.id, top }

//                 for (let child of node.children ?? []) {
//                     yield* traverse(child)
//                 }
//             }
//         }

//         return Array.from(traverse(tableOfContents))
//     }, [tableOfContents])

//     useEffect(() => {
//         let headings = getHeadings()
//         if (tableOfContents.length === 0 || headings.length === 0) return
//         function onScroll() {
//             let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)

//             let top = window.pageYOffset
//             let current = sortedHeadings[0].id
//             for (let i = 0; i < sortedHeadings.length; i++) {
//                 if (top >= sortedHeadings[i].top) {
//                     current = sortedHeadings[i].id
//                 }
//             }
//             setCurrentSection(current)
//         }
//         window.addEventListener('scroll', onScroll, {
//             capture: true,
//             passive: true,
//         })
//         onScroll()
//         return () => {
//             window.removeEventListener('scroll', onScroll, {
//                 capture: true,
//                 passive: true,
//             })
//         }
//     }, [getHeadings, tableOfContents])

//     return currentSection
// }
