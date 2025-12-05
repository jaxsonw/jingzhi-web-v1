"use client"

import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useEffect, useState } from "react";
import { RiBrainLine, RiChat1Line, RiDatabase2Line, RiRobot2Line, RiStore2Line, RiSwordLine, RiTrophyLine, RiFileAddLine } from "@remixicon/react";

// MenuItem component optimized with memo
const MenuItem = ({
  item,
  isActive,
  href,
  onHover,
}) => {
  return <a
    className={`w-full h-10 flex items-center cursor-pointer px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive
      ? "text-[#FF5005] bg-[#FF500530]"
      : "text-gray-800 hover:bg-gray-100"
      }`}
    href={href}
    onMouseEnter={onHover}
  >
    <div className={`flex items-center justify-center mr-2`}>
      {item.icon}
    </div>
    <div className="text-base text-center">{item.name}</div>
  </a>
}

// Main sidebar component
export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const hideSidebar = ["/workflow", "/explore"];
  //const isHideSidebar = hideSidebar.some((item) => pathname.includes(item)) || process.env.NEXT_PUBLIC_OTHER_USE === "wuhan";
  const isHideSidebar = hideSidebar.some((item) => pathname.includes(item));
  // Track last active path to optimize rendering
  const [lastActivePath, setLastActivePath] = useState(pathname);

  // Update last active path when pathname changes
  useEffect(() => {
    if (pathname !== lastActivePath) setLastActivePath(pathname);
  }, [pathname, lastActivePath]);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleItemClick = useCallback(
    (path) => {
      if (path !== pathname) router.push(path);
    },
    [router, pathname]
  );

  const handleItemHover = useCallback(
    (path) => {
      // Preload target page resources to improve menu switching speed
      router.prefetch(path);
    },
    [router]
  );

  // Memoize menu list to prevent recreation on each render
  const menuList = useMemo(
    () => [
      // Organization menu item removed to match current implementation
      {
        name: "对话",
        pathname: "/chat/",
        path: "/modelplaza/chat/",
        icon: <RiChat1Line className="w-5 h-5" />
      },
      {
        name: "智能体",
        pathname: "apps",
        path: "/modelplaza/apps/",
        icon: <RiRobot2Line className="w-5 h-5" />
      },
      {
        name: "知识库",
        pathname: "datasets",
        path: "/modelplaza/datasets/",
        icon: <RiDatabase2Line className="w-5 h-5" />
      },
      {
        name: "模型广场",
        pathname: "modelsquare",
        path: "/modelplaza/modelsquare/",
        icon: <RiBrainLine className="w-5 h-5" />
      },
      {
        name: "模型竞技场",
        pathname: "battle",
        path: "/modelplaza/battle/",
        icon: <RiSwordLine className="w-5 h-5" />
      },
      {
        name: "模型排行",
        pathname: "rank",
        path: "/modelplaza/rank/",
        icon: <RiTrophyLine className="w-5 h-5" />
      },
      {
        name: "充值管理",
        pathname: "space",
        path: "/space/apikey/",
        icon: <RiStore2Line className="w-5 h-5" />
      },
      {
        name: "模型入驻",
        pathname: "apply",
        path: "/modelplaza/apply/",
        icon: <RiFileAddLine className="w-5 h-5" />
      },
    ],
    []
  );

  // Return null early if sidebar should be hidden
  if (isHideSidebar) return null;

  return (
    <div
      className={`h-screen hidden lg:block sticky left-0 top-0 z-[1] pt-[58px] `}
      style={{ width: 220 }}
    >
      <div
        className="flex h-full w-full bg-white border-r border-gray-200 flex-col items-center justify-between"
      >
        <div className="w-full flex-1 flex flex-col gap-y-2 px-1.5 pt-4 items-center scrollbar-none [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden">
          {menuList.map((item, index) => {
            // Using includes allows partial path matching which is more flexible
            const isActive = pathname.includes(item.pathname)

            // Use memoized MenuItem component
            return (
              <MenuItem
                key={`${item.pathname}-${index}`}
                item={item}
                isActive={isActive}
                href={item.path}
                onHover={() => handleItemHover(item.path)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}