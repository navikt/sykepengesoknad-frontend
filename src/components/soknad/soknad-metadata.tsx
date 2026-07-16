import React from 'react'
import { BodyShort } from '@navikt/ds-react'

import { Soknad } from '../../types/types'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'

export const SoknadMetadata = ({ soknad }: { soknad: Soknad }) => {
    const metadataTekst = (soknad: Soknad): string => {
        if (soknad.arbeidsgiver?.navn) {
            return 'Sykmeldt fra: ' + soknad.arbeidsgiver.navn
        }
        return `Sykmeldt som: ${soknad.arbeidssituasjon}`
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
