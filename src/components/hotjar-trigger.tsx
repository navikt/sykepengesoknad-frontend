import React, { Component, ReactNode } from 'react';
import { log } from '@navikt/digisyfo-npm';

interface HotjarTriggerProps {
    hotjarTrigger: string,
    children: ReactNode
}

class HotjarTrigger extends Component<HotjarTriggerProps> {
    componentDidMount() {
/*
        if (window.hj instanceof Function
            && window.location.href.indexOf('herokuapp') === -1) {
            window.hj('trigger', this.props.hotjarTrigger);
        }
*/
        log(`Trigger hotjar: ${this.props.hotjarTrigger}`);
    }

    render() {
        return this.props.children;
    }
}

export const FrilanserSelvstendigKvitteringHotjarTrigger = ({ children }: HotjarTriggerProps) => {
    return (
        <HotjarTrigger hotjarTrigger="SELVSTENDIG_FRILANS_JULI_2018">
            {children}
        </HotjarTrigger>
    );
};

export const FrilanserSoknadHotjarTrigger = ({ children }: HotjarTriggerProps) => {
    return (
        <HotjarTrigger hotjarTrigger="SOKNAD_FRILANSER_NAERINGSDRIVENDE">
            {children}
        </HotjarTrigger>
    );
};

export const ArbeidstakerSoknadHotjarTrigger = ({ children }: HotjarTriggerProps) => {
    return (
        <HotjarTrigger hotjarTrigger="SOKNAD_ARBEIDSTAKER">
            {children}
        </HotjarTrigger>
    );
};

export const NyArbeidstakerSoknadHotjarTrigger = ({ children }: HotjarTriggerProps) => {
    return (
        <HotjarTrigger hotjarTrigger="SOKNAD_ARBEIDSTAKER_NY">
            {children}
        </HotjarTrigger>
    );
};

export const SykepengerUtlandSoknadTrigger = ({ children }: HotjarTriggerProps) => {
    return (
        <HotjarTrigger hotjarTrigger="SOKNAD_OPPHOLD_UTENFOR_NORGE">
            {children}
        </HotjarTrigger>
    );
};
