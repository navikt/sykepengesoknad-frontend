import React from 'react'
import { BodyShort } from '@navikt/ds-react'

import { Soknad } from '../../types/types'
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

export const SoknadMetadata = ({ soknad }: { soknad: Soknad }) => {
    const { data: sykmelding } = useSykmelding(soknad.sykmeldingId)

    const metadataTekst = (soknad: Soknad): string => {
        if (soknad.arbeidsgiver?.navn) {
            return 'Sykmeldt fra: ' + soknad.arbeidsgiver.navn
        }
        if (soknad.arbeidssituasjon === RSArbeidssituasjon.FISKER) {
            const lottOgHyre = sykmelding?.sykmeldingStatus.brukerSvar?.fisker?.lottOgHyre.svar
            if (lottOgHyre === 'LOTT') return 'Sykmeldt som: fisker med lott'
            if (lottOgHyre === 'HYRE') return 'Sykmeldt som: fisker med hyre'
            if (lottOgHyre === 'BEGGE') return 'Sykmeldt som: fisker med lott og hyre'
        }
        return `Sykmeldt som: ${soknad.arbeidssituasjon ? arbeidssituasjonTekst[soknad.arbeidssituasjon] : ''}`
    }

    return (
        <>
            {soknad.arbeidssituasjon && <BodyShort size="small">{metadataTekst(soknad)}</BodyShort>}
            {soknad.soknadPerioder && soknad.soknadPerioder.length > 0 && (
                <BodyShort size="small" spacing>
                    {soknad.soknadPerioder.length > 1 ? 'Perioder: ' : 'Periode: '}
                    {soknad.soknadPerioder
                        .map(
                            (periode) =>
                                `${tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}${periode.grad > 0 ? ` (${periode.grad}%)` : ''}`,
                        )
                        .join(', ')}
                </BodyShort>
            )}
        </>
    )
}
