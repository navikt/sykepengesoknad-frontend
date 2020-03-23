export const soknader: any = [
    {
        "id": "ea02707c-078a-4240-96c4-5a106ef1f99c",
        "sykmeldingId": "2a853bec-d1fd-47c3-84a4-733e45b63b09",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "SENDT",
        "fom": "2019-07-01",
        "tom": "2019-07-21",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": "2020-01-28T11:39:12.838",
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-06-30",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-07-01",
            "tom": "2019-07-21",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654038",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [ { "verdi": "CHECKED", "avgittAv": null } ],
                "undersporsmal": []
            },
            {
                "id": "654039",
                "tag": "FRAVER_FOR_BEHANDLING",
                "sporsmalstekst": "Vi ser at sykmeldingen inneholder behandlingsdager mellom 1. - 21. juli 2019. Var du syk og borte fra jobb før dette, nærmere bestemt 15. - 30. juni 2019?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [ { "verdi": "NEI", "avgittAv": null } ],
                "undersporsmal": [
                    {
                        "id": "654040",
                        "tag": "TIDLIGERE_SYK",
                        "sporsmalstekst": null,
                        "undertekst": null,
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654041",
                                "tag": "TIDLIGERE_EGENMELDING",
                                "sporsmalstekst": "Jeg var syk med egenmelding",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654042",
                                        "tag": "EGENMELDINGER_NAR",
                                        "sporsmalstekst": "Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 1. juli 2019.",
                                        "undertekst": null,
                                        "svartype": "PERIODER",
                                        "min": "2019-01-01",
                                        "max": "2019-06-30",
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654043",
                                "tag": "TIDLIGERE_PAPIRSYKMELDING",
                                "sporsmalstekst": "Jeg var syk med papirsykmelding",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654044",
                                        "tag": "PAPIRSYKMELDING_NAR",
                                        "sporsmalstekst": "Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 1. juli 2019.",
                                        "undertekst": null,
                                        "svartype": "PERIODER",
                                        "min": "2019-01-01",
                                        "max": "2019-06-30",
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "654045",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 21. juli 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654046",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0",
                        "sporsmalstekst": "2019-07-01 - 2019-07-05",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-07-01",
                        "max": "2019-07-05",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654053",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-07-08 - 2019-07-12",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-07-08",
                        "max": "2019-07-12",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654060",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_2",
                        "sporsmalstekst": "2019-07-15 - 2019-07-19",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-07-15",
                        "max": "2019-07-19",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            },
            {
                "id": "654067",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [ { "verdi": "NEI", "avgittAv": null } ],
                "undersporsmal": [
                    {
                        "id": "654068",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654069",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654070",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654071",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654072",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654073",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654074",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654075",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654076",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654077",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654078",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654079",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "654080",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            },
            {
                "id": "654081",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [ { "verdi": "CHECKED", "avgittAv": null } ],
                "undersporsmal": []
            }
        ]
    },
    {
        "id": "474162b3-46ef-4bc2-ab02-79139d168ebc",
        "sykmeldingId": "2a853bec-d1fd-47c3-84a4-733e45b63b09",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "NY",
        "fom": "2019-07-22",
        "tom": "2019-07-30",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": null,
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-06-30",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-07-22",
            "tom": "2019-07-30",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654082",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [ { "verdi": "CHECKED", "avgittAv": null } ],
                "undersporsmal": []
            },
            {
                "id": "654083",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 22. - 30. juli 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654084",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0",
                        "sporsmalstekst": "2019-07-22 - 2019-07-26",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-07-22",
                        "max": "2019-07-26",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654091",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-07-29 - 2019-07-30",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-07-29",
                        "max": "2019-07-30",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            },
            {
                "id": "654095",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [ { "verdi": "NEI", "avgittAv": null } ],
                "undersporsmal": [
                    {
                        "id": "654096",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654097",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654098",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654099",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654100",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654101",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654102",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654103",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654104",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654105",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654106",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654107",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "654108",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            },
            {
                "id": "654109",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }
        ]
    },
    {
        "id": "13dc700e-b89b-4e79-887a-7e53a4089d2f",
        "sykmeldingId": "d5e344b5-284b-4cd5-b083-95bc72af5708",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "NY",
        "fom": "2019-07-31",
        "tom": "2019-08-18",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": null,
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-07-30",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-07-31",
            "tom": "2019-08-18",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654110",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654111",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 31. juli - 18. august 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654112",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0",
                        "sporsmalstekst": "2019-07-31 - 2019-08-02",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-07-31",
                        "max": "2019-08-02",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654117",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-08-05 - 2019-08-09",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-08-05",
                        "max": "2019-08-09",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654124",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_2",
                        "sporsmalstekst": "2019-08-12 - 2019-08-16",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-08-12",
                        "max": "2019-08-16",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            }, {
                "id": "654131",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654132",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654133",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654134",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654135",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654136",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654137",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654138",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654139",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654140",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654141",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654142",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654143",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            }, {
                "id": "654144",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654145",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }
        ]
    },
    {
        "id": "a05bd962-dcec-4530-a9cf-ebc53a580222",
        "sykmeldingId": "d5e344b5-284b-4cd5-b083-95bc72af5708",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "NY",
        "fom": "2019-08-19",
        "tom": "2019-08-31",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": null,
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-07-30",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-08-19",
            "tom": "2019-08-31",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654146",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654147",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 19. - 31. august 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654148",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0",
                        "sporsmalstekst": "2019-08-19 - 2019-08-23",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-08-19",
                        "max": "2019-08-23",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654155",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-08-26 - 2019-08-30",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-08-26",
                        "max": "2019-08-30",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            }, {
                "id": "654162",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654163",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654164",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654165",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654166",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654167",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654168",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654169",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654170",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654171",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654172",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654173",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654174",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            }, {
                "id": "654175",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654176",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }
        ]
    },
    {
        "id": "8984a0be-650b-46b6-814a-ac9cf897a07b",
        "sykmeldingId": "1bb3ac77-11aa-4e78-9dac-82bb42ac7902",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "NY",
        "fom": "2019-09-01",
        "tom": "2019-09-22",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": null,
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-08-31",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-09-01",
            "tom": "2019-09-22",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654177",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654178",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 22. september 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654179",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-09-02 - 2019-09-06",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-09-02",
                        "max": "2019-09-06",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654186",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_2",
                        "sporsmalstekst": "2019-09-09 - 2019-09-13",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-09-09",
                        "max": "2019-09-13",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654193",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_3",
                        "sporsmalstekst": "2019-09-16 - 2019-09-20",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-09-16",
                        "max": "2019-09-20",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            }, {
                "id": "654200",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654201",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654202",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654203",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654204",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654205",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654206",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654207",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654208",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654209",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654210",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654211",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654212",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            }, {
                "id": "654213",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654214",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }
        ]
    },
    {
        "id": "f725cb37-bd56-4011-ad15-d45938176599",
        "sykmeldingId": "1bb3ac77-11aa-4e78-9dac-82bb42ac7902",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "NY",
        "fom": "2019-09-23",
        "tom": "2019-09-30",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": null,
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-08-31",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-09-23",
            "tom": "2019-09-30",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654215",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654216",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 23. - 30. september 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654217",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0",
                        "sporsmalstekst": "2019-09-23 - 2019-09-27",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-09-23",
                        "max": "2019-09-27",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654224",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-09-30",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-09-30",
                        "max": "2019-09-30",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            }, {
                "id": "654227",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654228",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654229",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654230",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654231",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654232",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654233",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654234",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654235",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654236",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654237",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654238",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654239",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            }, {
                "id": "654240",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654241",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }
        ]
    },
    {
        "id": "1e3b93f8-cff5-4e65-b166-0aef0b30f455",
        "sykmeldingId": "571246b3-53cf-4756-b6aa-a85b953f5071",
        "soknadstype": "BEHANDLINGSDAGER",
        "status": "NY",
        "fom": "2019-10-01",
        "tom": "2019-10-28",
        "opprettetDato": "2020-01-28",
        "innsendtDato": null,
        "sendtTilNAVDato": null,
        "sendtTilArbeidsgiverDato": null,
        "avbruttDato": null,
        "startSykeforlop": "2019-07-01",
        "sykmeldingUtskrevet": "2019-09-30",
        "arbeidsgiver": { "navn": "KIRKERÅDET", "orgnummer": "974291339" },
        "korrigerer": null,
        "korrigertAv": null,
        "arbeidssituasjon": "ARBEIDSTAKER",
        "soknadPerioder": [ {
            "fom": "2019-10-01",
            "tom": "2019-10-28",
            "grad": 0,
            "sykmeldingstype": "BEHANDLINGSDAGER"
        } ],
        "sporsmal": [
            {
                "id": "654242",
                "tag": "ANSVARSERKLARING",
                "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654243",
                "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_0",
                "sporsmalstekst": "Hvilke dager måtte du være helt borte fra jobben på grunn av behandling mellom 1. - 28. oktober 2019?",
                "undertekst": null,
                "svartype": "BEHANDLINGSDAGER",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654244",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0",
                        "sporsmalstekst": "2019-10-01 - 2019-10-04",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-10-01",
                        "max": "2019-10-04",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654250",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_1",
                        "sporsmalstekst": "2019-10-07 - 2019-10-11",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-10-07",
                        "max": "2019-10-11",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654257",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_2",
                        "sporsmalstekst": "2019-10-14 - 2019-10-18",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-10-14",
                        "max": "2019-10-18",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654264",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_3",
                        "sporsmalstekst": "2019-10-21 - 2019-10-25",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-10-21",
                        "max": "2019-10-25",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }, {
                        "id": "654271",
                        "tag": "ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_4",
                        "sporsmalstekst": "2019-10-28",
                        "undertekst": null,
                        "svartype": "RADIO_GRUPPE_UKEKALENDER",
                        "min": "2019-10-28",
                        "max": "2019-10-28",
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                    }
                ]
            }, {
                "id": "654274",
                "tag": "ANDRE_INNTEKTSKILDER",
                "sporsmalstekst": "Har du andre inntektskilder enn KIRKERÅDET?",
                "undertekst": null,
                "svartype": "JA_NEI",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": "JA",
                "svar": [],
                "undersporsmal": [
                    {
                        "id": "654275",
                        "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                        "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                        "undertekst": "Du trenger ikke oppgi penger fra NAV",
                        "svartype": "CHECKBOX_GRUPPE",
                        "min": null,
                        "max": null,
                        "pavirkerAndreSporsmal": false,
                        "kriterieForVisningAvUndersporsmal": null,
                        "svar": [],
                        "undersporsmal": [
                            {
                                "id": "654276",
                                "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                                "sporsmalstekst": "andre arbeidsforhold",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654277",
                                        "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654278",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG",
                                "sporsmalstekst": "selvstendig næringsdrivende",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654279",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654280",
                                "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                                "sporsmalstekst": "dagmamma",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654281",
                                        "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654282",
                                "tag": "INNTEKTSKILDE_JORDBRUKER",
                                "sporsmalstekst": "jordbruk / fiske / reindrift",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654283",
                                        "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654284",
                                "tag": "INNTEKTSKILDE_FRILANSER",
                                "sporsmalstekst": "frilanser",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": "CHECKED",
                                "svar": [],
                                "undersporsmal": [
                                    {
                                        "id": "654285",
                                        "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                        "sporsmalstekst": "Er du sykmeldt fra dette?",
                                        "undertekst": null,
                                        "svartype": "JA_NEI",
                                        "min": null,
                                        "max": null,
                                        "pavirkerAndreSporsmal": false,
                                        "kriterieForVisningAvUndersporsmal": null,
                                        "svar": [],
                                        "undersporsmal": []
                                    }
                                ]
                            }, {
                                "id": "654286",
                                "tag": "INNTEKTSKILDE_ANNET",
                                "sporsmalstekst": "annet",
                                "undertekst": null,
                                "svartype": "CHECKBOX",
                                "min": null,
                                "max": null,
                                "pavirkerAndreSporsmal": false,
                                "kriterieForVisningAvUndersporsmal": null,
                                "svar": [],
                                "undersporsmal": []
                            }
                        ]
                    }
                ]
            }, {
                "id": "654287",
                "tag": "VAER_KLAR_OVER_AT",
                "sporsmalstekst": "Viktig å være klar over:",
                "undertekst": "<ul><li>Denne søknaden gjelder hvis selve behandlingen har en slik virkning på deg at du ikke kan jobbe resten av dagen. Grunnen er altså behandlingens effekt, og ikke at du for eksempel måtte bruke arbeidstid.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                "svartype": "IKKE_RELEVANT",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }, {
                "id": "654288",
                "tag": "BEKREFT_OPPLYSNINGER",
                "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                "undertekst": null,
                "svartype": "CHECKBOX_PANEL",
                "min": null,
                "max": null,
                "pavirkerAndreSporsmal": false,
                "kriterieForVisningAvUndersporsmal": null,
                "svar": [],
                "undersporsmal": []
            }
        ]
    }
];
