import { naringsdrivende100syk } from '../sykmeldinger'
import { deepcopyMedNyId } from '../../deepcopyMedNyId'
import { naringsdrivendeSoknad } from '../soknad/naringsdrivende'
import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import {
    naringsdrivendeNyIArbeidslivet,
    naringsdrivendeVarigEndring,
    naringsdrivendeVirksomhetenAvviklet,
} from '../sporsmal/naringsdrivende'

import { Persona } from './personas'
const naringsdrivendeSoknadMedVirksomhetsSporsmal = lagNaringsdrivendeSoknadMedVirksomhetsSporsmal(
    'ffa7c5d2-4766-4450-a521-3ecc5842d015',
    [naringsdrivendeVirksomhetenAvviklet, naringsdrivendeNyIArbeidslivet, naringsdrivendeVarigEndring],
)

export const selvstendigNaringsdrivende: Persona = {
    soknader: [naringsdrivendeSoknadMedVirksomhetsSporsmal],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende',
}

const sendtSoknadMedGammelKvittering = deepcopyMedNyId(naringsdrivendeSoknad, '3708c4de-d16c-4835-841b-a6716b688888')

sendtSoknadMedGammelKvittering.status = 'SENDT'
sendtSoknadMedGammelKvittering.sendtTilNAVDato = new Date().toISOString()
sendtSoknadMedGammelKvittering.sporsmal.forEach((sporsmal) => {
    sporsmal.svar = [{ verdi: 'NEI' }]
})
const sendtSoknadMedNyKvitteringMedDokumenter = deepcopyMedNyId(
    sendtSoknadMedGammelKvittering,
    '3708c4de-d16c-4835-841b-a6716b688999',
)

sendtSoknadMedNyKvitteringMedDokumenter.inntektsopplysningerNyKvittering = true
sendtSoknadMedNyKvitteringMedDokumenter.inntektsopplysningerInnsendingId = '1234'
sendtSoknadMedNyKvitteringMedDokumenter.inntektsopplysningerInnsendingDokumenter = [
    'Skattemelding/Næringsspesifikasjon hvis den er klar',
]

function lagNaringsdrivendeSoknadMedVirksomhetsSporsmal(id: string, ekstraSporsmal: RSSporsmal[]) {
    const soknad = deepcopyMedNyId(naringsdrivendeSoknad, id) as RSSoknad
    const tilSluttIndex = soknad.sporsmal.findIndex((sporsmal) => sporsmal.tag === 'TIL_SLUTT')
    soknad.sporsmal.splice(tilSluttIndex, 0, ...ekstraSporsmal)
    return soknad
}

export const selvstendigNaringsdrivendeSendtPerson: Persona = {
    soknader: [sendtSoknadMedGammelKvittering, sendtSoknadMedNyKvitteringMedDokumenter],
    sykmeldinger: [naringsdrivende100syk],
    beskrivelse: 'Selvstendig næringsdrivende med sendt søknad',
}
