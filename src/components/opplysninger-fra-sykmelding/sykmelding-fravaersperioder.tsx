import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import {
    harSpmOmPerioderFørSykmelding,
    hentArbeidssituasjon,
    hentPerioderFørSykmelding,
} from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import { Sykmelding } from '../../types/sykmelding'

interface FravaersperioderInfoProps {
    valgtSykmelding: Sykmelding
}

const FravaersperioderInfo = ({ valgtSykmelding }: FravaersperioderInfoProps) => {
    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const perioder = hentPerioderFørSykmelding(valgtSykmelding)

    const visFravaersperioder =
        (arbeidssituasjon === RSArbeidssituasjon.FRILANSER ||
            arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE) &&
        harSpmOmPerioderFørSykmelding(valgtSykmelding)

    return (
        <>
            {visFravaersperioder && (
                <section className="mt-8">
                    <Label size="small" as="h3">
                        {tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}
                    </Label>

                    {perioder.length > 0 ? (
                        <ul>
                            {perioder.map((p, idx) => (
                                <BodyShort as="li" key={idx}>
                                    {tilLesbarPeriodeMedArstall(p.fom, p.tom)}
                                </BodyShort>
                            ))}
                        </ul>
                    ) : (
                        <BodyShort>{tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei')}</BodyShort>
                    )}
                </section>
            )}
        </>
    )
}

export default FravaersperioderInfo
