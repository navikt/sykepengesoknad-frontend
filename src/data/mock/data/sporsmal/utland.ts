import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './utils/backend-datoformat'

type UtlandValg = {
    readonly fom: string
    readonly tom: string
    readonly periodeTag?: 'PERIODER' | 'UTLAND_NAR'
    readonly periodeTekst?: string | null
    readonly sporsmalstekst?: string
    readonly svar?: RSSvar[]
    readonly inkluderSoktSykepenger?: boolean
    readonly tekstvariant?: 'utenforEos' | 'utenforEuEos'
    readonly informasjonSporsmalstekst?: string | null
    readonly informasjonUndertekst?: string | null
}

export const utland = ({
    fom,
    tom,
    periodeTag = 'PERIODER',
    periodeTekst = 'Når var du utenfor EU/EØS?',
    tekstvariant = 'utenforEos',
    svar = [],
    inkluderSoktSykepenger = false,
    informasjonSporsmalstekst = null,
    informasjonUndertekst = "<p>DENNE SKAL IKKE VISES  I! utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EU/EØS. Du kan likevel <a target='_blank' href='https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland'>søke NAV om å få reise ut av EU/EØS</a> og beholde sykepengene i en begrenset periode.</p>",
}: UtlandValg): RSSporsmal => ({
    id: '687447',
    tag: 'UTLAND',
    sporsmalstekst:
        tekstvariant === 'utenforEuEos'
            ? `Har du vært utenfor EU/EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`
            : `Har du vært utenfor EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '687448',
            tag: periodeTag,
            sporsmalstekst: periodeTekst,
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        ...(inkluderSoktSykepenger
            ? [
                  {
                      id: '687449',
                      tag: 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                      sporsmalstekst: 'Har du søkt om å beholde sykepengene for disse dagene?',
                      undertekst: null,
                      svartype: 'JA_NEI' as const,
                      min: null,
                      max: null,
                      kriterieForVisningAvUndersporsmal: 'NEI' as const,
                      svar: [],
                      undersporsmal: [
                          {
                              id: '687450',
                              tag: 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
                              sporsmalstekst: informasjonSporsmalstekst,
                              undertekst: informasjonUndertekst,
                              svartype: 'IKKE_RELEVANT' as const,
                              min: null,
                              max: null,
                              kriterieForVisningAvUndersporsmal: null,
                              svar: [],
                              undersporsmal: [],
                          },
                      ],
                  },
              ]
            : []),
    ],
})
