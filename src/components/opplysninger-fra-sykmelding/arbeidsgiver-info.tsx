import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const ArbeidsgiverInfo = () => {
    const { valgtSykmelding } = useAppStore()

    return (
        <Vis hvis={valgtSykmelding?.arbeidsgiver}
            render={() =>
                <div className="avsnitt">
                    <UndertekstBold tag="h3" className="avsnitt-hode">
                        {tekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver')}
                    </UndertekstBold>
                    <Normaltekst>{valgtSykmelding!.arbeidsgiver!.navn}</Normaltekst>
                </div>
            }
        />
    )
}

export default ArbeidsgiverInfo
