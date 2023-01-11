import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface ResetFocusOnUrlChangeProps {
    children: React.ReactNode
}

const OnUrlChange = (props: ResetFocusOnUrlChangeProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const location = useLocation()

    // remove once react-router accessibility issue is fixed
    // https://github.com/remix-run/react-router/issues/5210
    useEffect(() => {
        ref.current?.focus()
        ref.current?.scrollIntoView()
    }, [location.pathname])

    return (
        <div ref={ref} tabIndex={-1} style={{ outline: 'none' }}>
            {props.children}
        </div>
    )
}

export default OnUrlChange
