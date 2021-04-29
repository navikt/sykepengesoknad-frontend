import dayjs from 'dayjs'

import { TagTyper } from '../types/enums'
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { Soknad, Sporsmal } from '../types/types'
import { senesteTom } from './periode-utils'

export const getTomFraSoknad = (soknad: Soknad): Date => {
    const getTomForUtland = (_soknad: Soknad) => {
        const perioder = _soknad.sporsmal.find((spm: Sporsmal) => spm.tag === TagTyper.PERIODEUTLAND)!
            .svarliste.svar
            .map((periode) => {
                const jsonPeriode = JSON.parse(periode.verdi)
                return {
                    fom: new Date(jsonPeriode.fom),
                    tom: new Date(jsonPeriode.tom),
                }
            })
        return senesteTom(perioder)
    }

    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && soknad.status === RSSoknadstatus.SENDT) {
        return getTomForUtland(soknad) || soknad.opprettetDato
    }

    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && soknad.status === RSSoknadstatus.NY) {
        return soknad.opprettetDato
    }
    return soknad.tom || soknad.opprettetDato
}

export const senesteSendtDato = (soknad: Soknad) => {
    const arb = soknad.sendtTilArbeidsgiverDato?.getTime() || 0
    const nav = soknad.sendtTilNAVDato?.getTime() || 0
    return (arb > nav) ? arb : nav
}

export const sorterEtterSendt = (soknad1: Soknad, soknad2: Soknad) => {
    if (soknad1.status === RSSoknadstatus.SENDT || soknad2.status === RSSoknadstatus.SENDT) {
        return senesteSendtDato(soknad2) - senesteSendtDato(soknad1)
    }
    return sorterEtterPerioder(soknad1, soknad2)
}

export const sorterEtterStatus = (soknad1: Soknad, soknad2: Soknad) => {
    if (soknad1.status === soknad2.status) {
        return sorterEtterPerioder(soknad1, soknad2)
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
    return sorterEtterPerioder(soknad1, soknad2)
}

export const sorterEtterPerioder = (soknad1: Soknad, soknad2: Soknad) => {
    const tom1 = getTomFraSoknad(soknad1)
    const tom2 = getTomFraSoknad(soknad2)
    return tom1.getTime() - tom2.getTime()
}

export const sorterEtterOpprettetDato = (soknad1: Soknad, soknad2: Soknad) => {
    if (lagDato(soknad1.opprettetDato).getTime() !== lagDato(soknad2.opprettetDato).getTime()) {
        return lagDato(soknad1.opprettetDato).getTime() - lagDato(soknad2.opprettetDato).getTime()
    } else {
        return lagDato(soknad1.fom || soknad1.opprettetDato).getTime() - lagDato(soknad2.fom || soknad2.opprettetDato).getTime()
    }
}

const lagDato = (dato: string | Date): Date => {
    if (typeof dato === 'string') {
        return dayjs(dato).toDate()
    } else {
        return dato
    }
}
