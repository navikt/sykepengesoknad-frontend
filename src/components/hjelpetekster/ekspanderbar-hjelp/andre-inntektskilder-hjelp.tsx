import { BodyLong, BodyShort } from "@navikt/ds-react"
import { HjelpetekstModal } from "./hjelpetekst-modal"  
// import {AndreInntektskilderHjelpTekster } from './andre-inntektskilder-hjelp-tekst'


export const AndreInntektskilderBody = () => {
    return (
        <>
        <BodyShort spacing>
        
        {AndreInntektskilderHjelpTekster['hjelpetekst.del1']}
            
        </BodyShort>
        <p className="pb-3">
        {AndreInntektskilderHjelpTekster['hjelpetekst.del2']}
            <HjelpetekstModal
                inlinetekst={AndreInntektskilderHjelpTekster['modal1.inlinetekst']}
                tittel={AndreInntektskilderHjelpTekster['modal1.tittel']}
            >
                <BodyShort className="pb-3">
                {AndreInntektskilderHjelpTekster['modal1.del1']}
                </BodyShort>

                <BodyShort className="pb-3">
                {AndreInntektskilderHjelpTekster['modal1.del2']}
                    
                </BodyShort>
            </HjelpetekstModal>
            , eller mottatt annen{' '}
            <HjelpetekstModal
                inlinetekst="pensjonsgivende inntekt"
                tittel="Hva er pensjonsgivende inntekt?"
            >
                <BodyShort spacing>
                    Pensjonsgivende inntekt er som oftest inntekt du har mottatt for
                    arbeid du har utført og betalt skatt av.{' '}
                </BodyShort>
            </HjelpetekstModal>{' '}
            i sykemeldingsperioden som ikke har blitt registrert enda.
        </p>

        <BodyLong className="pb-3">
            <BodyShort className="pb-3"> Svar nei, hvis du mottar:</BodyShort>

            <ul className="pl-2">
                <li>
                    Stønader fra folketrygden (uføretrygd, foreldrepenger, AAP,
                    pleiepenger osv.)
                </li>
                <li>
                    Utbetalinger fra private eller offentlige forsikringsordninger (som
                    AFP).
                </li>
                <li>Inntekt fra salg av personlige gjenstander</li>
                <li>Lotterigevinster</li>
            </ul>
        </BodyLong>
        </>
    )
}


