import { RSSvartype } from './rs-svartype';
import { RSVisningskriterie } from './rs-visningskriterie';
import { RSSvar } from './rs-svar';
import { Sporsmal } from '../types';

export interface RSSporsmal {
    id: string;
    tag: string;
    sporsmalstekst: string;
    undertekst: string;
    svartype: RSSvartype;
    min: string;
    max: string;
    pavirkerAndreSporsmal: boolean;
    kriterieForVisningAvUndersporsmal: RSVisningskriterie;
    svar: RSSvar[];
    undersporsmal: RSSporsmal[];
}

export function sporsmalToRS(sporsmal: Sporsmal): RSSporsmal {
    return rsSporsmalMapping(sporsmal);
}

const rsSporsmalMapping = (sporsmal: Sporsmal): RSSporsmal => {
    const rsSporsmal = {} as RSSporsmal;
    rsSporsmal.id = sporsmal.id;
    rsSporsmal.tag = sporsmal.tag.toString() + tagIndexEllerBlank(sporsmal.tagIndex);
    rsSporsmal.sporsmalstekst = sporsmal.sporsmalstekst === '' ? null : sporsmal.sporsmalstekst;
    rsSporsmal.undertekst = sporsmal.undertekst;
    rsSporsmal.svartype = sporsmal.svartype;
    rsSporsmal.min = sporsmal.min;
    rsSporsmal.max = sporsmal.max;
    rsSporsmal.pavirkerAndreSporsmal = sporsmal.pavirkerAndreSporsmal;
    rsSporsmal.kriterieForVisningAvUndersporsmal = rsVisningskriterie(sporsmal.kriterieForVisningAvUndersporsmal);
    rsSporsmal.svar = sporsmal.svarliste.svar;
    if (sporsmal.undersporsmal) {
        rsSporsmal.undersporsmal = sporsmal.undersporsmal.map((uspm: Sporsmal) => { return rsSporsmalMapping(uspm) });
    }
    else {
        rsSporsmal.undersporsmal = [];
    }
    return rsSporsmal;
};

const tagIndexEllerBlank = (tagIndex: number) => {
    if (tagIndex === undefined) return '';
    return `_${tagIndex}`;
};

const rsVisningskriterie = (kriterieForVisningAvUndersporsmal: string) => {
    if(kriterieForVisningAvUndersporsmal as keyof typeof RSVisningskriterie) {
        return RSVisningskriterie[kriterieForVisningAvUndersporsmal as keyof typeof RSVisningskriterie];
    }
    return null;
};
