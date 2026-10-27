import { BodyShort } from '@navikt/ds-react'

export const utlandTittel = 'Spørsmålet forklart'

export const UtlandHjelpBody = ({ medNei }: { medNei: boolean }) => {
    return (
        <>
            <BodyShort spacing>
                Svar ja hvis du har vært i et land utenfor EU/EØS og Storbritannia mens du var sykmeldt. Da oppretter vi
                en egen søknad som du må sende inn.
            </BodyShort>
            {medNei && (
                <BodyShort spacing>
                    Svar nei hvis du var på reise fordi du hadde lovbestemt ferie eller du var på behandlingsreise i
                    forbindelse med Oslo universitetssykehus.
                </BodyShort>
            )}
        </>
    )
}
