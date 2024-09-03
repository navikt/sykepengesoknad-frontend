import { BodyShort, Box } from '@navikt/ds-react'
import React from 'react'

import { Sporsmal } from '../../../types/types'
import { hentInntektMetadata } from '../../../utils/ferdiglignet-inntekt'
import { formatterTall } from '../../../utils/utils'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

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
                <BodyShort weight="semibold">Regnestykket ser slik ut</BodyShort>
                <BodyShort spacing>Årsinntekten for et kalenderår beregnes med denne formelen:</BodyShort>
                <Box marginBlock="2" padding="4" borderRadius="medium" background="bg-subtle">
                    <div className="flex justify-center">
                        Pensjonsgivende årsinntekt
                        <div className="flex justify-center w-12">x</div>
                        grunnbeløpet på sykmeldingstidspunktet
                    </div>
                    <div className="border-t border-black w-full mt-2 mb-2"></div>
                    <div className="flex justify-center">Gjennomsnittelig grunnbeløp i det aktuelle kalenderåret</div>
                </Box>
                <BodyShort size="small" className="text-text-subtle">
                    Sykepengegrunnlaget kan ikke være høyere enn 6G. Hvis du tjente mer enn dette i ett eller flere år,
                    regner man en tredjedel av inntekten mellom 6G og 12G. Inntekt over 12G regnes ikke med.
                </BodyShort>
                <LenkeMedIkon href="https://www.nav.no/grunnbelopet" text="Les mer om grunnbeløpet" />
                <BodyShort className="mt-4" spacing>
                    Din inntekt per kalenderår, de tre siste ferdiglignende år:
                </BodyShort>
                <div>
                    {Object.entries(inntektMetadata.inntekt).map(([year, inntektValue]) => (
                        <BodyShort key={year}>
                            <strong>{year}</strong>: {`${formatterTall(inntektValue)} kroner`}
                        </BodyShort>
                    ))}
                </div>
                <BodyShort className="mt-4">
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
