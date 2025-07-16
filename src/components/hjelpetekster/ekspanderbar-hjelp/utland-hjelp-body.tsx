import { BodyShort } from '@navikt/ds-react'

export const UtlandHjelpBody = ({ medNei }: { medNei: boolean }) => {
    return (
        <>
            <BodyShort spacing>
                Svar ja, dersom du har oppholdt deg utenfor EU/EØS i løpet av perioden du var sykmeldt. Da oppretter vi
                en egen søknad som du må sende inn.
            </BodyShort>
            {medNei && (
                <BodyShort spacing>
                    Svar nei hvis du var på reise fordi du hadde lovbestemt ferie eller du var på behandlingsreise i
                    forbindelse med Oslo Universitetssykehus. Da trenger du ikke søke.
                </BodyShort>
            )}
        </>
    )
}
