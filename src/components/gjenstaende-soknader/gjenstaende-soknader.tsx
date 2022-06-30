import { Button, GuidePanel, Heading } from '@navikt/ds-react'
import React, { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'

interface Props {
    soknader: Soknad[]
    style?: CSSProperties | undefined
}

export const GjenstaendeSoknader = ({ soknader, style }: Props) => {
    const history = useHistory()

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
    return (
        <GuidePanel style={style}>
            <Heading size="small" spacing>
                {heading()}
            </Heading>
            {getLedetekst(tekst('gjenstaende.panel.tekst'), {
                '%ANTALL%': tallTilSpråk(soknader.length),
                '%FLERTALL%': soknader.length > 1 ? 'er' : '',
            })}
            <Button
                style={{ display: 'block', marginTop: '1em' }}
                onClick={() => {
                    history.push(urlTilSoknad(soknader[0]))
                }}
            >
                {knappetekst()}
            </Button>
        </GuidePanel>
    )
}

export function hentGjenstaendeSoknader(soknader: Soknad[]) {
    return soknader
        .filter((s) => s.status === RSSoknadstatus.NY)
        .filter((s) => s.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND)
        .sort((a, b) => a.fom!.getTime() - b.fom!.getTime())
}
