import { expect, test } from 'vitest'
import { subDays, subMinutes } from 'date-fns'

import { arbeidstaker100Syk } from '../../data/mock/data/sykmeldinger'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { now } from '../../utils/dato-utils'

import { eldreUsendteSykmeldinger } from './eldreUsendteSykmeldinger'

test('Tom liste returnerer false', () => {
    expect(eldreUsendteSykmeldinger([], now())).toHaveLength(0)
})

test('En sendt sykmelding returnerer false', () => {
    expect(eldreUsendteSykmeldinger([sykmelding()], now())).toHaveLength(0)
})

test('En sendt ny sykmelding returnerer false', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'SENDT'
    sykmelding1.mottattTidspunkt = now()
    expect(eldreUsendteSykmeldinger([sykmelding1], now())).toHaveLength(0)
})

test('En usendt ny sykmelding returnerer true', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = now()
    expect(eldreUsendteSykmeldinger([sykmelding1], now())).toHaveLength(1)
})

test('En usendt ny sykmelding returnerer false når søknad fom er eldre', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = now()
    sykmelding1.sykmeldingsperioder[0].fom = now()
    expect(eldreUsendteSykmeldinger([sykmelding1], subDays(now(), 1))).toHaveLength(0)
})

test('En usendt 366 dager gammel sykmelding returnerer false', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = subDays(now(), 366)
    expect(eldreUsendteSykmeldinger([sykmelding1], now())).toHaveLength(0)
})

test('En usendt 365 dager gammel sykmelding returnerer true', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = subMinutes(subDays(now(), 365), -1)
    expect(eldreUsendteSykmeldinger([sykmelding1], now())).toHaveLength(1)
})

function sykmelding() {
    return jsonDeepCopy(arbeidstaker100Syk)
}
