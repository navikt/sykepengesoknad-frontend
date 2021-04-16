import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import VisBlock from '../vis-block'

const FravaersperioderInfo = () => {
    const { valgtSykmelding } = useAppStore()

    if ((valgtSykmelding?.valgtArbeidssituasjon === 'FRILANSER'
        || valgtSykmelding?.valgtArbeidssituasjon === 'NAERINGSDRIVENDE')
        && valgtSykmelding.sporsmal.harAnnetFravaer !== null) {

        const harPerioder = valgtSykmelding.sporsmal.fravaersperioder
            && valgtSykmelding.sporsmal.fravaersperioder.length > 0

        return (
            <div className="avsnitt">
                <UndertekstBold tag="h3" className="avsnitt-hode">
                    {tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}
                </UndertekstBold>

                <VisBlock hvis={harPerioder}
                    render={() => {
                        return (
                            <ul className="nokkelopplysning__liste">
                                {valgtSykmelding.sporsmal.fravaersperioder
                                    ?.filter((p) => {
                                        return p.fom !== null && p.tom !== null
                                    })
                                    .map((p) => {
                                        return (
                                            <li key={tilLesbarDatoMedArstall(p.fom)!}>
                                                <Normaltekst>{tilLesbarPeriodeMedArstall(p.fom, p.tom)}</Normaltekst>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }}
                />

                <VisBlock hvis={!harPerioder}
                    render={() => {
                        return <Normaltekst>{tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei')}</Normaltekst>
                    }}
                />
            </div>
        )
    }
    return null
}

export default FravaersperioderInfo
