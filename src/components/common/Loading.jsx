import { PacmanLoader } from "react-spinners"
export default function Loading({ className, loadingColor }) {
    return <div className={`w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.2)] z-[99] ${className}`}>
        <PacmanLoader color={loadingColor || "#fff"} />
    </div>
}