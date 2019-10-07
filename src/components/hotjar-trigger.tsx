import * as React from 'react';
import { useEffect } from 'react';
import { log } from '../utils/logger';
import { HotjarTriggerType } from '../types/enums';

interface HotjarTriggerProps {
    hotjarTrigger: HotjarTriggerType,
    children: any,
}

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void;
}

export const HotjarTrigger = ({ hotjarTrigger, children }: HotjarTriggerProps) => {
    useEffect(() => {
        const hotJarWindow = (window as unknown as HotjarWindow);
        if (typeof hotJarWindow.hj === 'function'
            && window.location.href.indexOf('herokuapp') === -1) {
            hotJarWindow.hj('trigger', hotjarTrigger);
        }
        log(`Trigger hotjar: ${hotjarTrigger}`);
    }, [hotjarTrigger, children]);

    return children;
};

interface HotjarGeneralProps {
    children: React.ReactNode;
}

export const FrilanserSelvstendigKvitteringHotjarTrigger = ({ children }: HotjarGeneralProps) => {
    return (
        <HotjarTrigger hotjarTrigger={HotjarTriggerType.SELVSTENDIG_FRILANS_JULI_2018}>
            {children}
        </HotjarTrigger>
    );
};

export const FrilanserSoknadHotjarTrigger = ({ children }: HotjarGeneralProps) => {
    return (
        <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_FRILANSER_NAERINGSDRIVENDE}>
            {children}
        </HotjarTrigger>
    );
};

export const ArbeidstakerSoknadHotjarTrigger = ({ children }: HotjarGeneralProps) => {
    return (
        <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_ARBEIDSTAKER}>
            {children}
        </HotjarTrigger>
    );
};

export const SykepengerUtlandSoknadTrigger = ({ children }: HotjarGeneralProps) => {
    return (
        <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_OPPHOLD_UTENFOR_NORGE}>
            {children}
        </HotjarTrigger>
    );
};
