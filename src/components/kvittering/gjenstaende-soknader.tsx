import { Button, GuidePanel } from '@navikt/ds-react'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { Soknad } from '../../types/types'
import { tallTilSpråk } from '../../utils/tallTilSpraak'
import { getLedetekst, tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'

interface Props {
    soknader: Soknad[]
}

export const GjenstaendeSoknader = ({ soknader }: Props) => {
    const history = useHistory()

    if (soknader.length == 0) {
        return null
    }
    const sortert = soknader.sort((a, b) => a.fom!.getTime() - b.fom!.getTime())

    const knappetekst = () => {
        if (soknader.length > 1) {
            return tekst('gjenstaende.neste.flertall')
        }
        return tekst('gjenstaende.neste.entall')
    }
    return (
        <GuidePanel>
            {getLedetekst(tekst('gjenstaende.panel.tekst'), {
                '%ANTALL%': tallTilSpråk(soknader.length),
                '%FLERTALL%': soknader.length > 1 ? 'er' : '',
            })}
            <Button
                style={{ display: 'block', marginTop: '1em' }}
                onClick={() => {
                    history.push(urlTilSoknad(sortert[0]))
                }}
            >
                {knappetekst()}
            </Button>
        </GuidePanel>
    )
}

export const GjenstaendeSoknaderTekster = {
    'gjenstaende.panel.tekst':
        'Du har %ANTALL% søknad%FLERTALL%  du må velge om du skal bruke.',
    'gjenstaende.neste.entall': 'Gå til søknaden',
    'gjenstaende.neste.flertall': 'Gå til neste søknad',
}
