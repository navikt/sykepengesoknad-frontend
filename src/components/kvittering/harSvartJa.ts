import dayjs from 'dayjs'

import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { TagTyper } from '../../types/enums'

export function harKorrigertArbeidstakersoknadIDetSiste(soknader: RSSoknadmetadata[]) {
    const toMndSiden = dayjs().subtract(64, 'days').toDate()

    return (
        soknader
            .filter((s) => s.status === 'SENDT')
            .filter((s) => s.soknadstype === 'ARBEIDSTAKERE')
            .filter((s) => s.korrigerer)
            .filter((s) => s.opprettetDato > toMndSiden).length > 0
    )
}

export function harSvartTilbakeIArbeid(soknad: Soknad) {
    if (soknad.soknadstype != RSSoknadstype.ARBEIDSTAKERE) {
        return false
    }
    const spm = soknad.sporsmal.find((s) => s.tag == TagTyper.TILBAKE_I_ARBEID)
    if (!spm) {
        return false
    }
    if (spm.svarliste.svar.length == 1) {
        return spm.svarliste.svar[0].verdi == 'JA'
    }
    return false
}
