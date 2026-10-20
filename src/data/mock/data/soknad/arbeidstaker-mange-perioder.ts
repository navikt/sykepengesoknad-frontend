import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

import { arbeidstaker } from './arbeidstaker'

export const arbeidstakerMangePerioder = deepcopyMedNyId(arbeidstaker, 'f8a3c2d1-9e47-4b52-8c0f-1234567890ab')

const fom = '2020-04-01'
const forstePeriodeTom = '2020-04-07'
const tom = '2020-04-30'
const arbeidsgiver = 'Posten Norge AS, Bærum'

arbeidstakerMangePerioder.soknadPerioder = [
    {
        fom,
        tom: forstePeriodeTom,
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
        tom,
        grad: 100,
        sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
    },
]

arbeidstakerMangePerioder.fom = fom
arbeidstakerMangePerioder.tom = tom
arbeidstakerMangePerioder.sporsmal = arbeidstakerMangePerioder.sporsmal.map((sporsmal) => {
    switch (sporsmal.tag) {
        case 'TILBAKE_I_ARBEID':
            return tilbakeIArbeid({
                fom,
                tom,
                arbeidsgiver,
            })
        case 'FERIE_V2':
            return ferieV2({ fom, tom })
        case 'PERMISJON_V2':
            return permisjonV2({ fom, tom })
        case 'ARBEID_UNDERVEIS_100_PROSENT_0':
            return arbeidUnderveis100Prosent({ fom, tom: forstePeriodeTom, arbeidsgiver })
        case 'OPPHOLD_UTENFOR_EOS':
            return oppholdUtenforEos({ fom, tom })
        default:
            return sporsmal
    }
})
