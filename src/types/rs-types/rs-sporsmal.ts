import { RSSvartype } from './rs-svartype';
import { RSVisningskriterie } from './rs-visningskriterie';
import { RSSvar } from './rs-svar';

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
