import { BodyLong } from '@navikt/ds-react'

export const NaringsdrivendeOpprettholdtInntektHjelpBody = () => {
    return (
        <>
            <BodyLong spacing>
                Hvis du har hatt næringsinntekt mens du har vært sykmeldt - for eksempel fordi en vikar har jobbet for
                deg, eller fordi du har en virksomhet som gir inntekt selv om du ikke jobber - skal sykepengene dine
                justeres. Dette gjelder det du har tjent i perioden mens du har vært sykmeldt, også det du ikke har fått
                utbetalt enda.
            </BodyLong>
            <BodyLong spacing>
                Hvis du har vært delvis sykmeldt og bare hatt næringsinntekt fordi du selv har jobbet, skal du svare nei
                på spørsmålet. Du skal også svare nei hvis inntekten kommer fra andre jobber du ikke er sykmeldt fra.
            </BodyLong>
        </>
    )
}
