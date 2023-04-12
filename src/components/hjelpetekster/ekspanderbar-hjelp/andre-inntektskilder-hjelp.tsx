import { BodyLong, BodyShort } from '@navikt/ds-react'

import { HjelpetekstModal } from './hjelpetekst-modal'
import { AndreInntektskilderHjelpTekster } from './andre-inntektskilder-hjelp-tekst'

export const AndreInntektskilderBody = () => {
    return (
        <>
            <BodyShort spacing>{AndreInntektskilderHjelpTekster['hjelpetekst.del1']}</BodyShort>
            <p className="pb-3">
                {AndreInntektskilderHjelpTekster['hjelpetekst.del2']}
                <HjelpetekstModal
                    inlinetekst={AndreInntektskilderHjelpTekster['modal1.inlinetekst']}
                    tittel={AndreInntektskilderHjelpTekster['modal1.tittel']}
                >
                    <BodyShort className="pb-3">{AndreInntektskilderHjelpTekster['modal1.del1']}</BodyShort>

                    <BodyShort className="pb-3">{AndreInntektskilderHjelpTekster['modal1.del2']}</BodyShort>
                </HjelpetekstModal>
                , eller mottatt annen{' '}
                <HjelpetekstModal
                    inlinetekst={AndreInntektskilderHjelpTekster['modal2.inlinetekst']}
                    tittel={AndreInntektskilderHjelpTekster['modal2.tittel']}
                >
                    <BodyShort spacing>{AndreInntektskilderHjelpTekster['modal2.tekst']}</BodyShort>
                </HjelpetekstModal>{' '}
                {AndreInntektskilderHjelpTekster['hjelpetekst.del3']}{' '}
                {/* // i sykemeldingsperioden som ikke har blitt registrert enda.*/}
            </p>

            <BodyLong className="pb-3">
                <BodyShort className="pb-3"> {AndreInntektskilderHjelpTekster['liste.tittel']} </BodyShort>
                {/* Svar nei, hvis du mottar: */}

                <ul className="pl-2">
                    <li>{AndreInntektskilderHjelpTekster['liste.listepunkt1']}</li>
                    <li>{AndreInntektskilderHjelpTekster['liste.listepunkt2']}</li>
                    <li>{AndreInntektskilderHjelpTekster['liste.listepunkt3']}</li>
                    <li>{AndreInntektskilderHjelpTekster['liste.listepunkt4']}</li>
                </ul>
            </BodyLong>
        </>
    )
}
