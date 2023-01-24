import dayjs from 'dayjs'

import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'
import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

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

export function erArbeidstakerSoknad(soknad: Soknad) {
    return soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
}
