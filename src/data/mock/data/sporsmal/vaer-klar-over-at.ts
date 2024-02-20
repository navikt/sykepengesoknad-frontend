import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

import { bekreftOpplysninger } from './bekreft-opplysninger'

export const værKlarOverAt = (): RSSporsmal => {
    return {
        id: '1623832',
        tag: 'VAER_KLAR_OVER_AT',
        sporsmalstekst: 'Viktig å være klar over:',
        undertekst:
            '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare pensjonsgivende inntekt du har på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li><li>Du kan endre svarene i denne søknaden opp til 12 måneder etter du sendte den inn første gangen.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden. <a href="https://www.nav.no/skriv-til-oss" target="_blank">Meld fra til NAV her.</a></li><li>Du må melde fra om studier som er påbegynt etter at du ble sykmeldt, og som ikke er avklart med NAV. Det samme gjelder hvis du begynner å studere mer enn du gjorde før du ble sykmeldt. <a href="https://www.nav.no/skriv-til-oss" target="_blank">Meld fra til NAV her.</a></li><li>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/sykepenger" target="_blank">nav.no/sykepenger</a>.</li></ul>',
        svartype: 'IKKE_RELEVANT',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    }
}

export const nyVærKlarOverAt = (): RSSporsmal => {
    return {
        id: '1623832',
        tag: 'TIL_SLUTT',
        sporsmalstekst: 'Viktig å være klar over:',
        undertekst: null,
        svartype: 'BEKREFTELSESPUNKTER',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [bekreftOpplysninger()],
    }
}
