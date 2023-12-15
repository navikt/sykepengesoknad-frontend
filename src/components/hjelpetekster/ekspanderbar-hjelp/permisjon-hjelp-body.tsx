import { BodyShort } from '@navikt/ds-react'

export const PermisjonHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Permisjon er dager du var borte fra jobb av andre grunner enn sykdom, ferie eller avspasering. Det er
                ikke alltid vi vet om du er i permisjon og vi må derfor spørre deg. Det utbetales som hovedregel ikke
                sykepenger når du er i permisjon.
            </BodyShort>
            <BodyShort spacing>Svar JA, hvis du har avtalt permisjon og derfor ikke skal ha sykepenger.</BodyShort>
            <BodyShort>
                Svar NEI hvis du søker om sykepenger i stedet for foreldrepermisjon. Du svarer også NEI hvis du har
                ferie, er permittert, har seniordager eller blir syk før en planlagt permisjon.”
            </BodyShort>
        </>
    )
}
