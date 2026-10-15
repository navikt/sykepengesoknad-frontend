import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { sykmeldinger } from '../sykmeldinger'
import { kortArbeidstakerSoknad } from '../soknad/arbeidstaker-kort'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'

import { Persona } from './personas'

const byggSporsmalMedNyeDatoer = (soknad: RSSoknad, fom: string, tom: string): void => {
    soknad.sporsmal = soknad.sporsmal.map((sporsmal) => {
        if (sporsmal.tag !== 'TILBAKE_I_ARBEID') return sporsmal
        return tilbakeIArbeid({
            fom,
            tom,
            arbeidsgiver: soknad.arbeidsgiver?.navn ?? undefined,
            id: sporsmal.id,
            svar: sporsmal.svar,
            tilbakeNarId: sporsmal.undersporsmal[0].id,
            tilbakeNarSvar: sporsmal.undersporsmal[0].svar,
        })
    })
}

const nySoknadSomIkkeKanFyllesUt: RSSoknad = deepcopyMedNyId(
    kortArbeidstakerSoknad,
    'e6e53c43-3b64-48be-b9d1-39d95198e521',
)
const nySoknadFom = '2022-04-25'
const nySoknadTom = '2022-04-30'
nySoknadSomIkkeKanFyllesUt.fom = nySoknadFom
nySoknadSomIkkeKanFyllesUt.tom = nySoknadTom
nySoknadSomIkkeKanFyllesUt.soknadPerioder[0].fom = nySoknadFom
nySoknadSomIkkeKanFyllesUt.soknadPerioder[0].tom = nySoknadTom
byggSporsmalMedNyeDatoer(nySoknadSomIkkeKanFyllesUt, nySoknadFom, nySoknadTom)

const endaEnNySoknadSomIkkeKanFyllesUt: RSSoknad = deepcopyMedNyId(
    kortArbeidstakerSoknad,
    'e6e53c43-3b64-48be-b9d1-39d95198e522',
)
const endaEnNySoknadFom = '2022-04-23'
const endaEnNySoknadTom = '2022-04-30'
endaEnNySoknadSomIkkeKanFyllesUt.fom = endaEnNySoknadFom
endaEnNySoknadSomIkkeKanFyllesUt.tom = endaEnNySoknadTom
endaEnNySoknadSomIkkeKanFyllesUt.soknadPerioder[0].fom = endaEnNySoknadFom
endaEnNySoknadSomIkkeKanFyllesUt.soknadPerioder[0].tom = endaEnNySoknadTom
byggSporsmalMedNyeDatoer(endaEnNySoknadSomIkkeKanFyllesUt, endaEnNySoknadFom, endaEnNySoknadTom)

export const flereEldreUsendteSoknader: Persona = {
    soknader: [
        deepcopyMedNyId(kortArbeidstakerSoknad, 'e6e53c43-3b64-48be-b9d1-39d95198e529'),
        nySoknadSomIkkeKanFyllesUt,
        endaEnNySoknadSomIkkeKanFyllesUt,
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'To eldre søknader som ikke kan sendes inn',
}

export const eldreUsendtSoknad: Persona = {
    soknader: [
        deepcopyMedNyId(kortArbeidstakerSoknad, 'e6e53c43-3b64-48be-b9d1-39d95198e523'),
        deepcopyMedNyId(nySoknadSomIkkeKanFyllesUt, 'e6e53c43-3b64-48be-b9d1-39d95198e528'),
    ],
    sykmeldinger: sykmeldinger,
    beskrivelse: 'En eldre søknad som ikke kan sendes inn',
}
