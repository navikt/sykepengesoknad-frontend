import type { RSSvar } from '../../../../types/rs-types/rs-svar'
import type { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'
import { formatterPeriode } from './backend-datoformat'

export const feriePermisjonUtland = ({
    fom,
    tom,
    svar = [],
}: {
    readonly fom: string
    readonly tom: string
    readonly svar?: RSSvar[]
}): RSSporsmal => ({
    id: '4935',
    tag: 'FERIE_PERMISJON_UTLAND',
    sporsmalstekst: `Har du hatt ferie, permisjon eller vært utenfor EØS mens du var sykmeldt ${formatterPeriode(fom, tom)}?`,
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar,
    undersporsmal: [
        {
            id: '50345',
            tag: 'FERIE_PERMISJON_UTLAND_HVA',
            sporsmalstekst: 'Kryss av alt som gjelder deg:',
            undertekst: null,
            svartype: 'CHECKBOX_GRUPPE',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [
                ['513254', 'FERIE', 'Jeg tok ut ferie', '525678', 'FERIE_NAR'],
                ['53456', 'PERMISJON', 'Jeg hadde permisjon', '54745', 'PERMISJON_NAR'],
                ['5537', 'UTLAND', 'Jeg var utenfor EØS', '56345', 'UTLAND_NAR'],
            ].map(([barnId, tag, tekst, narId, narTag]) => ({
                id: barnId,
                tag,
                sporsmalstekst: tekst,
                undertekst: null,
                svartype: 'CHECKBOX',
                min: null,
                max: null,
                kriterieForVisningAvUndersporsmal: 'CHECKED',
                svar: [],
                undersporsmal: [
                    {
                        id: narId,
                        tag: narTag,
                        sporsmalstekst: null,
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: fom,
                        max: tom,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            })),
        },
    ],
})
