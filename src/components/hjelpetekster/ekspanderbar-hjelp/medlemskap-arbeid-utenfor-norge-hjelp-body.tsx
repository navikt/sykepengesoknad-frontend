import { BodyShort } from '@navikt/ds-react'

export const MedlemskapArbeidUtenforNorgeHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                For å ha rett til sykepenger, må du være medlem i folketrygden. Hvis du jobber lenge i utlandet og/eller
                for en utenlandsk arbeidsgiver, kan dette i noen tilfeller ha betydning for om du er medlem i
                folketrygden. Vi vet ikke alltid dette og må derfor spørre deg.
            </BodyShort>
            <BodyShort spacing>
                Du kan svare nei, hvis du har deltatt på tjenestereiser, korte kurs, konferanser eller møter for din
                norske arbeidsgiver.
            </BodyShort>
        </>
    )
}
