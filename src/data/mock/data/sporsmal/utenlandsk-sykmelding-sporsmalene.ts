import { RSSporsmal } from '../../../../types/rs-types/rs-sporsmal'

export const utenlandskSykmeldingSporsmalene: RSSporsmal[] = [
    {
        id: '54352523',
        tag: 'UTENLANDSK_SYKMELDING_BOSTED',
        sporsmalstekst: `Bor du i utlandet?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        pavirkerAndreSporsmal: false,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: '2543524234234345',
                tag: 'UTENLANDSK_SYKMELDING_CO',
                sporsmalstekst: 'C/O',
                undertekst: null,
                svartype: 'FRITEKST',
                min: null,
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '254342345234sfd5',
                tag: 'UTENLANDSK_SYKMELDING_VEGNAVN',
                sporsmalstekst: 'Vegnavn og husnummer, evt. postboks',
                undertekst: null,
                svartype: 'FRITEKST',
                min: '1',
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '254223435234sfd5',
                tag: 'UTENLANDSK_SYKMELDING_BYGNING',
                sporsmalstekst: 'Bygning',
                undertekst: null,
                svartype: 'FRITEKST',
                min: null,
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '2543523334sfd5',
                tag: 'UTENLANDSK_SYKMELDING_BY',
                sporsmalstekst: 'By / stedsnavn',
                undertekst: null,
                svartype: 'FRITEKST',
                min: null,
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '254352323234sfd5',
                tag: 'UTENLANDSK_SYKMELDING_REGION',
                sporsmalstekst: 'Region',
                undertekst: null,
                svartype: 'FRITEKST',
                min: null,
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '25435234234234sfd5',
                tag: 'UTENLANDSK_SYKMELDING_LAND',
                sporsmalstekst: 'Land',
                undertekst: null,
                svartype: 'FRITEKST',
                min: '1',
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '2543523423423sdfsdf4sfd5',
                tag: 'UTENLANDSK_SYKMELDING_TELEFONNUMMER',
                sporsmalstekst: 'Telefonnummer',
                undertekst: null,
                svartype: 'FRITEKST',
                min: '1',
                max: '100',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '25435234sfd2342345',
                tag: 'UTENLANDSK_SYKMELDING_GYLDIGHET_ADRESSE',
                sporsmalstekst: 'Hvor lenge skal denne adressen brukes?',
                undertekst: 'Du velger selv hvor lenge adressen skal være gyldig, maksimalt 1 år.',
                svartype: 'DATO',
                min: '2023-03-01',
                max: '2024-03-10',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    },
    {
        id: '54352523',
        tag: 'UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE',
        sporsmalstekst: `Utfører du lønnet arbeid utenfor Norge?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        pavirkerAndreSporsmal: false,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: '254352345',
                tag: 'UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST',
                sporsmalstekst: 'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge',
                undertekst: '(f. eks. navn på arbeidsgivere og nærmere informasjon om din yrkesaktivitet i utlandet)\n',
                svartype: 'FRITEKST',
                min: '1',
                max: '200',
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    },
    {
        id: '345435435345345',
        tag: 'UTENLANDSK_SYKMELDING_TRYGD_UTENFOR_NORGE',
        sporsmalstekst: `Har du mottatt sykepenger eller lignende i andre EØS-land i løpet av de siste tre årene?`,
        undertekst: null,
        svartype: 'JA_NEI',
        min: null,
        max: null,
        pavirkerAndreSporsmal: false,
        kriterieForVisningAvUndersporsmal: 'JA',
        svar: [],
        undersporsmal: [
            {
                id: '345345345345',
                tag: 'UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND',
                sporsmalstekst: 'I hvilket land?',
                undertekst: null,
                svartype: 'LAND',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    },
]