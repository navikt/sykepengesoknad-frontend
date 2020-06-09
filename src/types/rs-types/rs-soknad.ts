import { Arbeidsgiver } from '../types'
import { RSArbeidssituasjon } from './rs-arbeidssituasjon'
import { RSSoknadsperiode } from './rs-soknadsperiode'
import { RSSoknadstatus } from './rs-soknadstatus'
import { RSSoknadstype } from './rs-soknadstype'
import { RSSporsmal } from './rs-sporsmal'

export interface RSSoknad {
    id: string;
    sykmeldingId?: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    arbeidssituasjon: RSArbeidssituasjon | null;
    fom?: string;
    tom?: string;
    avbruttDato?: string;
    opprettetDato: string;
    sendtTilNAVDato?: string;
    sendtTilArbeidsgiverDato: string;
    arbeidsgiver?: Arbeidsgiver;
    sporsmal: RSSporsmal[];
    soknadPerioder: RSSoknadsperiode[];
}


