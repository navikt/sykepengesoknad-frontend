import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { Persona } from './personas/personas'
import { arbeidstaker100Syk } from './sykmeldinger'
import { arbeidstaker } from './soknad/arbeidstaker'

const enUsendt = jsonDeepCopy(arbeidstaker100Syk)
enUsendt.sykmeldingStatus.statusEvent = 'APEN'
enUsendt.mottattTidspunkt = new Date()
enUsendt.id = 'id-apen-sykmelding'

export const enUsendtSykmelding: Persona = {
    soknader: [deepcopyMedNyId(arbeidstaker, '5d0bd29f-7803-4945-8426-49921284435e')],
    sykmeldinger: [arbeidstaker100Syk, enUsendt],
    beskrivelse: 'En usendt sykmelding',
}

const usendt = jsonDeepCopy(arbeidstaker100Syk)
usendt.sykmeldingStatus.statusEvent = 'APEN'
usendt.mottattTidspunkt = new Date()
usendt.id = '943a59ef-fd95-441c-a303-d71e25680ff8'

const eldsteUsendte = jsonDeepCopy(arbeidstaker100Syk)
eldsteUsendte.sykmeldingStatus.statusEvent = 'APEN'
eldsteUsendte.mottattTidspunkt = new Date()
eldsteUsendte.id = 'id-apen-sykmelding'
eldsteUsendte.sykmeldingsperioder[0].fom = '2018-04-01' as any

export const toUsendteSykmeldinger: Persona = {
    soknader: [deepcopyMedNyId(arbeidstaker, 'a7efa5f0-003c-41d5-ab33-5c9be9179721')],
    sykmeldinger: [arbeidstaker100Syk, usendt, eldsteUsendte],
    beskrivelse: 'To usendte sykmeldinger',
}
