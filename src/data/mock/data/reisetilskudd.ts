import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { arbeidstakerReisetilskudd } from './sykmeldinger'

export const nyttReisetilskudd: RSSoknad = {
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'egenmeldtSykmelding': false,
    'korrigerer': null,
    'korrigertAv': null,
    'sendtTilArbeidsgiverDato': null,
    'soknadPerioder': [ {
        'fom': '2021-02-01',
        'tom': '2021-02-18',
        'grad': 0,
        'sykmeldingstype': 'REISETILSKUDD'
    } ],
    'soknadstype': 'REISETILSKUDD',
    'startSykeforlop': '2021-02-01',
    'sykmeldingUtskrevet': '2021-02-01',
    'id': '3b6d3764-bc4d-4fe2-902d-5097b9e0ce93',
    'status': 'NY',
    'sykmeldingId': arbeidstakerReisetilskudd.id,
    'fom': '2021-02-01',
    'tom': '2021-02-18',
    'opprettetDato': '2021-02-19',
    'sendtTilNAVDato': null,
    'avbruttDato': null,
    'arbeidsgiver': {
        'navn': 'BYGDA SFO',
        'orgnummer': '995816598'
    },
    'sporsmal': [
        {
            'id': '318',
            'tag': 'ANSVARSERKLARING',
            'sporsmalstekst': 'Jeg vet at jeg kan miste retten til reisetilskudd og sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': 'b59b2bea-1d4c-49e7-9e05-351aaf083232',
            'tag': 'TRANSPORT_TIL_DAGLIG',
            'sporsmalstekst': 'Brukte du bil eller offentlig transport til og fra jobben?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': 'e9d8255d-4277-41c2-bc63-904029c71623',
                    'tag': 'TYPE_TRANSPORT',
                    'sporsmalstekst': 'Hva slags type transport bruker du?',
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '0c0d7a32-db1c-41d9-ba2d-cb0e44db208d',
                            'tag': 'BIL_TIL_DAGLIG',
                            'sporsmalstekst': 'Bil',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': 'c56ca825-5993-4a13-bba7-29d592944b20',
                                    'tag': 'KM_HJEM_JOBB',
                                    'sporsmalstekst': 'Hvor mange km er kjøreturen mellom hjemmet ditt og jobben?',
                                    'undertekst': 'km',
                                    'svartype': 'KILOMETER',
                                    'min': '0',
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '96e7c69e-8af5-4b4d-ae10-1d3c19cc29e2',
                            'tag': 'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
                            'sporsmalstekst': 'Offentlig transport',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '5fb4961f-90d5-4893-9821-24b3a68cf3e1',
                                    'tag': 'OFFENTLIG_TRANSPORT_BELOP',
                                    'sporsmalstekst': 'Hvor mye betaler du vanligvis i måneden for offentlig transport?',
                                    'undertekst': 'kr',
                                    'svartype': 'BELOP',
                                    'min': '0',
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'id': '7f8e5fd4-325b-4614-9eb3-39faa2bb511f',
            'tag': 'REISE_MED_BIL',
            'sporsmalstekst': 'Reiste du med egen bil, leiebil eller en kollega til jobben fra 1. februar - 18. mars 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [],
            'undersporsmal': [
                {
                    'id': 'deaac8aa-11b9-4e60-86e2-b90af5cf8b04',
                    'tag': 'BIL_DATOER',
                    'sporsmalstekst': 'Hvilke dager reiste du med bil?',
                    'undertekst': null,
                    'svartype': 'DATOER',
                    'min': '2020-02-01',
                    'max': '2021-03-18',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }, {
                    'id': 'da7d7561-2ef1-4ba5-b89f-8d849ec9c697',
                    'tag': 'BIL_BOMPENGER',
                    'sporsmalstekst': 'Hadde du utgifter til bompenger?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': 'JA',
                    'svar': [],
                    'undersporsmal': [ {
                        'id': '616cc0cb-434e-4114-a68b-b5708e033e9e',
                        'tag': 'BIL_BOMPENGER_BELOP',
                        'sporsmalstekst': 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben i perioden?',
                        'undertekst': 'kr',
                        'svartype': 'BELOP',
                        'min': '0',
                        'max': null,
                        'pavirkerAndreSporsmal': false,
                        'kriterieForVisningAvUndersporsmal': null,
                        'svar': [],
                        'undersporsmal': []
                    } ]
                }
            ]
        },
        {
            'id': 'c5e8e211-d8d1-404d-85a7-d6e073f1fd4b',
            'tag': 'KVITTERINGER',
            'sporsmalstekst': 'Last opp kvitteringer for reiseutgifter til jobben fra 1. februar til 18. mars 2021.',
            'undertekst': null,
            'svartype': 'KVITTERING',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '2723f1dc-a45e-44b1-bb0c-a7caa34a43f2',
            'tag': 'UTBETALING',
            'sporsmalstekst': 'Legger arbeidsgiveren din ut for reisene?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '361',
            'tag': 'VAER_KLAR_OVER_AT',
            'sporsmalstekst': 'Viktig å være klar over:',
            'undertekst': '<ul><li>Retten til reisetilskudd gjelder bare hvis du trenger midlertidig transport til og fra arbeidsstedet på grunn av helseplager.</li><li>Du kan få reisetilskudd hvis du i utgangspunktet har rett til sykepenger.</li><li>NAV kan innhente flere opplysninger som er nødvendige for å behandle søknaden.</li><li>NAV kan holde igjen eller kreve tilbake penger hvis du gir uriktige eller ufullstendige opplysninger.</li><li>Det å gi feil opplysninger kan være straffbart.</li><li>Fristen for å søke reisetilskudd er som hovedregel 3 måneder.</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/reisetilskudd" target="_blank">nav.no/reisetilskudd</a>.</p>',
            'svartype': 'IKKE_RELEVANT',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '362',
            'tag': 'BEKREFT_OPPLYSNINGER',
            'sporsmalstekst': 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }
    ]
}

