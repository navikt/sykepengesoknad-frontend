import { RSSoknadstatus } from './rs-soknadstatus';
import { RSSoknadstype } from './rs-soknadstype';
import { RSArbeidssituasjon } from './rs-arbeidssituasjon';
import { RSSporsmal } from './rs-sporsmal';
import { RSArbeidsgiver } from './rs-arbeidsgiver';
import { RSSoknadsperiode } from './rs-soknadsperiode';

export interface RSSykepengesoknad {
    id: string;
    aktorId: string;
    sykmeldingId: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    fom: string; // LocalDate
    tom: string; // LocalDate
    opprettetDato: string; // LocalDate
    innsendtDato: string; // LocalDate
    sendtTilNAVDato: string; // LocalDateTime
    sendtTilArbeidsgiverDato: string; // LocalDateTime
    avbruttDato: string // LocalDate;
    startSykeforlop: string // LocalDate;
    sykmeldingUtskrevet: string // LocalDate;
    arbeidsgiver: RSArbeidsgiver;
    korrigerer: string;
    korrigertAv: string;
    arbeidssituasjon: RSArbeidssituasjon;
    soknadPerioder: RSSoknadsperiode[];
    sporsmal: RSSporsmal[];
}
