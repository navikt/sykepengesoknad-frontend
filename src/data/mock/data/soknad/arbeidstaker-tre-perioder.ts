import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { arbeidstaker } from './arbeidstaker'

export const arbeidstakerTrePerioder = deepcopyMedNyId(arbeidstaker, 'a1b2c3d4-e5f6-7890-abcd-ef1234567892')

arbeidstakerTrePerioder.soknadPerioder = [
    {
        fom: '2020-04-01',
        tom: '2020-04-10',
        grad: 100,
        sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
    },
    {
        fom: '2020-04-11',
        tom: '2020-04-20',
        grad: 60,
        sykmeldingstype: 'GRADERT',
    },
    {
        fom: '2020-04-21',
        tom: '2020-04-30',
        grad: 80,
        sykmeldingstype: 'GRADERT',
    },
]
