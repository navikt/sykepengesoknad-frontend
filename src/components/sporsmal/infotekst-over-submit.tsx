import { Alert, BodyShort } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../types/enums'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { Soknad, Sporsmal } from '../../types/types'

export interface InfotekstOverSubmit {
    soknad: Soknad
    sporsmal: Sporsmal
}

const InfotekstOverSubmit = ({ soknad, sporsmal }: InfotekstOverSubmit) => {
    const tekstNokkel = (tag: TagTyper) => {
        if (
            tag === TagTyper.FERIE_V2 &&
            soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE &&
            soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
        ) {
            return 'ferie-ingen-sykepenger'
        }
        return null
    }

    const nokkel = tekstNokkel(sporsmal.tag)
    if (nokkel == null) {
        return null
    }

    return (
        <Vis
            hvis={tekstNokkel(sporsmal.tag)}
            render={() => (
                <Alert variant="info" style={{ marginTop: '1rem' }}>
                    <BodyShort>{tekst(nokkel)}</BodyShort>
                </Alert>
            )}
        />
    )
}

export default InfotekstOverSubmit
