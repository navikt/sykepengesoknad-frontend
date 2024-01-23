import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { hentArbeidssituasjon } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import { Sykmelding } from '../../types/sykmelding'

interface ArbeidssituasjonInfoProps {
    valgtSykmelding: Sykmelding
}

const ArbeidssituasjonInfo = ({ valgtSykmelding }: ArbeidssituasjonInfoProps) => {
    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const erFisker = valgtSykmelding.sykmeldingStatus.brukerSvar.arbeidssituasjon.svar === 'FISKER'

    if (erFisker) {
        return (
            <section className="mt-8">
                <Label size="small" as="h3">
                    Jeg er sykmeldt som
                </Label>
                <BodyShort>Fisker</BodyShort>
            </section>
        )
    }

    return (
        <>
            {arbeidssituasjon && (
                <section className="mt-8">
                    <Label size="small" as="h3">
                        Hva passer best for deg?
                    </Label>
                    <BodyShort>
                        {tekst(`din-sykmelding.arbeidssituasjon.alternativ.${arbeidssituasjon!.toLowerCase()}` as any)}
                    </BodyShort>
                </section>
            )}
        </>
    )
}

export default ArbeidssituasjonInfo
