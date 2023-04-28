import { BodyLong, Link } from '@navikt/ds-react'

export const YrkesskadeHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Yrkesskade er en personskade som skjedde mens du var på jobb. En sykdom kan godkjennes som en
                yrkessykdom hvis årsaken er skadelig påvirkning fra arbeidet. Utbrenthet er som hovedregel ikke en
                yrkessykdom.{' '}
            </BodyLong>
            <BodyLong className={'mt-4'}>
                Hvis du er sykmeldt for en godkjent yrkesskade eller yrkessykdom kan det gi deg fordeler som påvirker
                utbetalingen av sykepenger, hvor lenge sykepenger blir utbetalt og noen ganger også størrelsen på
                utbetalingen.
            </BodyLong>
            <BodyLong className={'mt-4'}>
                Svar ja, hvis du er sykmeldt for en godkjent yrkesskade, yrkessykdom eller du mener det er årsaken til
                sykefraværet ditt.
            </BodyLong>
            <Link className={'mt-4'} href={'https://www.nav.no/yrkesskade'} target={'_blank'}>
                Du kan lese mer om yrkesskade og sykepenger her.
            </Link>
        </>
    )
}
