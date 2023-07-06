import { BodyLong } from '@navikt/ds-react'

export const MedlemskapArbeidUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyLong>Rett til sykepenger forutsetter at du har et aktivt medlemsskap i Norsk folketrygd.</BodyLong>

            <BodyLong className="mt-4">
                I Norge kan du være medlem som bosatt, eller som arbeidstaker. Du kan også være medlem i folketrygden
                under opphold i utlandet.
            </BodyLong>
            <BodyLong className="mt-4">
                Se bort fra kurs, konferanser og møter som varer mindre enn x uker hvert kalenderår.
            </BodyLong>
        </>
    )
}
