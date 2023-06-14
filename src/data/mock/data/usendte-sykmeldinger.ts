import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { Persona } from '../personas'
import { deepcopyMedNyId } from '../deepcopyMedNyId'

import { arbeidstaker } from './opplaering'
import { arbeidstaker100Syk } from './sykmeldinger'

const enUsendt = jsonDeepCopy(arbeidstaker100Syk)
enUsendt.sykmeldingStatus.statusEvent = 'APEN'
enUsendt.mottattTidspunkt = new Date()
enUsendt.id = 'APEN'

export const enUsendtSykmelding: Persona = {
    soknader: [deepcopyMedNyId(arbeidstaker, '5d0bd29f-7803-4945-8426-49921284435e')],
    sykmeldinger: [arbeidstaker100Syk, enUsendt],
}

const usendt = jsonDeepCopy(arbeidstaker100Syk)
usendt.sykmeldingStatus.statusEvent = 'APEN'
usendt.mottattTidspunkt = new Date()
usendt.id = '943a59ef-fd95-441c-a303-d71e25680ff8'

const eldsteUsendte = jsonDeepCopy(arbeidstaker100Syk)
eldsteUsendte.sykmeldingStatus.statusEvent = 'APEN'
eldsteUsendte.mottattTidspunkt = new Date()
eldsteUsendte.id = 'APEN'
eldsteUsendte.sykmeldingsperioder[0].fom = '2018-04-01' as any

export const toUsendteSykmeldinger: Persona = {
    soknader: [deepcopyMedNyId(arbeidstaker, 'a7efa5f0-003c-41d5-ab33-5c9be9179721')],
    sykmeldinger: [arbeidstaker100Syk, usendt, eldsteUsendte],
}
