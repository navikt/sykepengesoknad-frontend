import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

type Uke = {
    readonly id?: string
    readonly fom: string
    readonly tom: string
    readonly sporsmalstekst?: string
    readonly svar?: RSSvar[]
}
type BehandlingsdagerValg = {
    readonly fom: string
    readonly tom: string
    readonly index?: number
    readonly id?: string
    readonly svar?: RSSvar[]
    readonly uker?: readonly Uke[]
}
const standardUker: readonly Uke[] = [
    { id: '687376', fom: '2020-04-01', tom: '2020-04-03', sporsmalstekst: '2020-03-31 - 2020-04-03' },
    { id: '687377', fom: '2020-04-06', tom: '2020-04-10' },
    { id: '687378', fom: '2020-04-13', tom: '2020-04-17' },
    { id: '687379', fom: '2020-04-20', tom: '2020-04-24' },
]
export const enkeltstaendeBehandlingsdager = ({
    fom,
    tom,
    index = 0,
    id = '687375',
    svar = [],
    uker = standardUker,
}: BehandlingsdagerValg): RSSporsmal => ({
    id,
    tag: `ENKELTSTAENDE_BEHANDLINGSDAGER_${index}`,
    sporsmalstekst: `Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
    undertekst: null,
    svartype: 'INFO_BEHANDLINGSDAGER',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: null,
    svar,
    undersporsmal: uker.map((uke, ukeIndex) => ({
        id: uke.id ?? `68737${ukeIndex + 6}`,
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
