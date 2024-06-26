import { Button, GuidePanel, Heading } from '@navikt/ds-react'
import React, { CSSProperties } from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { urlTilSoknad } from '../soknad/soknad-link'
import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import { Soknad } from '../../types/types'

interface Props {
    soknader: RSSoknadmetadata[]
    style?: CSSProperties | undefined
}

export const GjenstaendeSoknader = ({ soknader, style }: Props) => {
    const router = useRouter()

    if (soknader.length == 0) {
        return null
    }

    const knappetekst = () => {
        if (soknader.length > 1) {
            return tekst('gjenstaende.neste.flertall')
        }
        return tekst('gjenstaende.neste.entall')
    }
    const heading = () => {
        if (soknader.length > 1) {
            return 'Du har flere søknader'
        }
        return 'Du har en søknad til'
    }
    const innhold = getLedetekst(tekst('gjenstaende.panel.tekst'), {
        '%ANTALL%': tallTilSpråk(soknader.length),
        '%FLERTALL%': soknader.length > 1 ? 'er' : '',
    })
    const komponent = 'gjenstående søknader'
    logEvent('guidepanel vist', {
        tekst: innhold,
        heading: heading(),
        komponent,
    })

    return (
        <GuidePanel style={style}>
            <Heading size="small" spacing>
                {heading()}
            </Heading>
            {innhold}
            <Button
                type="button"
                style={{ display: 'block', marginTop: '1em' }}
                onClick={async () => {
                    logEvent('knapp klikket', {
                        tekst: knappetekst(),
                        komponent,
                    })
                    await router.push(urlTilSoknad(soknader[0]))
                }}
            >
                {knappetekst()}
            </Button>
        </GuidePanel>
    )
}

export function hentGjenstaendeSoknader(soknader: RSSoknadmetadata[], valgtSoknad: Soknad) {
    return soknader
        .filter(s => s.id !== valgtSoknad.id)
        .filter(s => s.status === RSSoknadstatus.NY)
        .sort((a, b) => {
            const fomA = a.fom ? a.fom.getTime() : Number.MAX_SAFE_INTEGER
            const fomB = b.fom ? b.fom.getTime() : Number.MAX_SAFE_INTEGER
            return fomA - fomB
        })
}

