import { useInView } from 'framer-motion'

const InView = ({ children, containerRef }) => {
  let isInView = useInView(containerRef, { once: true })

  return (
    <span
      style={{
        transform: isInView ? 'none' : 'translateX(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
    >
      {children}
    </span>
  )
}

export default InView
