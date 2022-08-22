import { BodyShort, Detail } from '@navikt/ds-react'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import {
    harSpmOmPerioderFørSykmelding,
    hentArbeidssituasjon,
    hentPerioderFørSykmelding,
} from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const FravaersperioderInfo = () => {
    const { valgtSykmelding } = useAppStore()

    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const perioder = hentPerioderFørSykmelding(valgtSykmelding)

    return (
        <Vis
            hvis={
                (arbeidssituasjon === RSArbeidssituasjon.FRILANSER ||
                    arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE) &&
                harSpmOmPerioderFørSykmelding(valgtSykmelding)
            }
            render={() => (
                <div className="avsnitt">
                    <Detail as="h3" className="avsnitt-hode">
                        {tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}
                    </Detail>

                    <Vis
                        hvis={perioder.length > 0}
                        render={() => (
                            <ul className="nokkelopplysning__liste">
                                {perioder.map((p, idx) => (
                                    <BodyShort as="li" key={idx}>
                                        {tilLesbarPeriodeMedArstall(p.fom, p.tom)}
                                    </BodyShort>
                                ))}
                            </ul>
                        )}
                    />

                    <Vis
                        hvis={perioder.length === 0}
                        render={() => (
                            <BodyShort>{tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei')}</BodyShort>
                        )}
                    />
                </div>
            )}
        />
    )
}

export default FravaersperioderInfo
