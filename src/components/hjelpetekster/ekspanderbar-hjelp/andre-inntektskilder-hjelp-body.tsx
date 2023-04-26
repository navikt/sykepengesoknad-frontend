import { BodyShort } from '@navikt/ds-react'

import { HjelpetekstModal } from './hjelpetekst-modal'
import { AndreInntektskilderHjelpTekster } from './andre-inntektskilder-hjelp-tekst'

export const AndreInntektskilderHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>{AndreInntektskilderHjelpTekster['hjelpetekst.del1']}</BodyShort>
            <div>
                {AndreInntektskilderHjelpTekster['hjelpetekst.del2']}
                <HjelpetekstModal
                    inlinetekst={AndreInntektskilderHjelpTekster['modal1.inlinetekst']}
                    tittel={AndreInntektskilderHjelpTekster['modal1.tittel']}
                >
                    <BodyShort className="pt-3">{AndreInntektskilderHjelpTekster['modal1.del1']}</BodyShort>

                    <BodyShort className="pt-3">{AndreInntektskilderHjelpTekster['modal1.del2']}</BodyShort>
                </HjelpetekstModal>
                {AndreInntektskilderHjelpTekster['hjelpetekst.del3']}{' '}
                <HjelpetekstModal
                    inlinetekst={AndreInntektskilderHjelpTekster['modal2.inlinetekst']}
                    tittel={AndreInntektskilderHjelpTekster['modal2.tittel']}
                >
                    <BodyShort spacing>{AndreInntektskilderHjelpTekster['modal2.tekst']}</BodyShort>
                </HjelpetekstModal>{' '}
                {AndreInntektskilderHjelpTekster['hjelpetekst.del4']}{' '}
            </div>

            <BodyShort className="pt-3"> {AndreInntektskilderHjelpTekster['liste.tittel']} </BodyShort>
            <BodyShort as="ul" className="pl-2 pt-3">
                <li>{AndreInntektskilderHjelpTekster['liste.listepunkt1']}</li>
                <li>{AndreInntektskilderHjelpTekster['liste.listepunkt2']}</li>
                <li>{AndreInntektskilderHjelpTekster['liste.listepunkt3']}</li>
                <li>{AndreInntektskilderHjelpTekster['liste.listepunkt4']}</li>
            </BodyShort>
        </>
    )
}
