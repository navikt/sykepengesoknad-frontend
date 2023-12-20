import { Arbeidsgiver } from '../types'

import { RSArbeidssituasjonType } from './rs-arbeidssituasjon'
import { RSMerknad } from './rs-merknad'
import { RSSoknadsperiode } from './rs-soknadsperiode'
import { RSSoknadstatusType } from './rs-soknadstatus'
import { RSSoknadstypeType } from './rs-soknadstype'
import { RSSporsmal } from './rs-sporsmal'
import { ArbeidsforholdFraInntektskomponenten } from './rs-arbeidsforholdfrainntektskomponenten'

export interface RSSoknad {
    id: string
    sykmeldingId: string | null
    soknadstype: RSSoknadstypeType
    status: RSSoknadstatusType
    arbeidssituasjon: RSArbeidssituasjonType | null
    fom: string | null
    utenlandskSykmelding?: boolean
    tom: string | null
    korrigerer: string | null
    korrigertAv: string | null
    egenmeldtSykmelding: boolean | null
    avbruttDato: string | null
    sykmeldingUtskrevet: string | null
    startSykeforlop: string | null
    opprettetDato: string
    sendtTilNAVDato: string | null
    sendtTilArbeidsgiverDato: string | null
    arbeidsgiver: Arbeidsgiver | null
    sporsmal: RSSporsmal[]
    soknadPerioder: RSSoknadsperiode[]
    merknaderFraSykmelding?: RSMerknad[]
    opprettetAvInntektsmelding: boolean
    klippet: boolean
    inntektskilderDataFraInntektskomponenten?: ArbeidsforholdFraInntektskomponenten[]
    korrigeringsfristUtlopt?: boolean
    forstegangssoknad?: boolean
}
