import { BodyShort, List } from '@navikt/ds-react'

export const andreInntektskilderTittel = 'Spørsmålet forklart'

export const AndreInntektskilderHjelpBody = () => {
    return (
        <>
            <BodyShort className="my-6">Svar ja hvis du har hatt pensjonsgivende inntekt fordi du:</BodyShort>
            <List as="ul" size="small" className="my-4">
                <List.Item>
                    <BodyShort>begynt i ny jobb</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>jobbet mer i en annen jobb etter at du ble sykmeldt</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>inntekt som selvstendig næringsdrivende</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>jobbet frilans (fått betalt for enkeltoppdrag uten å være ansatt)</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>jobbet som barnepasser/dagmamma</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>fått kommunal omsorgsstønad</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>fått fosterhjemsgodgjørelse har utført arbeid i styreverv</BodyShort>
                </List.Item>
            </List>
            <BodyShort className="my-6">Svar nei hvis inntekten er:</BodyShort>
            <List as="ul" size="small" className="my-4">
                <List.Item>
                    <BodyShort>renter, utleie eller salg (kapitalinntekt)</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>andre stønader fra Nav (uføretrygd, foreldrepenger, AAP, pleiepenger osv.)</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>pensjon</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>forsikringsutbetalinger</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>lottogevinster</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>inntekt fra salg av personlige gjenstander</BodyShort>
                </List.Item>
            </List>
        </>
    )
}
