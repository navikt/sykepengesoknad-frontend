import React from 'react'
import { BodyShort, ReadMore } from '@navikt/ds-react'

import { Soknad } from '../../types/types'
import { RSSoknadsperiode } from '../../types/rs-types/rs-soknadsperiode'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import useSykmelding from '../../hooks/useSykmelding'

const arbeidssituasjonTekst: Record<RSArbeidssituasjon, string> = {
    [RSArbeidssituasjon.NAERINGSDRIVENDE]: 'selvstendig næringsdrivende',
    [RSArbeidssituasjon.FRILANSER]: 'frilanser',
    [RSArbeidssituasjon.ARBEIDSTAKER]: 'arbeidstaker',
    [RSArbeidssituasjon.ARBEIDSLEDIG]: 'arbeidsledig',
    [RSArbeidssituasjon.FISKER]: 'fisker',
    [RSArbeidssituasjon.JORDBRUKER]: 'jordbruker',
    [RSArbeidssituasjon.ANNET]: 'annet',
}

const periodeTekst = (periode: RSSoknadsperiode): string =>
    `${tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}${periode.grad > 0 ? ` (${periode.grad}%)` : ''}`

const PeriodeListe = ({ perioder }: { perioder: ReadonlyArray<RSSoknadsperiode> }) => (
    <BodyShort as="ul" size="small" className="mt-1 list-none">
        {perioder.map((periode, i) => (
            <BodyShort as="li" size="small" key={i}>
                {periodeTekst(periode)}
            </BodyShort>
        ))}
    </BodyShort>
)

export const SoknadMetadata = ({ soknad }: { soknad: Soknad }) => {
    const { data: sykmelding } = useSykmelding(soknad.sykmeldingId)

    const metadataLabel = (): string => (soknad.arbeidsgiver?.navn ? 'Sykmeldt fra' : 'Sykmeldt som')

    const metadataVerdi = (): string => {
        if (soknad.arbeidsgiver?.navn) {
            return soknad.arbeidsgiver.navn
        }
        if (soknad.arbeidssituasjon === RSArbeidssituasjon.FISKER) {
            const lottOgHyre = sykmelding?.sykmeldingStatus.brukerSvar?.fisker?.lottOgHyre.svar
            if (lottOgHyre === 'LOTT') return 'fisker med lott'
            if (lottOgHyre === 'HYRE') return 'fisker med hyre'
            if (lottOgHyre === 'BEGGE') return 'fisker med lott og hyre'
        }
        return soknad.arbeidssituasjon ? arbeidssituasjonTekst[soknad.arbeidssituasjon] : ''
    }

    const perioder = soknad.soknadPerioder ?? []

    const renderPerioder = () => {
        if (perioder.length === 0) return null
        const label = perioder.length === 1 ? 'Periode' : 'Perioder'

        if (perioder.length === 1) {
            return (
                <BodyShort size="small" spacing data-cy="soknad-perioder">
                    <strong>{label}:</strong> {periodeTekst(perioder[0])}
                </BodyShort>
            )
        }

        if (perioder.length <= 3) {
            return (
                <div className="mb-4" data-cy="soknad-perioder">
                    <BodyShort size="small">
                        <strong>{label}:</strong>
                    </BodyShort>
                    <PeriodeListe perioder={perioder} />
                </div>
            )
        }

        return (
            <div className="mb-4" data-cy="soknad-perioder">
                <BodyShort size="small">
                    <strong>{label}:</strong>
                </BodyShort>
                <ReadMore header={`Vis alle ${perioder.length} perioder`} size="small" className="mt-1">
                    <PeriodeListe perioder={perioder} />
                </ReadMore>
            </div>
        )
    }

    return (
        <>
            {soknad.arbeidssituasjon && (
                <BodyShort size="small">
                    <strong>{metadataLabel()}:</strong> {metadataVerdi()}
                </BodyShort>
            )}
            {renderPerioder()}
        </>
    )
}
