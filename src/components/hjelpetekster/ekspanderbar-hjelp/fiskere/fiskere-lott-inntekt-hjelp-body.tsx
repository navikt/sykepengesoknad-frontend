import { BodyShort, List } from '@navikt/ds-react'
import React from 'react'

export const fiskereLottInntektTittel = 'Spørsmålet forklart'

export const FiskereLottInntektHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Svar <b>ja</b> hvis inntekten ikke skyldtes at du selv jobbet mens du var sykmeldt.
            </BodyShort>
            <BodyShort>Det kan for eksempel være:</BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>lottinntekt som ikke faller bort selv om du var sykmeldt</BodyShort>
                </List.Item>
            </List>
            <BodyShort className="pt-3">
                Svar <b>nei</b> hvis:
            </BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>
                        du har mottatt forskudd på lott som senere kommer til fradrag fordi du var sykmeldt
                    </BodyShort>
                </List.Item>
            </List>
        </>
    )
}
