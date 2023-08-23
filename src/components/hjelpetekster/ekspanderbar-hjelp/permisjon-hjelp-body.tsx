import { BodyShort } from '@navikt/ds-react'

export const PermisjonHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Permisjon er dager du var borte fra jobb av andre grunner enn sykdom, ferie eller avspasering. Det
                utbetales ikke sykepenger for den delen du tar permisjon. Det er ikke alltid vi vet om du er i permisjon
                og vi må derfor spørre deg.
            </BodyShort>
            <BodyShort spacing>
                Svar ja, hvis du blir sykmeldt mens du er i permisjon selv om permisjonen er utdanningspermisjon eller
                foreldrepermisjon.
            </BodyShort>
            <BodyShort>
                Svar nei, hvis du blir syk før en planlagt permisjon, har ferie, er permittert eller har seniordager.
            </BodyShort>
        </>
    )
}
