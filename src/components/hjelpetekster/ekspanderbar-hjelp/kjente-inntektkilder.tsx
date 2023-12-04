import { BodyLong } from '@navikt/ds-react'

export const KjenteInntektkilderHjelpBody = () => {
    return (
        <>
            <BodyLong spacing>
                Sykepengene blir beregnet ut fra den samlede inntekten din. Fosterhjemsgodtgjørelse eller kommunal
                omsorgslønn / omsorgsstønad i kombinasjon med annen inntekt, blir regnet som flere jobber.
            </BodyLong>
            <BodyLong spacing>
                Det er kun inntekt fra inntektsforhold du har på sykmeldingstidspunktet som skal regnes med. Hvis du har
                flere arbeidsforhold, skal sykepengene beregnes ut fra den samlede inntekten fra alle arbeidsforholdene
                dine. Dette gjelder også når du kun er sykmeldt fra ett av arbeidsforholdene.
            </BodyLong>
            <BodyLong spacing>
                Vi vet ikke alltid hvilke inntektsforhold du faktisk har på sykmeldingstidspunktet, og som skal være med
                i beregningen og må derfor spørre deg. Svarene du gir her vil brukes til å beregne sykepengene dine.
            </BodyLong>
        </>
    )
}
