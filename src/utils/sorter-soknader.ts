import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { RSSoknadmetadata } from '../types/rs-types/rs-soknadmetadata'

export const getFomFraSoknad = (soknad: RSSoknadmetadata): Date => {
    return soknad.fom! || soknad.opprettetDato
}

export const senesteSendtDato = (soknad: RSSoknadmetadata) => {
    const arb = soknad.sendtTilArbeidsgiverDato?.getTime() || 0
    const nav = soknad.sendtTilNAVDato?.getTime() || 0
    return arb > nav ? arb : nav
}

export const sorterEtterSendt = (soknad1: RSSoknadmetadata, soknad2: RSSoknadmetadata) => {
    if (soknad1.status === RSSoknadstatus.SENDT || soknad2.status === RSSoknadstatus.SENDT) {
        return senesteSendtDato(soknad2) - senesteSendtDato(soknad1)
    }
    return sorterEtterNyesteFom(soknad1, soknad2)
}

export const sorterEtterStatus = (soknad1: RSSoknadmetadata, soknad2: RSSoknadmetadata) => {
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

export const sorterEtterNyesteFom = (soknad1: RSSoknadmetadata, soknad2: RSSoknadmetadata) => {
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
