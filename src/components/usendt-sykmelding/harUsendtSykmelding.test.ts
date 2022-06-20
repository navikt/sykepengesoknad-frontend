import dayjs from 'dayjs'

import { arbeidstaker100Syk } from '../../data/mock/data/sykmeldinger'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { usendteSykmeldinger } from './usendteSykmeldinger'

test('Tom liste returnerer false', () => {
    expect(usendteSykmeldinger([])).toHaveLength(0)
})

test('En sendt sykmelding returnerer false', () => {
    expect(usendteSykmeldinger([sykmelding()])).toHaveLength(0)
})

test('En sendt ny sykmelding returnerer false', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'SENDT'
    sykmelding1.mottattTidspunkt = new Date()
    expect(usendteSykmeldinger([sykmelding1])).toHaveLength(0)
})

test('En usendt ny sykmelding returnerer true', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = new Date()
    expect(usendteSykmeldinger([sykmelding1])).toHaveLength(1)
})

test('En usendt 366 dager gammel sykmelding returnerer false', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = dayjs().subtract(366, 'days').toDate()
    expect(usendteSykmeldinger([sykmelding1])).toHaveLength(0)
})

test('En usendt 365 dager gammel sykmelding returnerer true', () => {
    const sykmelding1 = sykmelding()
    sykmelding1.sykmeldingStatus.statusEvent = 'APEN'
    sykmelding1.mottattTidspunkt = dayjs()
        .subtract(365, 'days')
        .add(1, 'minute')
        .toDate()
    expect(usendteSykmeldinger([sykmelding1])).toHaveLength(1)
})

function sykmelding() {
    return jsonDeepCopy(arbeidstaker100Syk)
}
