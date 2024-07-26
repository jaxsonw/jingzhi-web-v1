const HoverLink = ({href,title}) => {
    return <div className="inline-block relative">
        <a href={href} className="relative z-10 text-[#eeeeee] hover-text">{title}</a>
        <style jsx>{`
.hover-text::after {
content: '';
position: absolute;
bottom: -3px;
left: 50%;
width: 0;
height: 1px;
background-color: #eeeeee;
transition: width 0.3s ease-in-out;
transform: translateX(-50%);
}
.hover-text:hover::after {
width: 100%;
}
`}</style>
    </div>
}

export default HoverLink