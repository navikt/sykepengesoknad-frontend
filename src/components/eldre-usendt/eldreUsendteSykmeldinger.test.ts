import dayjs from 'dayjs'
import { expect, test } from 'vitest'

import { arbeidstaker100Syk } from '../../data/mock/data/sykmeldinger'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { eldreUsendteSykmeldinger } from './eldreUsendteSykmeldinger'

test('Tom liste returnerer false', () => {
    expect(eldreUsendteSykmeldinger([], new Date())).toHaveLength(0)
})

test('En sendt sykmelding returnerer false', () => {
    expect(eldreUsendteSykmeldinger([sykmelding()], new Date())).toHaveLength(0)
})

test('En sendt ny sykmelding returnerer false', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'SENDT'
    sykmelding1.mottattTidspunkt = new Date()
    expect(eldreUsendteSykmeldinger([sykmelding1], new Date())).toHaveLength(0)
})

test('En usendt ny sykmelding returnerer true', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = new Date()
    expect(eldreUsendteSykmeldinger([sykmelding1], new Date())).toHaveLength(1)
})

test('En usendt ny sykmelding returnerer false når søknad fom er eldre', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = new Date()
    sykmelding1.sykmeldingsperioder[0].fom = new Date()
    expect(eldreUsendteSykmeldinger([sykmelding1], dayjs().subtract(1, 'day').toDate())).toHaveLength(0)
})

test('En usendt 366 dager gammel sykmelding returnerer false', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = dayjs().subtract(366, 'days').toDate()
    expect(eldreUsendteSykmeldinger([sykmelding1], new Date())).toHaveLength(0)
})

test('En usendt 365 dager gammel sykmelding returnerer true', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = dayjs().subtract(365, 'days').add(1, 'minute').toDate()
    expect(eldreUsendteSykmeldinger([sykmelding1], new Date())).toHaveLength(1)
})

function sykmelding() {
    return jsonDeepCopy(arbeidstaker100Syk)
}
