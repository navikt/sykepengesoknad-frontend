import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { arbeidUnderveis100Prosent } from '../sporsmal/arbeid-underveis-100-prosent'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

import { arbeidstaker } from './arbeidstaker'

export const arbeidstakerTrePerioder = deepcopyMedNyId(arbeidstaker, 'a1b2c3d4-e5f6-7890-abcd-ef1234567892')

const fom = '2020-04-01'
const forstePeriodeTom = '2020-04-10'
const tom = '2020-04-30'
const arbeidsgiver = 'Posten Norge AS, Bærum'

arbeidstakerTrePerioder.soknadPerioder = [
    {
        fom,
        tom: forstePeriodeTom,
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
        tom,
        grad: 80,
        sykmeldingstype: 'GRADERT',
    },
]

arbeidstakerTrePerioder.fom = fom
arbeidstakerTrePerioder.tom = tom
arbeidstakerTrePerioder.sporsmal = arbeidstakerTrePerioder.sporsmal.map((sporsmal) => {
    switch (sporsmal.tag) {
        case 'TILBAKE_I_ARBEID':
            return tilbakeIArbeid({
                fom,
                tom,
                arbeidsgiver,
                id: sporsmal.id,
                tilbakeNarId: sporsmal.undersporsmal[0].id,
            })
        case 'FERIE_V2':
            return ferieV2({ fom, tom, id: sporsmal.id, ferieNarId: sporsmal.undersporsmal[0].id })
        case 'PERMISJON_V2':
            return permisjonV2({ fom, tom, id: sporsmal.id, permisjonNarId: sporsmal.undersporsmal[0].id })
        case 'ARBEID_UNDERVEIS_100_PROSENT_0':
            return arbeidUnderveis100Prosent({ fom, tom: forstePeriodeTom, arbeidsgiver, id: sporsmal.id })
        case 'OPPHOLD_UTENFOR_EOS':
            return oppholdUtenforEos({ fom, tom, id: sporsmal.id, oppholdNarId: sporsmal.undersporsmal[0].id })
        default:
            return sporsmal
    }
})
