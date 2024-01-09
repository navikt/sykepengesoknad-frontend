import { naringsdrivendeSoknad } from '../soknad/naringsdrivende'
import { naringsdrivende100syk } from '../sykmeldinger'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'

import { Persona } from './personas'

export const selvstendigNaringsdrivende: Persona = {
    soknader: [naringsdrivendeSoknad],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende',
}

const sendtSoknadGammelKvittering = deepcopyMedNyId(naringsdrivendeSoknad, '3708c4de-d16c-4835-841b-a6716b688888')
sendtSoknadGammelKvittering.status = 'SENDT'
// sendt nå
sendtSoknadGammelKvittering.sendtTilNAVDato = new Date().toISOString()
sendtSoknadGammelKvittering.sporsmal.forEach((sporsmal) => {
    sporsmal.svar = [{ verdi: 'NEI' }]
})

const sendtSoknadNyKvitteringMedDokumenter = deepcopyMedNyId(
    sendtSoknadGammelKvittering,
    '3708c4de-d16c-4835-841b-a6716b688999',
)
sendtSoknadNyKvitteringMedDokumenter.inntektsopplysningerNyKvittering = true
sendtSoknadNyKvitteringMedDokumenter.inntektsopplysningerInnsendingId = '1234'
sendtSoknadNyKvitteringMedDokumenter.inntektsopplysningerInnsendingDokumenter = [
    'Skattemelding',
    'Næringsoppgave/Næringsspesifikasjon hvis den er klar',
]

export const selvstendigNaringsdrivendeSendt: Persona = {
    soknader: [sendtSoknadGammelKvittering, sendtSoknadNyKvitteringMedDokumenter],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende med sendt søknad',
}
