import { TagTyper } from '../types/enums'
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { Soknad, Sporsmal } from '../types/types'

import { senesteFom } from './periode-utils'

export const getFomFraSoknad = (soknad: Soknad): Date => {
    const getFomForUtland = (_soknad: Soknad) => {
        const perioder = _soknad.sporsmal
            .find((spm: Sporsmal) => spm.tag === TagTyper.PERIODEUTLAND)!
            .svarliste.svar.map((periode) => {
                const jsonPeriode = JSON.parse(periode.verdi)
                return {
                    fom: new Date(jsonPeriode.fom),
                    tom: new Date(jsonPeriode.tom),
                }
            })
        return senesteFom(perioder)
    }

    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && soknad.status === RSSoknadstatus.SENDT) {
        return getFomForUtland(soknad) || soknad.opprettetDato
    }

    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && soknad.status === RSSoknadstatus.NY) {
        return soknad.opprettetDato
    }
    return soknad.fom || soknad.opprettetDato
}

export const senesteSendtDato = (soknad: Soknad) => {
    const arb = soknad.sendtTilArbeidsgiverDato?.getTime() || 0
    const nav = soknad.sendtTilNAVDato?.getTime() || 0
    return arb > nav ? arb : nav
}

export const sorterEtterSendt = (soknad1: Soknad, soknad2: Soknad) => {
    if (soknad1.status === RSSoknadstatus.SENDT || soknad2.status === RSSoknadstatus.SENDT) {
        return senesteSendtDato(soknad2) - senesteSendtDato(soknad1)
    }
    return sorterEtterNyesteFom(soknad1, soknad2)
}

export const sorterEtterStatus = (soknad1: Soknad, soknad2: Soknad) => {
    if (soknad1.status === soknad2.status) {
        return sorterEtterNyesteFom(soknad1, soknad2)
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
    return sorterEtterNyesteFom(soknad1, soknad2)
}

export const sorterEtterNyesteFom = (soknad1: Soknad, soknad2: Soknad) => {
    const tom1 = getFomFraSoknad(soknad1)
    const tom2 = getFomFraSoknad(soknad2)
    const diff = tom2.getTime() - tom1.getTime()
    if (diff == 0) {
        if (soknad2.soknadstype == RSSoknadstype.ARBEIDSTAKERE) {
            return -1
        }
    }
    return diff
}
