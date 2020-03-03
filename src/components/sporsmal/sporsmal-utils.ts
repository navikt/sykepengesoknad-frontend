import { TagTyper } from '../../types/enums';
import { Soknad, Sporsmal } from '../../types/types';
import { SEPARATOR } from '../../utils/constants';
import tekster from './sporsmal-tekster';
import { RSSvartype } from '../../types/rs-types/rs-svartype';

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    const tag = sporsmal.tag;
    return [ TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER ].indexOf(tag) > -1;
};

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    if (sporsmal === undefined) {
        return '';
    }
    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase();
    return sidenummer === 1
        ? 'sykepengesoknad.foer-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${nokkel}.tittel`;
};

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split(SEPARATOR);
    arr.pop();
    return arr.join(SEPARATOR);
};

export const fjernIndexFraTag = (tag: TagTyper): TagTyper => {
    let stringtag: string = tag.toString();
    const separator = '_';
    const index = stringtag.lastIndexOf(separator);
    if (index === (stringtag.length - 2) || index === (stringtag.length - 1)) {
        stringtag = stringtag.slice(0, index);
    }
    return TagTyper[stringtag as keyof typeof TagTyper];
};

export const sporsmalIdListe = (sporsmal: Sporsmal[]) => {
    let svar: any = [];
    sporsmal.forEach(spm => {
        svar.push(spm.id);
        const alleUndersporsmalId: any = sporsmalIdListe(spm.undersporsmal);
        svar = [ ...svar, ...alleUndersporsmalId ];
    });
    return svar;
};

interface FeilmeldingProps {
    global: string;
    lokal: string;
}

export const hentFeilmelding = (sporsmal: Sporsmal): FeilmeldingProps => {
    const feilmelding: FeilmeldingProps = {
        global: tekster['soknad.feilmelding.' + sporsmal.tag],
        lokal: tekster['soknad.feilmelding.' + sporsmal.tag + '.lokal']
    };
    if (feilmelding.lokal === '') {
        switch(sporsmal.svartype) {
            case RSSvartype.JA_NEI:
            case RSSvartype.RADIO:
            case RSSvartype.RADIO_GRUPPE:
            case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            case RSSvartype.CHECKBOX:
            case RSSvartype.CHECKBOX_GRUPPE:
            case RSSvartype.CHECKBOX_PANEL: {
                feilmelding.lokal = 'Du må velge et alternativ';
                break;
            }
            case RSSvartype.PROSENT:
            case RSSvartype.TIMER:
            case RSSvartype.TALL: {
                feilmelding.lokal = 'Du må oppgi en verdi';
                break;
            }
            case RSSvartype.PERIODER:
            case RSSvartype.PERIODE: {
                feilmelding.lokal = 'Du må oppgi en periode';
                break;
            }
            case RSSvartype.FRITEKST: {
                feilmelding.lokal = 'Du må skrive inn en tekst';
                break;
            }
            case RSSvartype.LAND: {
                feilmelding.lokal = 'Du må velge ett land';
                break;
            }
            case RSSvartype.DATO: {
                feilmelding.lokal = 'Du må oppgi en dato';
                break;
            }
            //TODO: Legg til behandlingsdager når den er merget
            default: {
                feilmelding.lokal = '';
                break;
            }
        }
    }
    return feilmelding;
};
