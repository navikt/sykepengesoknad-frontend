import { useEffect } from 'react'

// import { log } from '../utils/logger';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'

interface HotjarTriggerProps {
    trigger: RSSoknadstype;
    children: any;
}

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void;
}

export const HotjarTrigger = ({ trigger, children }: HotjarTriggerProps) => {
    useEffect(() => {
        const hotJarWindow = (window as unknown as HotjarWindow)
        if (typeof hotJarWindow.hj === 'function'
            && window.location.href.indexOf('herokuapp') === -1) {
            hotJarWindow.hj('trigger', trigger)
        }
        // log(`Trigger hotjar: ${trigger}`); TODO: Må denne logges?
    }, [ trigger, children ])

    return children
}
