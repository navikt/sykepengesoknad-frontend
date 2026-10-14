import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'

type UtlandValg = {
    readonly fom: string
    readonly tom: string
    readonly id?: string
    readonly periodeId?: string
    readonly periodeTag?: 'PERIODER' | 'UTLAND_NAR'
    readonly periodeTekst?: string | null
    readonly sporsmalstekst?: string
    readonly svar?: RSSvar[]
    readonly periodeSvar?: RSSvar[]
    readonly ekstraUndersporsmal?: RSSporsmal[]
    readonly inkluderSoktSykepenger?: boolean
    readonly tekstvariant?: 'utenforEos' | 'utenforEuEos'
    readonly soktId?: string
    readonly soktSvar?: RSSvar[]
    readonly informasjonId?: string
    readonly informasjonSporsmalstekst?: string | null
    readonly informasjonUndertekst?: string | null
}

export const utland = ({
    fom,
    tom,
    id = '687447',
    periodeId = '687448',
    periodeTag = 'PERIODER',
    periodeTekst = 'Når var du utenfor EU/EØS?',
    tekstvariant = 'utenforEos',
    svar = [],
    periodeSvar = [],
    ekstraUndersporsmal = [],
    inkluderSoktSykepenger = false,
    soktId = '687449',
    soktSvar = [],
    informasjonId = '687450',
    informasjonSporsmalstekst = null,
    informasjonUndertekst = "<p>DENNE SKAL IKKE VISES  I! utgangspunktet kan du bare få sykepenger mens du er i et land innenfor EU/EØS. Du kan likevel <a target='_blank' href='https://tjenester.nav.no/sykefravaer/sykepengesoknad-utland'>søke NAV om å få reise ut av EU/EØS</a> og beholde sykepengene i en begrenset periode.</p>",
}: UtlandValg): RSSporsmal => ({
    id,
    tag: 'UTLAND',
    sporsmalstekst:
        tekstvariant === 'utenforEuEos'
            ? `Har du vært utenfor EU/EØS mens du var sykmeldt ${tilLesbarPeriodeMedArstall(fom, tom)}?`
            : `Har du vært utenfor EØS mens du var sykmeldt ${tilLesbarPeriodeMedArstall(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: periodeId,
            tag: periodeTag,
            sporsmalstekst: periodeTekst,
            undertekst: null,
            svartype: 'PERIODER',
            min: fom,
            max: tom,
            kriterieForVisningAvUndersporsmal: null,
            svar: periodeSvar,
            undersporsmal: [],
        },
        ...ekstraUndersporsmal,
        ...(inkluderSoktSykepenger
            ? [
                  {
                      id: soktId,
                      tag: 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                      sporsmalstekst: 'Har du søkt om å beholde sykepengene for disse dagene?',
                      undertekst: null,
                      svartype: 'JA_NEI' as const,
                      min: null,
                      max: null,
                      kriterieForVisningAvUndersporsmal: 'NEI' as const,
                      svar: soktSvar,
                      undersporsmal: [
                          {
                              id: informasjonId,
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
