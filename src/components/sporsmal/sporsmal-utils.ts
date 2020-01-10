import { TagTyper } from '../../types/enums';
import { Soknad, Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { Periode } from './typer/periode-komp';

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    const tag = sporsmal.tag;
    return [ TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER ].indexOf(tag) > -1;
};

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase();
    return sidenummer === 1
        ? 'sykepengesoknad.foer-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${nokkel}.tittel`;
};

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, string | number | boolean | Date>): void => {
    const verdi = verdier[sporsmal.id];
    if (verdier === undefined) {
        return;
    }

    if (Array.isArray(verdi)) {
        if (sporsmal.svartype === RSSvartype.DATO) {
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: verdi.map(element => {
                    return element.toString()
                }),
            };
        } else {
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: verdi
                    .filter((p: Periode) => p.fom !== undefined && p.tom !== undefined)
                    .map((p: Periode) => {
                        return { verdi: p.fom.toString() + '%%' + p.tom.toString() }
                    }),
            };
        }
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
        svarliste.svar.forEach(function (svar) {
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

export const fjernIndexFraTag = (tag: TagTyper): TagTyper => {
    let stringtag: string = tag.toString();
    const separator = '_';
    const index = stringtag.lastIndexOf(separator);
    if(index === (stringtag.length - 2) || index === (stringtag.length - 1)) {
        stringtag = stringtag.slice(0, index);
    }
    return TagTyper[stringtag as keyof typeof TagTyper];
};
