import { BodyShort, Box } from '@navikt/ds-react'
import React from 'react'

import { erSigrunInntekt, SigrunInntekt, Sporsmal } from '../../../types/types'
import { formatterTall } from '../../../utils/utils'
import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'

interface VarigEndring25prosentProps {
    sporsmal: Sporsmal
}

export const VarigEndring25prosent = ({ sporsmal }: VarigEndring25prosentProps) => {
    const inntektMetadata = erSigrunInntekt(sporsmal.metadata?.sigrunInntekt)
        ? (sporsmal.metadata?.sigrunInntekt as SigrunInntekt)
        : undefined

    if (inntektMetadata) {
        return (
            <>
                <BodyShort spacing>Vi henter informasjon om inntekt fra Skatteetaten.</BodyShort>
                <BodyShort weight="semibold">Årsinntekten for et kalenderår beregnes med denne formelen</BodyShort>
                <Box marginBlock="2" padding="4" borderRadius="medium" background="bg-subtle">
                    <div className="flex justify-center">
                        Pensjonsgivende årsinntekt
                        <div className="flex justify-center w-12">x</div>
                        grunnbeløpet på sykmeldingstidspunktet
                    </div>
                    <div className="border-t border-black w-full mt-3 mb-3"></div>
                    <div className="flex justify-center">Gjennomsnittlig grunnbeløp i det aktuelle kalenderåret</div>
                </Box>
                <BodyShort size="small" className="text-text-subtle">
                    Sykepengegrunnlaget kan ikke være høyere enn 6G. Hvis du hadde høyere inntekt enn dette i ett eller
                    flere år, regner man en tredjedel av inntekten mellom 6G og 12G. Inntekt over 12G regnes ikke med.
                </BodyShort>
                <LenkeMedIkon href="https://www.nav.no/grunnbelopet" text="Les mer om grunnbeløpet" />
                <BodyShort className="mt-4" spacing>
                    Din inntekt per kalenderår, de tre siste ferdiglignede årene:
                </BodyShort>
                <div>
                    {inntektMetadata.inntekter?.map((inntekt: { aar: string; verdi: number }) => (
                        <BodyShort key={inntekt.aar}>
                            <strong>{inntekt.aar}</strong>: {`${formatterTall(inntekt.verdi)} kroner`}
                        </BodyShort>
                    ))}
                </div>
                <BodyShort className="mt-4">
                    Så regnes den gjennomsnittlige årsinntekten ut basert på de tre siste årene, slik at den
                    gjennomsnittlige årsinntekten din blir{' '}
                    <strong>{formatterTall(inntektMetadata.beregnet?.snitt)}</strong> kroner.
                </BodyShort>
            </>
        )
    } else {
        return (
            <>
                <BodyShort spacing>
                    Sykepenger til selvstendig næringsdrivende skal som hovedregel tilsvare den pensjonsgivende
                    årsinntekten som beregnes ut fra gjennomsnittet av pensjonsgivende inntekt de tre siste årene. Det
                    er de ferdiglignede inntektene som foreligger på vedtakstidspunktet som brukes.
                </BodyShort>
                <BodyShort spacing>
                    Det kan likevel gjøres unntak hvis din arbeidssituasjon eller virksomhet er varig endret og den
                    varige endringen har gjort at inntekten din er endret mer enn 25 prosent fra situasjonen før den
                    varige endringen.
                </BodyShort>
                <BodyShort>
                    Vi skjønner at det noen ganger kan være vanskelig å svare på om inntekten er endret mer enn 25
                    prosent, men svar så godt du kan. En saksbehandler vil uansett vurdere saken din.
                </BodyShort>
            </>
        )
    }
}
