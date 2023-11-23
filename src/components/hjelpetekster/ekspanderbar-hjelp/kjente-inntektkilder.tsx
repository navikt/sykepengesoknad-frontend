import { BodyLong } from '@navikt/ds-react'

export const KjenteInntektkilderHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Det er kun inntekt fra inntektsforhold du har på sykmeldingstidspunktet (skjæringstidspunktet), som skal
                regnes med. Hvis du har flere arbeidsforhold, skal sykepengene beregnes utfra den samlede inntekten fra
                alle arbeidsforholdene dine. Dette gjelder også når du kun er sykmeldt fra ett av arbeidsforholdene.
            </BodyLong>
            <BodyLong className="mt-4">
                Vi vet ikke alltid hvilke inntektsforhold du faktisk har på sykmeldingstidspunktet, og som skal være med
                i beregningen og må derfor spørre deg. Svarene du gir her vil brukes til å beregne sykepengene dine
            </BodyLong>
        </>
    )
}
