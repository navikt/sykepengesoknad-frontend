import { BodyLong } from '@navikt/ds-react'

export const NaringsdrivendeOppholdIUtlandetHjelpBody = () => {
    return (
        <>
            <BodyLong spacing>
                For å ha rett til sykepenger, må du være medlem i folketrygden. Har du hatt opphold i utlandet som varte
                lenger enn 5 uker i løpet av de siste 12 månedene før du ble syk, kan det påvirke medlemskapet ditt.
            </BodyLong>
            <BodyLong spacing>Svar ja, hvis du har hatt opphold i utlandet som varte lenger enn 5 uker.</BodyLong>
            <BodyLong spacing>
                Svar nei, hvis du ikke har vært i utlandet, eller kun har hatt opphold som varte kortere enn 5 uker.
            </BodyLong>
        </>
    )
}
