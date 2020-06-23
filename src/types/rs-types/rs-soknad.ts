import { Arbeidsgiver } from '../types'
import { RSArbeidssituasjonType } from './rs-arbeidssituasjon'
import { RSSoknadsperiode } from './rs-soknadsperiode'
import { RSSoknadstatusType } from './rs-soknadstatus'
import { RSSoknadstypeType } from './rs-soknadstype'
import { RSSporsmal } from './rs-sporsmal'

export interface RSSoknad {
    id: string;
    sykmeldingId: string | null;
    soknadstype: RSSoknadstypeType;
    status: RSSoknadstatusType;
    arbeidssituasjon: RSArbeidssituasjonType | null;
    fom: string | null;
    tom: string | null;
    korrigerer: string | null;
    korrigertAv: string | null;
    egenmeldtSykmelding: boolean | null;
    avbruttDato: string | null;
    sykmeldingUtskrevet: string | null;
    startSykeforlop: string | null;
    opprettetDato: string;
    sendtTilNAVDato: string | null;
    sendtTilArbeidsgiverDato: string | null;
    arbeidsgiver: Arbeidsgiver | null;
    sporsmal: RSSporsmal[];
    soknadPerioder: RSSoknadsperiode[];
}


