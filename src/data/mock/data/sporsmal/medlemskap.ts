import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const medlemskapOppholdUtenforNorgeSporsmal: RSSporsmal = {
    id: '38bac721-93cc-3826-93aa-109c87b6f4b9',
    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE',
    sporsmalstekst: 'Har du oppholdt deg utenfor Norge i løpet av de siste 12 månedene?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    pavirkerAndreSporsmal: false,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar: [],
    undersporsmal: [
        {
            id: '07db05c4-604a-3175-8908-84bb63771e12',
            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_GRUPPERING_0',
            sporsmalstekst: null,
            undertekst: null,
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [
                {
                    id: 'f0680855-bca6-34e9-b448-c24729d1c3fb',
                    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_HVOR_0',
                    sporsmalstekst: 'I hvilket land utenfor Norge har du oppholdt deg?',
                    undertekst: null,
                    svartype: 'COMBOBOX_SINGLE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '60e87c19-5c58-3c87-8ab8-3b51c721622c',
                    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_0',
                    sporsmalstekst: 'Hva var årsaken til oppholdet?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: 'aaacd04c-3cf2-3c8b-96bb-bf2ca113c0b1',
                            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_STUDIE_0',
                            sporsmalstekst: 'Studier',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '790bdb06-d1bc-37cc-8eae-bf07cf505351',
                            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_FERIE_0',
                            sporsmalstekst: 'Ferie',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'd8a899c8-0f48-35f7-871e-36364fee5395',
                            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_FORSORG_0',
                            sporsmalstekst: 'Forsørget medfølgende familiemedlem',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                    ],
                },
                {
                    id: '9123697b-3298-3723-a903-610badd31bb0',
                    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_NAAR_0',
                    sporsmalstekst: 'I hvilken periode oppholdt du deg i dette landet?',
                    undertekst: null,
                    svartype: 'PERIODE',
                    min: '2021-08-23',
                    max: '2023-08-23',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
}
export const medlemskapUtførtArbeidUtenforNorgeSporsmal: RSSporsmal = {
    id: '4d2fffab-165b-3aac-b981-ea759a20acd2',
    tag: 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE',
    sporsmalstekst: 'Har du utført arbeid utenfor Norge i løpet av de siste 12 månedene?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    pavirkerAndreSporsmal: false,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar: [],
    undersporsmal: [
        {
            id: '2a7028ca-42b2-36f3-9b91-682879357b1d',
            tag: 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_GRUPPERING_0',
            sporsmalstekst: null,
            undertekst: null,
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [
                {
                    id: 'f95a08e0-baba-3208-9c4f-74a21ecf06f9',
                    tag: 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_HVOR_0',
                    sporsmalstekst: 'I hvilket land utførte du arbeidet?',
                    undertekst: null,
                    svartype: 'COMBOBOX_SINGLE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: 'e0bd8beb-61b2-3f58-8837-18e15d901ec4',
                    tag: 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_ARBEIDSGIVER_0',
                    sporsmalstekst: 'Hvilken arbeidsgiver jobbet du for?',
                    undertekst: null,
                    svartype: 'FRITEKST',
                    min: '1',
                    max: '200',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: 'abe7fbff-bb1e-30b2-a1e4-4e1fe483a49e',
                    tag: 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_NAAR_0',
                    sporsmalstekst: 'I hvilken periode ble arbeidet utført?',
                    undertekst: null,
                    svartype: 'PERIODE',
                    min: '2013-08-23',
                    max: '2024-08-23',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
}
export const medlemskapOppholdUtenforEøsSporsmal: RSSporsmal = {
    id: '9edb831f-4ce2-3ded-9fd7-34eba2e80246',
    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS',
    sporsmalstekst: 'Har du oppholdt deg utenfor EØS i løpet av de siste 12 månedene?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    pavirkerAndreSporsmal: false,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar: [],
    undersporsmal: [
        {
            id: '036c810a-0c01-3ed8-aef4-06b27619e15e',
            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_GRUPPERING_0',
            sporsmalstekst: null,
            undertekst: null,
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [
                {
                    id: '0483b89a-adae-38de-a480-9f63f2d761ab',
                    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_HVOR_0',
                    sporsmalstekst: 'I hvilket land utenfor EØS har du oppholdt deg?',
                    undertekst: null,
                    svartype: 'COMBOBOX_SINGLE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '7a94fd54-4085-30b0-8af3-f9e2d4cc5f5c',
                    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_0',
                    sporsmalstekst: 'Hva var årsaken til oppholdet?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: '66e5e5a1-aad3-3297-a775-a98db1aa42bc',
                            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_STUDIE_0',
                            sporsmalstekst: 'Studier',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '00a6de46-c114-3468-bf1e-20f0b94ed712',
                            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_FERIE_0',
                            sporsmalstekst: 'Ferie',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '4cc7d57b-7016-30f0-8ddb-c7dafcd57ea1',
                            tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_FORSORG_0',
                            sporsmalstekst: 'Forsørget medfølgende familiemedlem',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                    ],
                },
                {
                    id: '8cf01768-b8f4-3000-a94c-319ffcd4fefb',
                    tag: 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_NAAR_0',
                    sporsmalstekst: 'I hvilken periode oppholdt du deg i dette landet?',
                    undertekst: null,
                    svartype: 'PERIODE',
                    min: '2021-08-23',
                    max: '2023-08-23',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
}
export const medlemskapOppholdstillatelseSporsmal: RSSporsmal = {
    id: '508c4c01-befe-3fc3-bd48-f11d331b5ec7',
    tag: 'MEDLEMSKAP_OPPHOLDSTILLATELSE',
    sporsmalstekst: 'Har du oppholdstillatelse fra utlendingsdirektoratet?',
    undertekst: null,
    svartype: 'JA_NEI',
    min: null,
    max: null,
    pavirkerAndreSporsmal: false,
    kriterieForVisningAvUndersporsmal: 'JA',
    svar: [],
    undersporsmal: [
        {
            id: 'b9115f19-2abf-3161-8579-ff3212e10c96',
            tag: 'MEDLEMSKAP_OPPHOLDSTILLATELSE_VEDTAKSDATO',
            sporsmalstekst: 'Når fikk du vedtak om oppholdstillatelse?',
            undertekst: null,
            svartype: 'DATO',
            min: '2013-08-23',
            max: '2023-08-23',
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '40dc5725-0716-34cb-b46e-3eec6c3ca337',
            tag: 'MEDLEMSKAP_OPPHOLDSTILLATELSE_PERMANENT',
            sporsmalstekst: 'Har du fått permanent oppholdstillatelse?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'NEI',
            svar: [],
            undersporsmal: [
                {
                    id: 'a32d4745-80ae-31a8-9614-9c79855c3442',
                    tag: 'MEDLEMSKAP_OPPHOLDSTILLATELSE_PERIODE',
                    sporsmalstekst: 'Hvilken periode har du fått oppholdstillatelse?',
                    undertekst: null,
                    svartype: 'PERIODE',
                    min: '2013-08-23',
                    max: '2033-08-23',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
}