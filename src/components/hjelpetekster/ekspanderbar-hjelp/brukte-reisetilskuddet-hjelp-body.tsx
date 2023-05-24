import { BodyLong } from '@navikt/ds-react'

export const BrukteReisetilskuddetHjelpBody = () => {
    return (
        <>
            <BodyLong>
                Har du hatt ekstra reiseutgifter til og fra jobben mens du var sykemeldt kan du ha rett til
                reisetilskudd dersom det gjør at du kan være i arbeid helt eller delvis. Du kan også få reisetilskudd
                sammen med graderte sykepenger.
            </BodyLong>
            <BodyLong className="mt-4">
                Svar nei, dersom du ikke har hatt noen ekstra utgifter i forbindelse med reise til og fra jobben.
            </BodyLong>
        </>
    )
}
