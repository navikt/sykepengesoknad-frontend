import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './utils/backend-datoformat'

type ArbeidsledigUtlandValg = {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
}

export const arbeidsledigUtland = ({ fom, tom, svar = [] }: ArbeidsledigUtlandValg): RSSporsmal => ({
    id: '687422',
    tag: 'ARBEIDSLEDIG_UTLAND',
    sporsmalstekst: `Var du på reise utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687423',
            tag: 'UTLAND_NAR',
            sporsmalstekst: 'Når var du utenfor EU/EØS?',
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '687424',
            tag: 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
            sporsmalstekst: 'Har du søkt om å beholde sykepengene for disse dagene?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'NEI',
            svar: [],
            undersporsmal: [
                {
                    id: '687425',
                    tag: 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                    sporsmalstekst: null,
                    undertekst:
                        "<p>DENNE SKAL IKKE VISES  I! utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EU/EØS. Du kan likevel <a target='_blank' href='https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland'>søke NAV om å få reise ut av EU/EØS</a> og beholde sykepengene i en begrenset periode.</p>",
                    svartype: 'IKKE_RELEVANT',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
})
