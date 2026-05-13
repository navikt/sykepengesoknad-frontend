import { BodyShort, List } from '@navikt/ds-react'

export const naringsdrivendeOpprettholdtInntektGradertTittel = 'Spørsmålet forklart'

export const NaringsdrivendeOpprettholdtInntektGradertHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Svar <b>ja</b> hvis inntekten ikke skyldtes den delen du selv jobbet i perioden.
            </BodyShort>
            <BodyShort className="pt-3">Det kan for eksempel være:</BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>inntekt fra utleie</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>arbeid som en vikar utførte for deg</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>
                        at driften gikk av seg selv uten at du jobbet mer enn sykmeldingsprosenten din
                    </BodyShort>
                </List.Item>
            </List>
            <BodyShort className="pt-3">
                Svar <b>nei</b> hvis:
            </BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>
                        inntekten skyldes den delen du faktisk jobbet selv mens du var delvis sykmeldt
                    </BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>inntekten gjaldt et annet arbeidsforhold du ikke var sykmeldt fra</BodyShort>
                </List.Item>
            </List>
        </>
    )
}
