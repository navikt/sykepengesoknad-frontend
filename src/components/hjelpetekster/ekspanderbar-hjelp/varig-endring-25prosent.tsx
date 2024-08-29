import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { hentInntektMetadata } from '../../../utils/ferdiglignet-inntekt'
import { formatterTall } from '../../../utils/utils'

interface VarigEndring25prosentProps {
    sporsmal: Sporsmal
}

export const VarigEndring25prosent = ({ sporsmal }: VarigEndring25prosentProps) => {
    const inntektMetadata = hentInntektMetadata(sporsmal)

    if (inntektMetadata) {
        return (
            <>
                <BodyShort spacing>
                    Vi henter inntekten din fra Skatteetaten, og bruker ferdig lignet årsinntekt.
                </BodyShort>

                <BodyShort spacing>
                    Så regnes den gjennomsnittelige årsinntekten ut basert på de tre siste årene, slik at din
                    gjennomsnittelige årsinntekt blir <strong>{formatterTall(inntektMetadata.beregnet.snitt)}</strong>{' '}
                    kroner.
                </BodyShort>
            </>
        )
    } else {
        return <></>
    }
}
