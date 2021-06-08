import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { TagTyper } from '../../types/enums'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { SpmProps } from './sporsmal-form/sporsmal-form'


const InfotekstOverSubmit = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore()


    const tekstNokkel = (tag: TagTyper) => {
        if (tag === TagTyper.FERIE_V2 && valgtSoknad?.soknadstype === RSSoknadstype.ARBEIDSTAKERE && valgtSoknad?.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
            return 'ferie-ingen-sykepenger'
        }
        return null
    }

    const nokkel = tekstNokkel(sporsmal.tag)
    if (nokkel == null) {
        return null
    }

    return (
        <Vis hvis={tekstNokkel(sporsmal.tag)}
            render={() =>
                <AlertStripe type="info" style={{ marginTop: '1rem' }}>
                    <Normaltekst>{tekst(nokkel)}</Normaltekst>
                </AlertStripe>
            }
        />
    )
}

export default InfotekstOverSubmit
