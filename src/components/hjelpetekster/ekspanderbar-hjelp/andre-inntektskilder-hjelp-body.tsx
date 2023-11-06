import { BodyShort, List } from '@navikt/ds-react'

import { Begrepsforklarer } from '../../begrepsforklarer/begrepsforklarer'

import { AndreInntektskilderHjelpTekster } from './andre-inntektskilder-hjelp-tekst'

export const AndreInntektskilderHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>{AndreInntektskilderHjelpTekster['hjelpetekst.del1']}</BodyShort>
            {AndreInntektskilderHjelpTekster['hjelpetekst.del2']}
            <Begrepsforklarer
                inlinetekst={AndreInntektskilderHjelpTekster['modal1.inlinetekst']}
                tittel={AndreInntektskilderHjelpTekster['modal1.tittel']}
            >
                <BodyShort className="pt-3">{AndreInntektskilderHjelpTekster['modal1.del1']}</BodyShort>

                <BodyShort className="pt-3">{AndreInntektskilderHjelpTekster['modal1.del2']}</BodyShort>
            </Begrepsforklarer>
            {AndreInntektskilderHjelpTekster['hjelpetekst.del3']}{' '}
            <Begrepsforklarer
                inlinetekst={AndreInntektskilderHjelpTekster['modal2.inlinetekst']}
                tittel={AndreInntektskilderHjelpTekster['modal2.tittel']}
            >
                <BodyShort spacing>{AndreInntektskilderHjelpTekster['modal2.tekst']}</BodyShort>
            </Begrepsforklarer>{' '}
            {AndreInntektskilderHjelpTekster['hjelpetekst.del4']}
            <BodyShort className="pt-3"> {AndreInntektskilderHjelpTekster['liste.tittel']} </BodyShort>
            <List as="ul" size="small" className="[&>ul]:mt-2">
                <List.Item>
                    <BodyShort>{AndreInntektskilderHjelpTekster['liste.listepunkt0']}</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>{AndreInntektskilderHjelpTekster['liste.listepunkt1']}</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>{AndreInntektskilderHjelpTekster['liste.listepunkt2']}</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>{AndreInntektskilderHjelpTekster['liste.listepunkt3']}</BodyShort>
                </List.Item>
                <List.Item>
                    <BodyShort>{AndreInntektskilderHjelpTekster['liste.listepunkt4']}</BodyShort>
                </List.Item>
            </List>
        </>
    )
}
