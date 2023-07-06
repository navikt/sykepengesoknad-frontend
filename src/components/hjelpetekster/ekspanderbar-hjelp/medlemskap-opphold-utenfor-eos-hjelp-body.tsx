import { BodyLong } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforEOSHjelpBody = () => {
    return (
        <>
            <BodyLong>Rett til sykepenger forutsetter at du har et aktivt medlemsskap i Norsk folketrygd.</BodyLong>

            <BodyLong className="mt-4">
                I Norge kan du være medlem som bosatt, eller som arbeidstaker. Du kan også være medlem i folketrygden
                under opphold i utlandet.
            </BodyLong>
            <BodyLong className="mt-4 font-bold">
                Her skal du bare svare på perioder i utlandet hvor du ikke har arbeidet. Se bort fra ferieopphold
                utenfor Norge med inntil 5 uker hvert kalenderår.
            </BodyLong>
        </>
    )
}
