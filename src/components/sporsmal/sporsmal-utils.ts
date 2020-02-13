import { TagTyper } from '../../types/enums';
import { Soknad, Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { empty, PERIODE_SKILLE, SEPARATOR } from '../../utils/constants';
import { RSSvarliste } from '../../types/rs-types/rs-svarliste';
import { RSVisningskriterie } from '../../types/rs-types/rs-visningskriterie';

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

const hentVerdier = (sporsmal: Sporsmal, verdier: Record<string, any>) => {
    let verdi = verdier[sporsmal.id];
    if (verdi === undefined) {
        verdi = Object.entries(verdier)
            .filter(([ key ]) => key.startsWith(sporsmal.id))
            .map(([ key ]) => verdier[key])
            .filter((verdi) => verdi !== empty);
    }
    return verdi;
};

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, any>): void => {
    const verdi = hentVerdier(sporsmal, verdier);
    if (verdi === undefined) {
        return;
    }
    if (Array.isArray(verdi)) {
        if (sporsmal.svartype === RSSvartype.DATO) {
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: verdi.map(element => {
                    return { verdi: element.toString() }
                }),
            };
        } else {
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: verdi
                    .filter((periode) => periode[0] !== undefined && periode[1] !== undefined)
                    .map((periode) => {
                        return { verdi: periode[0].toString() + PERIODE_SKILLE + periode[1].toString() }
                    }),
            };
        }
    } else if (sporsmal.svartype === RSSvartype.CHECKBOX_PANEL ||
        sporsmal.svartype === RSSvartype.CHECKBOX ||
        sporsmal.svartype === RSSvartype.CHECKBOX_GRUPPE) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: [ { verdi: verdi ? 'CHECKED' : '' } ]
        }
    } else if (sporsmal.svartype.startsWith('RADIO_GRUPPE')) {
        sporsmal.undersporsmal.forEach(uspm => {
            const erValgt = (uspm.sporsmalstekst === verdi);
            uspm.svarliste = {
                sporsmalId: uspm.id,
                svar: [ { verdi: erValgt ? 'CHECKED' : '' } ]
            };
            const timerProsentSporsmal = uspm.undersporsmal[0];
            timerProsentSporsmal.svarliste = {
                sporsmalId: timerProsentSporsmal.id,
                svar: [ { verdi: erValgt ? verdier[timerProsentSporsmal.id].toString() : '' } ]
            };
        });
    } else {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: [ { verdi: verdi ? verdi.toString() : '' } ]
        };
    }

    sporsmal.undersporsmal.forEach((spm) => {
        settSvar(spm, verdier);
    });
};

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste;
    const svar = svarliste.svar[0];

    if (sporsmal.svartype === RSSvartype.BEHANDLINGSDAGER) {
        const ukeliste: RSSvarliste[] = [];
        sporsmal.undersporsmal.forEach(uspm => {
            ukeliste.push(uspm.svarliste);
        });
        return ukeliste;
    }

    if (sporsmal.svartype.startsWith('RADIO_GRUPPE')) {
        const besvartSporsmal = sporsmal.undersporsmal.find((spm: Sporsmal) => {
            return spm.svarliste.svar[0] && spm.svarliste.svar[0].verdi === RSVisningskriterie.CHECKED;
        });
        return besvartSporsmal.sporsmalstekst;
    }

    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') ? [] : '';
    }

    if (sporsmal.svartype === RSSvartype.DATO) {
        return new Date(svar.verdi.toString());
    }

    return svar.verdi;
};

export const hentPerioder = (sporsmal: Sporsmal) => {
    const perioder: number[] = [];
    sporsmal.svarliste.svar.forEach((svar, idx) =>
        perioder.push(idx)
    );
    return perioder;
};

export const hentPeriode = (sporsmal: Sporsmal, index: number) => {
    const svarliste = sporsmal.svarliste;
    const periode: Date[] = [];
    if (svarliste.svar.length === 0) {
        return periode;
    }
    const datoer = svarliste.svar[index].verdi.split(PERIODE_SKILLE);
    periode[0] = new Date(datoer[0]);
    periode[1] = new Date(datoer[1]);
    return periode;
};

export const hentFormState = (spmliste: Sporsmal[], id: string) => {
    let hovedSporsmal: Sporsmal = null;
    spmliste.forEach((spm) => {
        const fantHovedsporsmal = finnSporsmal(spm, id);
        if (fantHovedsporsmal) {
            hovedSporsmal = spm;
        }
    });
    return hentSvarliste(hovedSporsmal);
};

const finnSporsmal = (sporsmal: Sporsmal, id: string): boolean => {
    if (sporsmal.id === id) {
        return true;
    }
    let fantUndersporsmal = false;
    sporsmal.undersporsmal.forEach((uspm) => {
        if (finnSporsmal(uspm, id)) {
            fantUndersporsmal = true;
        }
    });
    return fantUndersporsmal;
};


const hentSvarliste = (sporsmal: Sporsmal) => {
    let svar: any = {};

    if (sporsmal.svarliste.svar[0] !== undefined) {
        svar[sporsmal.id] = sporsmal.svarliste.svar[0].verdi;
    }
    sporsmal.undersporsmal.forEach((spm) => {
        const alleUndersporsmalSvar: any = hentSvarliste(spm);
        svar = { ...svar, ...alleUndersporsmalSvar };
    });
    return svar;
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
