import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

import { arbeidstaker } from './arbeidstaker'

export const arbeidstakerToPerioder = deepcopyMedNyId(arbeidstaker, 'a1b2c3d4-e5f6-7890-abcd-ef1234567891')

const fom = '2020-04-01'
const forstePeriodeTom = '2020-04-15'
const tom = '2020-04-30'
const arbeidsgiver = 'Posten Norge AS, Bærum'

arbeidstakerToPerioder.soknadPerioder = [
    {
        fom,
        tom: forstePeriodeTom,
        grad: 100,
        sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
    },
    {
        fom: '2020-04-16',
        tom,
        grad: 60,
        sykmeldingstype: 'GRADERT',
    },
]

arbeidstakerToPerioder.fom = fom
arbeidstakerToPerioder.tom = tom
arbeidstakerToPerioder.sporsmal = arbeidstakerToPerioder.sporsmal.map((sporsmal) => {
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
