import dayjs from 'dayjs'

import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

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
