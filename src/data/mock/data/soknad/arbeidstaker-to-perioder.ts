import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { arbeidstaker } from './arbeidstaker'

export const arbeidstakerToPerioder = deepcopyMedNyId(arbeidstaker, 'a1b2c3d4-e5f6-7890-abcd-ef1234567891')

arbeidstakerToPerioder.soknadPerioder = [
    {
        fom: '2020-04-01',
        tom: '2020-04-15',
        grad: 100,
        sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
    },
    {
        fom: '2020-04-16',
        tom: '2020-04-30',
        grad: 60,
        sykmeldingstype: 'GRADERT',
    },
]
