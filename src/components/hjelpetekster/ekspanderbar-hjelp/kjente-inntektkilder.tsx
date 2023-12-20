import { BodyLong } from '@navikt/ds-react'

export const KjenteInntektkilderHjelpBody = () => {
    return (
        <>
            <BodyLong spacing>
                Sykepengene blir beregnet ut fra den samlede pensjonsgivende inntekten din. Fosterhjemsgodtgjørelse
                eller kommunal omsorgslønn / omsorgsstønad i kombinasjon med annen inntekt, blir regnet som flere
                jobber.
            </BodyLong>
            <BodyLong spacing>
                Det er kun pensjonsgivende inntekt fra inntektskilder du har på sykmeldingstidspunktet som skal regnes
                med. Hvis du har flere inntektskilder, skal sykepengene beregnes ut fra den samlede inntekten fra alle
                inntektskildene dine. Dette gjelder også når du kun er sykmeldt fra en av inntektskildene.
            </BodyLong>
            <BodyLong spacing>
                Vi vet ikke alltid hvilke inntektskilder du faktisk har på sykmeldingstidspunktet, og som skal være med
                i beregningen og må derfor spørre deg. Svarene du gir her vil brukes til å beregne sykepengene dine.
            </BodyLong>
        </>
    )
}
