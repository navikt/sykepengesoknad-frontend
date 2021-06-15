import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { hentArbeidssituasjon, hentPerioderFørSykmelding } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const FravaersperioderInfo = () => {
    const { valgtSykmelding } = useAppStore()

    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const perioder = hentPerioderFørSykmelding(valgtSykmelding)

    return (
        <Vis hvis={arbeidssituasjon === RSArbeidssituasjon.FRILANSER || arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE}
            render={() =>
                <div className="avsnitt">
                    <UndertekstBold tag="h3" className="avsnitt-hode">
                        {tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}
                    </UndertekstBold>

                    <Vis hvis={perioder.length > 0}
                        render={() =>
                            <ul className="nokkelopplysning__liste">
                                {perioder.map((p, idx) =>
                                    <li key={idx}>
                                        <Normaltekst>{tilLesbarPeriodeMedArstall(p.fom, p.tom)}</Normaltekst>
                                    </li>
                                )}
                            </ul>
                        }
                    />

                    <Vis hvis={perioder.length === 0}
                        render={() =>
                            <Normaltekst>{tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei')}</Normaltekst>
                        }
                    />
                </div>
            }
        />
    )
}

export default FravaersperioderInfo
