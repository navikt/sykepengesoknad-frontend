import { Arbeidsgiver } from '../types'
import { dayjsToDate } from '../../utils/dato-utils'

import { RSArbeidssituasjonType } from './rs-arbeidssituasjon'
import { RSMerknad } from './rs-merknad'
import { RSSoknadsperiode } from './rs-soknadsperiode'
import { RSSoknadstatusType } from './rs-soknadstatus'
import { RSSoknadstypeType } from './rs-soknadstype'

export class RSSoknadmetadata {
    id: string
    sykmeldingId?: string
    soknadstype: RSSoknadstypeType
    status: RSSoknadstatusType
    arbeidssituasjon?: RSArbeidssituasjonType
    fom?: Date
    tom?: Date
    korrigerer?: string
    korrigertAv?: string
    egenmeldtSykmelding?: boolean
    avbruttDato?: Date
    sykmeldingUtskrevet?: Date
    startSykeforlop?: Date
    opprettetDato: Date
    sendtTilNAVDato?: Date
    sendtTilArbeidsgiverDato?: Date
    arbeidsgiver?: Arbeidsgiver
    soknadPerioder: RSSoknadsperiode[]
    merknaderFraSykmelding?: RSMerknad[]
    opprettetAvInntektsmelding: boolean

    constructor(json: any) {
        this.id = json.id
        this.sykmeldingId = json.sykmeldingId
        this.soknadstype = json.soknadstype
        this.status = json.status
        this.arbeidssituasjon = json.arbeidssituasjon
        this.fom = dayjsToDate(json.fom)
        this.tom = dayjsToDate(json.tom)
        this.korrigerer = json.korrigerer
        this.korrigertAv = json.korrigertAv
        this.egenmeldtSykmelding = json.egenmeldtSykmelding
        this.avbruttDato = dayjsToDate(json.avbruttDato)
        this.sykmeldingUtskrevet = dayjsToDate(json.sykmeldingUtskrevet)
        this.startSykeforlop = dayjsToDate(json.startSykeforlop)
        this.opprettetDato = dayjsToDate(json.opprettetDato)!
        this.sendtTilNAVDato = dayjsToDate(json.sendtTilNAVDato)
        this.sendtTilArbeidsgiverDato = dayjsToDate(json.sendtTilArbeidsgiverDato)
        if (json.arbeidsgiver) {
            this.arbeidsgiver = {
                navn: json.arbeidsgiver.navn,
                orgnummer: json.arbeidsgiver.orgnummer,
            }
        }
        this.soknadPerioder = json.soknadPerioder
        this.merknaderFraSykmelding = json.merknaderFraSykmelding
        this.opprettetAvInntektsmelding = json.opprettetAvInntektsmelding
    }
}
