import { TagTyper } from '../types/enums'
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { Soknad, Sporsmal } from '../types/types'
import { senesteTom } from './periode-utils'

export const getTomFraSoknad = (soknad: Soknad): Date => {
    const getTomForUtland = (_soknad: Soknad) => {
        const perioder = _soknad.sporsmal
            .find((spm: Sporsmal) => spm.tag === TagTyper.PERIODEUTLAND)!
            .svarliste.svar.map((periode) => {
                const jsonPeriode = JSON.parse(periode.verdi)
                return {
                    fom: new Date(jsonPeriode.fom),
                    tom: new Date(jsonPeriode.tom),
                }
            })
        return senesteTom(perioder)
    }

    if (
        soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND &&
        soknad.status === RSSoknadstatus.SENDT
    ) {
        return getTomForUtland(soknad) || soknad.opprettetDato
    }

    if (
        soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND &&
        soknad.status === RSSoknadstatus.NY
    ) {
        return soknad.opprettetDato
    }
    return soknad.tom || soknad.opprettetDato
}

export const senesteSendtDato = (soknad: Soknad) => {
    const arb = soknad.sendtTilArbeidsgiverDato?.getTime() || 0
    const nav = soknad.sendtTilNAVDato?.getTime() || 0
    return arb > nav ? arb : nav
}

export const sorterEtterSendt = (soknad1: Soknad, soknad2: Soknad) => {
    if (
        soknad1.status === RSSoknadstatus.SENDT ||
        soknad2.status === RSSoknadstatus.SENDT
    ) {
        return senesteSendtDato(soknad2) - senesteSendtDato(soknad1)
    }
    return sorterEtterNyesteTom(soknad1, soknad2)
}

export const sorterEtterStatus = (soknad1: Soknad, soknad2: Soknad) => {
    if (soknad1.status === soknad2.status) {
        return sorterEtterNyesteTom(soknad1, soknad2)
    }
    if (soknad1.status === RSSoknadstatus.AVBRUTT) {
        return -1
    }
    if (soknad1.status === RSSoknadstatus.SENDT) {
        if (soknad2.status === RSSoknadstatus.UTGAATT) {
            return -1
        }
        return 1
    }
    if (soknad1.status === RSSoknadstatus.UTGAATT) {
        return 1
    }
    return sorterEtterNyesteTom(soknad1, soknad2)
}

export const sorterEtterNyesteTom = (soknad1: Soknad, soknad2: Soknad) => {
    const tom1 = getTomFraSoknad(soknad1)
    const tom2 = getTomFraSoknad(soknad2)
    const diff = tom2.getTime() - tom1.getTime()
    if (diff == 0) {
        if (soknad2.soknadstype == RSSoknadstype.ARBEIDSTAKERE) {
            return -1
        }
    }
    return diff
}
