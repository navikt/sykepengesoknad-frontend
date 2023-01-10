import dayjs from 'dayjs'

import { RSSoknadmetadata } from '../../types/rs-types/rs-soknadmetadata'

export function harKorrigertArbeidstakersoknadIDetSiste(soknader: RSSoknadmetadata[]) {
    const enMndSiden = dayjs().subtract(32, 'days').toDate()

    return (
        soknader
            .filter((s) => s.status === 'SENDT')
            .filter((s) => s.soknadstype === 'ARBEIDSTAKERE')
            .filter((s) => s.korrigerer !== undefined)
            .filter((s) => s.opprettetDato > enMndSiden).length > 0
    )
}
