import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { hentArbeidssituasjon } from '../../utils/sykmelding-utils'
import { forsteBokstavStor, tekst } from '../../utils/tekster'
import { Sykmelding } from '../../types/sykmelding'

interface ArbeidssituasjonInfoProps {
    valgtSykmelding: Sykmelding
}

const ArbeidssituasjonInfo = ({ valgtSykmelding }: ArbeidssituasjonInfoProps) => {
    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const erFisker = valgtSykmelding.sykmeldingStatus.brukerSvar?.arbeidssituasjon.svar === 'FISKER'
    const erJordbruker = valgtSykmelding.sykmeldingStatus.brukerSvar?.arbeidssituasjon.svar === 'JORDBRUKER'
    const arbeidssituasjonSvar = valgtSykmelding.sykmeldingStatus.brukerSvar?.arbeidssituasjon.svar || ''
    const svar = forsteBokstavStor(arbeidssituasjonSvar)

    if (erJordbruker) {
        return (
            <section className="mt-8">
                <Label size="small" as="h3">
                    Jeg er sykmeldt som
                </Label>
                <BodyShort>{svar}</BodyShort>
            </section>
        )
    }
    if (erFisker) {
        return (
            <>
                <section className="mt-8">
                    <Label size="small" as="h3">
                        Jeg er sykmeldt som
                    </Label>
                    <BodyShort>{svar}</BodyShort>
                </section>
                <section className="mt-8">
                    <Label size="small" as="h3">
                        Valgt blad
                    </Label>
                    <BodyShort>
                        {forsteBokstavStor(valgtSykmelding.sykmeldingStatus.brukerSvar?.fisker.blad.svar || '')}
                    </BodyShort>
                </section>
                <section className="mt-8">
                    <Label size="small" as="h3">
                        {valgtSykmelding.sykmeldingStatus.brukerSvar?.fisker.lottOgHyre.sporsmaltekst}
                    </Label>
                    <BodyShort>
                        {forsteBokstavStor(valgtSykmelding.sykmeldingStatus.brukerSvar?.fisker.lottOgHyre.svar || '')}
                    </BodyShort>
                </section>
            </>
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
