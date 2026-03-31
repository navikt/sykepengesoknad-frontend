import { BodyShort, List } from '@navikt/ds-react'

export const NaringsdrivendeOpprettholdtInntektHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Svar <b>ja</b> hvis inntekten ikke skyldtes at du selv jobbet mens du var sykmeldt.
            </BodyShort>
            <BodyShort>Det kan for eksempel være:</BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>inntekt fra utleie</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>arbeid som en vikar utførte for deg</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>annen drift som gikk av seg selv uten at du jobbet</BodyShort>
                </List.Item>
            </List>
            <BodyShort className="pt-3">
                Svar <b>nei</b> hvis:
            </BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>inntekten kom fordi du selv jobbet mens du var sykmeldt</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>inntekten gjaldt et annet arbeidsforhold du ikke var sykmeldt fra</BodyShort>
                </List.Item>
            </List>
        </>
    )
}
