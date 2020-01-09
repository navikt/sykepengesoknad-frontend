import { TagTyper } from '../../types/enums';
import { fjernIndexFraTag } from './field-utils';
import { Soknad, Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { Periode } from './typer/periode-komp';

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
    if (verdier === undefined) {
        return;
    }

    if (Array.isArray(verdi)) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: verdi.map((p: Periode) => {
                return { verdi: p.fom.toString() + '%%' + p.tom.toString() }
            }),
        };
    } else if (verdi !== undefined) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: [ { verdi: verdi ? verdi.toString() : '' } ]
        };
    }

    sporsmal.undersporsmal.map((spm) => {
        return settSvar(spm, verdier);
    });
};

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste;
    const svar = svarliste.svar[0];
    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') ? [] : '';
    }

    if (sporsmal.svartype === RSSvartype.PERIODER || sporsmal.svartype === RSSvartype.PERIODE) {
        const perioder: Periode[] = [];
        svarliste.svar.map(svar => {
            const datoer = svar.verdi.split('%%');
            const periode = new Periode();
            periode.fom = new Date(datoer[0]);
            periode.tom = new Date(datoer[1]);
            perioder.push(periode);
        });
        return perioder;
    }
    if (sporsmal.svartype === RSSvartype.DATO) {
        return new Date(svar.toString());
    }
    return svar.verdi;
};

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split('/');
    arr.pop();
    return arr.join('/');
};
