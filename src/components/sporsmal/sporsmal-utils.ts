import { TagTyper } from '../../types/enums';
import { fjernIndexFraTag } from './field-utils';
import { Soknad, Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';

export const hentSporsmalForOppsummering = (soknad: Soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT
            || s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });
};

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    const tag = sporsmal.tag;
    return [ TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER ].indexOf(tag) > -1;
};

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return sidenummer === 1
        ? 'sykepengesoknad.foer-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}.tittel`;
};

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, string | number | boolean | Date>): void => {

    const verdi = verdier[sporsmal.id];
    //if (verdier === undefined || (verdi === undefined && sporsmal.svartype === RSSvartype.PERIODE || sporsmal.svartype === RSSvartype.PERIODER || sporsmal.svartype === RSSvartype.DATO)) {
    if (verdier === undefined) {
        return;
    }
    //console.log('verdi ' + sporsmal.id, verdi); // eslint-disable-line

    if (Array.isArray(verdi)) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: verdi.map(element => {
                return element.toString()
            }),
        }
    } else {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: [
                {
                    verdi: verdi ? verdi.toString() : ''
                }
            ]
        };
    }
    sporsmal.undersporsmal.map((spm, idx) => {
        //console.log('index ' + spm.id, idx); // eslint-disable-line
        return settSvar(spm, verdier);
    });
};

export const hentSvar = (sporsmal: Sporsmal): any => {
    if (sporsmal.svarliste.svar[0] === undefined) {
        return '';
    }
    if (sporsmal.svartype === RSSvartype.PERIODER || sporsmal.svartype === RSSvartype.PERIODE) {
        return sporsmal.svarliste.svar.map(sv => {
            //console.log('hentSvar sv ' + sporsmal.id, typeof sv === 'string' ? new Date(sv) : null); // eslint-disable-line
            return typeof sv === 'string' ? new Date(sv) : null;
        });
    }
    if (sporsmal.svartype === RSSvartype.DATO) {
        console.log('hentSvar new Date ' + sporsmal.id, sporsmal.svarliste.svar[0]); // eslint-disable-line
        return new Date(sporsmal.svarliste.svar[0].toString());
    }
    //console.log('hentSvar sporsmal.svarliste.svar[0].verdi ' + sporsmal.id, sporsmal.svarliste.svar[0].verdi); // eslint-disable-line
    return sporsmal.svarliste.svar[0].verdi;
};

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split('/');
    arr.pop();
    return arr.join('/');
};
