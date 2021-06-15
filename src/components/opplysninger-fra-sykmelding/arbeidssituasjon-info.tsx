import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { hentArbeidssituasjon } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const ArbeidssituasjonInfo = () => {
    const { valgtSykmelding } = useAppStore()

    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)

    return (
        <Vis hvis={arbeidssituasjon}
            render={() =>
                <div className="avsnitt">
                    <UndertekstBold tag="h3" className="avsnitt-hode">
                        {tekst('din-sykmelding.arbeidssituasjon.tittel.2')}
                    </UndertekstBold>
                    <Normaltekst>
                        {tekst(`din-sykmelding.arbeidssituasjon.alternativ.${arbeidssituasjon!.toLowerCase()}` as any)}
                    </Normaltekst>
                </div>
            }
        />
    )
}

export default ArbeidssituasjonInfo
