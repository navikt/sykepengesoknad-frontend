import { Arbeidsgiver } from '../types'
import { toDate } from '../../utils/dato-utils'

import { RSArbeidssituasjonType } from './rs-arbeidssituasjon'
import { RSMerknad } from './rs-merknad'
import { RSSoknadsperiode } from './rs-soknadsperiode'
import { RSSoknadstatusType } from './rs-soknadstatus'
import { RSSoknadstypeType } from './rs-soknadstype'

export class RSSoknadmetadata {
    readonly id: string
    readonly sykmeldingId?: string
    readonly soknadstype: RSSoknadstypeType
    readonly status: RSSoknadstatusType
    readonly arbeidssituasjon?: RSArbeidssituasjonType
    readonly fom?: Date
    readonly tom?: Date
    readonly korrigerer?: string
    readonly korrigertAv?: string
    readonly egenmeldtSykmelding?: boolean
    readonly avbruttDato?: Date
    readonly sykmeldingUtskrevet?: Date
    readonly startSykeforlop?: Date
    readonly opprettetDato: Date
    readonly sendtTilNAVDato?: Date
    readonly sendtTilArbeidsgiverDato?: Date
    readonly arbeidsgiver?: Arbeidsgiver
    readonly soknadPerioder: RSSoknadsperiode[]
    readonly merknaderFraSykmelding?: RSMerknad[]
    readonly opprettetAvInntektsmelding: boolean
    readonly forstegangssoknad?: boolean
    readonly friskTilArbeidVedtakId?: string

    constructor(json: any) {
        this.id = json.id
        this.sykmeldingId = json.sykmeldingId
        this.soknadstype = json.soknadstype
        this.status = json.status
        this.arbeidssituasjon = json.arbeidssituasjon
        this.fom = json.fom ? toDate(json.fom) : undefined
        this.tom = json.tom ? toDate(json.tom) : undefined
        this.korrigerer = json.korrigerer
        this.korrigertAv = json.korrigertAv
        this.egenmeldtSykmelding = json.egenmeldtSykmelding
        this.avbruttDato = json.avbruttDato ? toDate(json.avbruttDato) : undefined
        this.sykmeldingUtskrevet = json.sykmeldingUtskrevet ? toDate(json.sykmeldingUtskrevet) : undefined
        this.startSykeforlop = json.startSykeforlop ? toDate(json.startSykeforlop) : undefined
        this.opprettetDato = toDate(json.opprettetDato)!
        this.sendtTilNAVDato = json.sendtTilNAVDato ? toDate(json.sendtTilNAVDato) : undefined
        this.sendtTilArbeidsgiverDato = json.sendtTilArbeidsgiverDato
            ? toDate(json.sendtTilArbeidsgiverDato)
            : undefined
        if (json.arbeidsgiver) {
            this.arbeidsgiver = {
                navn: json.arbeidsgiver.navn,
                orgnummer: json.arbeidsgiver.orgnummer,
            }
        }
        this.soknadPerioder = json.soknadPerioder
        this.merknaderFraSykmelding = json.merknaderFraSykmelding
        this.opprettetAvInntektsmelding = json.opprettetAvInntektsmelding
        this.forstegangssoknad = json.forstegangssoknad
        this.friskTilArbeidVedtakId = json.friskTilArbeidVedtakId
    }
}
