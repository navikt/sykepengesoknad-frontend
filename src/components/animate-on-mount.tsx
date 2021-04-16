import React, { useEffect, useRef, useState } from 'react'

import { useAppStore } from '../data/stores/app-store'
import VisBlock from './vis-block'

interface AnimateOnMountProps {
    mounted: boolean;
    enter: string;
    leave: string;
    start: string;
    children: React.ReactElement;
}

const AnimateOnMount = (props: AnimateOnMountProps) => {
    const { mounted, enter, leave, start, children } = props
    const { top, setTop } = useAppStore()
    const [ styles, setStyles ] = useState<string>(null as any)
    const [ show, setShow ] = useState<boolean>(mounted)
    const animRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (animRef!.current!.offsetTop > top) {
            setTop(animRef!.current!.offsetTop)
        }
        if (mounted) {
            setShow(true)
            setStyles(enter)
        } else {
            setStyles(leave)
        }
        // eslint-disable-next-line
    }, [ mounted ]);

    const onTransitionEnd = () => {
        window.scrollTo({ top: top, behavior: 'auto' })
        if (styles === leave) {
            setShow(false)
        }
    }

    return (
        <div ref={animRef} className={`${start} ${styles}`} onTransitionEnd={onTransitionEnd}>
            <VisBlock hvis={show} render={() => children} />
        </div>
    )
}

export default AnimateOnMount
