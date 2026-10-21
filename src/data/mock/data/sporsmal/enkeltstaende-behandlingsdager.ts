import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './utils/backend-datoformat'
import { idMedIndeks } from './utils/id-med-indeks'

type Uke = {
    readonly fom: string
    readonly tom: string
    readonly sporsmalstekst?: string
    readonly svar?: RSSvar[]
}
type BehandlingsdagerValg = {
    readonly fom: string
    readonly tom: string
    readonly index?: number
    readonly svar?: RSSvar[]
    readonly uker?: readonly Uke[]
}
const standardUker: readonly Uke[] = [
    { fom: '2020-04-01', tom: '2020-04-03', sporsmalstekst: '2020-03-31 - 2020-04-03' },
    { fom: '2020-04-06', tom: '2020-04-10' },
    { fom: '2020-04-13', tom: '2020-04-17' },
    { fom: '2020-04-20', tom: '2020-04-24' },
]
export const enkeltstaendeBehandlingsdager = ({
    fom,
    tom,
    index = 0,
    svar = [],
    uker = standardUker,
}: BehandlingsdagerValg): RSSporsmal => ({
    id: idMedIndeks('687375', index),
    tag: `ENKELTSTAENDE_BEHANDLINGSDAGER_${index}`,
    sporsmalstekst: `Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'INFO_BEHANDLINGSDAGER',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: uker.map((uke, ukeIndex) => ({
        id: idMedIndeks(String(687376 + ukeIndex), index),
        tag: `ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_${ukeIndex}`,
        sporsmalstekst: uke.sporsmalstekst ?? `${uke.fom} - ${uke.tom}`,
        undertekst: null,
        svartype: 'RADIO_GRUPPE_UKEKALENDER',
        min: uke.fom,
        max: uke.tom,
        kriterieForVisningAvUndersporsmal: null,
        svar: uke.svar ?? [],
        undersporsmal: [],
    })),
})
