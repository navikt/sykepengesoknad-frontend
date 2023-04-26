import { BodyLong } from '@navikt/ds-react'

export const PermisjonHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Permisjon er dager du var borte fra jobb av andre grunner enn sykdom, ferie eller avspasering. Det
                utbetales ikke sykepenger for den delen du tar permisjon. Det er ikke alltid vi vet om du er i permisjon
                og vi må derfor spørre deg.
            </BodyLong>

            <BodyLong className={'mt-4'}>
                Hvis du blir syk før en planlagt permisjon, har foreldrepermisjon, ferie, er permittert eller har
                seniordager, svarer du nei.
            </BodyLong>

            <BodyLong className={'mt-4'}>
                Blir du sykmeldt mens du er i permisjon, svarer du ja selv om permisjonen er utdanningspermisjon eller
                foreldrepermisjon.
            </BodyLong>
        </>
    )
}
