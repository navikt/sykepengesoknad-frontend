import { useEffect } from 'react'

import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { info } from '../utils/logger'
import env from './../utils/environment'

interface HotjarTriggerProps {
    jsTrigger: string | null;
    children: any;
}

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void;
}

export const hentHotjarJsTrigger = (soknadstype: RSSoknadstype, sted: 'kvittering' | 'soknad'): string | null => {
    if (sted == 'soknad' || sted == 'kvittering') {
        switch (soknadstype) {
            case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE:
                return 'SOKNAD_FRILANSER_NAERINGSDRIVENDE'
            case RSSoknadstype.OPPHOLD_UTLAND:
                return 'SOKNAD_OPPHOLD_UTENFOR_NORGE'
            case RSSoknadstype.ARBEIDSTAKERE:
                return null
            case RSSoknadstype.ARBEIDSLEDIG:
                return 'SOKNAD_ARBEIDSLEDIG'
            case RSSoknadstype.BEHANDLINGSDAGER:
                return 'SOKNAD_BEHANDLINGSDAGER'
            case RSSoknadstype.ANNET_ARBEIDSFORHOLD:
                return 'SOKNAD_ANNET_ARBEIDSFORHOLD'
            case RSSoknadstype.REISETILSKUDD:
                return 'SOKNAD_REISETILSKUDD'
            case RSSoknadstype.GRADERT_REISETILSKUDD:
                if (sted == 'kvittering') {
                    return 'SOKNAD_GRADERT_REISETILSKUDD_KVITTERING'
                }
                return null
        }
    }
    return null
}

export const HotjarTrigger = ({ jsTrigger, children }: HotjarTriggerProps) => {

    useEffect(() => {
        const hotJarWindow = (window as unknown as HotjarWindow)

        if (jsTrigger && !env.isIntegrationtest()) {
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    info('Hotjar ble ikke lastet inn...')
                } else {
                    hotJarWindow.hj('trigger', jsTrigger)
                }
            }, 500)
        }

    })

    return children
}
