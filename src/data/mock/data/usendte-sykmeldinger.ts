import { jsonDeepCopy } from '../../../utils/json-deep-copy'
import { Persona } from '../personas'
import { arbeidstaker } from './opplaering'
import { arbeidstaker100Syk } from './sykmeldinger'

const enUsendt = jsonDeepCopy(arbeidstaker100Syk)
enUsendt.sykmeldingStatus.statusEvent = 'APEN'
enUsendt.mottattTidspunkt = new Date()
enUsendt.id = 'APEN'

export const enUsendtSykmelding: Persona = {
    soknader: [arbeidstaker],
    sykmeldinger: [arbeidstaker100Syk, enUsendt],
}

const usendt = jsonDeepCopy(arbeidstaker100Syk)
usendt.sykmeldingStatus.statusEvent = 'APEN'
usendt.mottattTidspunkt = new Date()
usendt.id = 'SKAL_IKKE_SENDES_TIL_DENNE'

const eldsteUsendte = jsonDeepCopy(arbeidstaker100Syk)
eldsteUsendte.sykmeldingStatus.statusEvent = 'APEN'
eldsteUsendte.mottattTidspunkt = new Date()
eldsteUsendte.id = 'APEN'
eldsteUsendte.sykmeldingsperioder[0].fom = '2018-04-01' as any

export const toUsendteSykmeldinger: Persona = {
    soknader: [arbeidstaker],
    sykmeldinger: [arbeidstaker100Syk, usendt, eldsteUsendte],
}
