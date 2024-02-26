import {
    login_jisubushu,
    login_bg_round,
    login_bg_two
} from '../../consts/img'

export default function BackgroundHeroSecond() {
    return (
        <div className="w-full h-screen pt-20 bg-gradient-to-t from-[#7A81FF] to-[#3162FF] relative flex justify-center items-center">
            <div className="w-[639px] relative">
                <div className="w-full flex justify-center items-center absolute -top-[410px] z-[10]">
                    <img src={login_jisubushu} alt="AGICTO" className="w-[431px]" />
                </div>
                <div className="relative flex justify-center items-center">
                    <img src={login_bg_round} alt="AGICTO" className="w-[639px] absolute z-[9]" />
                    <img src={login_bg_two} alt="AGICTO" className="w-[639px] absolute z-[9]" />
                </div>
            </div>
        </div>
    )
}
