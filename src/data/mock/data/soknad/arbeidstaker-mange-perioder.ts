import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { arbeidstaker } from './arbeidstaker'

export const arbeidstakerMangePerioder = deepcopyMedNyId(arbeidstaker, 'f8a3c2d1-9e47-4b52-8c0f-1234567890ab')

arbeidstakerMangePerioder.soknadPerioder = [
    {
        fom: '2020-04-01',
        tom: '2020-04-07',
        grad: 100,
        sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
    },
    {
        fom: '2020-04-08',
        tom: '2020-04-14',
        grad: 60,
        sykmeldingstype: 'GRADERT',
    },
    {
        fom: '2020-04-15',
        tom: '2020-04-21',
        grad: 80,
        sykmeldingstype: 'GRADERT',
    },
    {
        fom: '2020-04-22',
        tom: '2020-04-30',
        grad: 100,
        sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
    },
]
