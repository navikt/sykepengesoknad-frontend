import { oppsummering } from '../sporsmal/oppsummering'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { arbeidstaker } from './arbeidstaker'

const arbeidstakerJulesoknad = deepcopyMedNyId(arbeidstaker, '6e60c42e-ff62-4806-92b0-deade6f9fc69')

arbeidstakerJulesoknad.julesoknad = true
arbeidstakerJulesoknad.julesoknad = true
arbeidstakerJulesoknad.fom = '2024-12-01'
arbeidstakerJulesoknad.tom = '2024-12-31'
arbeidstakerJulesoknad.opprettetDato = '2024-11-30'
arbeidstakerJulesoknad.sykmeldingUtskrevet = '2024-11-30'
arbeidstakerJulesoknad.startSykeforlop = '2024-12-01'
arbeidstakerJulesoknad.soknadPerioder.at(0)!.fom = '2024-12-01'
arbeidstakerJulesoknad.soknadPerioder.at(0)!.fom = '2024-12-31'
arbeidstakerJulesoknad.sporsmal = [
    {
        id: '687336',
        tag: 'ANSVARSERKLARING',
        sporsmalstekst: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
        undertekst: null,
        svartype: 'CHECKBOX_PANEL',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: null,
        svar: [],
        undersporsmal: [],
    },
    {
        id: '687341',
        tag: 'TILBAKE_I_ARBEID',
        sporsmalstekst:
            'Var du tilbake i fullt arbeid hos Posten Norge AS, Bærum i løpet av perioden 1. - 31.desember 2024?',
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: '687342',
                tag: 'TILBAKE_NAR',
                sporsmalstekst: 'Når begynte du å jobbe igjen?',
                undertekst: null,
                svartype: 'DATO',
                min: '2024-12-01',
                max: '2024-12-31',
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    },
    oppsummering(),
]

export default arbeidstakerJulesoknad
