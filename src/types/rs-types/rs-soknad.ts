import { RSSoknadstype } from './rs-soknadstype';
import { RSSoknadstatus } from './rs-soknadstatus';
import { RSSporsmal } from './rs-sporsmal';
import { Arbeidsgiver } from '../types';
import { RSSoknadsperiode } from './rs-soknadsperiode';

export interface RSSoknad {
    id: string;
    sykmeldingId?: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    fom?: string;
    tom?: string;
    avbruttDato?: string;
    opprettetDato: string;
    sendtTilNAVDato?: string;
    sendtTilArbeidsgiverDato: string;
    arbeidsgiver: Arbeidsgiver;
    sporsmal: RSSporsmal[];
    soknadPerioder: RSSoknadsperiode[];
}

