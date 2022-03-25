import React, { useEffect, useRef, useState } from 'react'

import Vis from './vis'

interface AnimateOnMountProps {
    mounted: boolean
    enter: string
    leave: string
    start: string
    children: React.ReactElement
}

const AnimateOnMount = (props: AnimateOnMountProps) => {
    const { mounted, enter, leave, start, children } = props
    const [ styles, setStyles ] = useState<string>(null as any)
    const animRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (mounted) {
            setStyles(enter)
        } else {
            setStyles(leave)
        }
        // eslint-disable-next-line
    }, [ mounted ])


    return (
        <div ref={animRef} className={`${start} ${styles}`}>
            <Vis hvis={ mounted } render={() => children} />
        </div>
    )
}

export default AnimateOnMount
