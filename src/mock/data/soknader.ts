export const soknader = [
        {
            "id": "25e65716-ae77-4bbf-8183-84a2742dd138",
            "aktorId": "12345678",
            "sykmeldingId": "ddaff965-f514-400e-8e61-3f7b2c753a4b",
            "soknadstype": "ARBEIDSTAKERE",
            "status": "NY",
            "fom": "2019-03-22",
            "tom": "2019-04-08",
            "opprettetDato": "2019-04-09",
            "innsendtDato": null,
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": null,
            "avbruttDato": null,
            "startSykeforlop": "2019-03-22",
            "sykmeldingUtskrevet": "2019-03-31",
            "arbeidsgiver": {
                "navn": "TESTBEDRIFTEN AS",
                "orgnummer": "999888777"
            },
            "korrigerer": null,
            "korrigertAv": null,
            "arbeidssituasjon": "ARBEIDSTAKER",
            "soknadPerioder": [
                {
                    "fom": "2019-03-22",
                    "tom": "2019-03-30",
                    "grad": 50
                },
                {
                    "fom": "2019-03-31",
                    "tom": "2019-04-08",
                    "grad": 100
                }
            ],
            "sporsmal": [
                {
                    "id": "200140",
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
                },
                {
                    "id": "200141",
                    "tag": "EGENMELDINGER",
                    "sporsmalstekst": "Vi har registrert at du ble sykmeldt fredag 22. mars 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 6. - 21. mars 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [
                        {
                            "verdi": "JA",
                            "avgittAv": "TIDLIGERE_SOKNAD"
                        }
                    ],
                    "undersporsmal": [
                        {
                            "id": "200142",
                            "tag": "EGENMELDINGER_NAR",
                            "sporsmalstekst": "Hvilke dager før 22. mars 2019 var du borte fra jobb?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2018-09-22",
                            "max": "2019-03-21",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [
                                {
                                    "verdi": "{\"fom\": \"2019-02-25\", \"tom\": \"2019-02-25\"}",
                                    "avgittAv": "TIDLIGERE_SOKNAD"
                                }
                            ],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "200143",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid hos TESTBEDRIFTEN AS før 9. april 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200144",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-03-22",
                            "max": "2019-04-08",
                            "pavirkerAndreSporsmal": true,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "200145",
                    "tag": "JOBBET_DU_100_PROSENT_0",
                    "sporsmalstekst": "I perioden 31. mars - 8. april 2019 var du 100 % sykmeldt fra TESTBEDRIFTEN AS. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200146",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200147",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 31. mars - 8. april 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "200148",
                                    "tag": "HVOR_MYE_PROSENT_0",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [
                                        {
                                            "verdi": "CHECKED"
                                        }
                                    ],
                                    "undersporsmal": [
                                        {
                                            "id": "200149",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "200150",
                                    "tag": "HVOR_MYE_TIMER_0",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "200151",
                                            "tag": "HVOR_MYE_TIMER_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "200152",
                    "tag": "JOBBET_DU_GRADERT_1",
                    "sporsmalstekst": "I perioden 22. - 30. mars 2019 skulle du jobbe 50 % av ditt normale arbeid hos TESTBEDRIFTEN AS. Jobbet du mer enn dette?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200153",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_1",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200154",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_1",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 22. - 30. mars 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "200155",
                                    "tag": "HVOR_MYE_PROSENT_1",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [
                                        {
                                            "verdi": "CHECKED"
                                        }
                                    ],
                                    "undersporsmal": [
                                        {
                                            "id": "200156",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_1",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "51",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "200157",
                                    "tag": "HVOR_MYE_TIMER_1",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "200158",
                                            "tag": "HVOR_MYE_TIMER_VERDI_1",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "200159",
                    "tag": "FERIE_PERMISJON_UTLAND",
                    "sporsmalstekst": "Har du hatt ferie, permisjon eller oppholdt deg utenfor Norge i perioden 22. mars - 8. april 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200160",
                            "tag": "FERIE_PERMISJON_UTLAND_HVA",
                            "sporsmalstekst": "Kryss av alt som gjelder deg:",
                            "undertekst": null,
                            "svartype": "CHECKBOX_GRUPPE",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "200161",
                                    "tag": "FERIE",
                                    "sporsmalstekst": "Jeg tok ut ferie",
                                    "undertekst": null,
                                    "svartype": "CHECKBOX",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": true,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "200162",
                                            "tag": "FERIE_NAR",
                                            "sporsmalstekst": null,
                                            "undertekst": null,
                                            "svartype": "PERIODER",
                                            "min": "2019-03-22",
                                            "max": "2019-04-08",
                                            "pavirkerAndreSporsmal": true,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "200163",
                                    "tag": "PERMISJON",
                                    "sporsmalstekst": "Jeg hadde permisjon",
                                    "undertekst": null,
                                    "svartype": "CHECKBOX",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "200164",
                                            "tag": "PERMISJON_NAR",
                                            "sporsmalstekst": null,
                                            "undertekst": null,
                                            "svartype": "PERIODER",
                                            "min": "2019-03-22",
                                            "max": "2019-04-08",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "200165",
                                    "tag": "UTLAND",
                                    "sporsmalstekst": "Jeg var utenfor Norge",
                                    "undertekst": null,
                                    "svartype": "CHECKBOX",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": true,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "200166",
                                            "tag": "UTLAND_NAR",
                                            "sporsmalstekst": null,
                                            "undertekst": null,
                                            "svartype": "PERIODER",
                                            "min": "2019-03-22",
                                            "max": "2019-04-08",
                                            "pavirkerAndreSporsmal": true,
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
                    "id": "200167",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du andre inntektskilder enn TESTBEDRIFTEN AS?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200168",
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
                                    "id": "200169",
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
                                            "id": "200170",
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
                                },
                                {
                                    "id": "200171",
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
                                            "id": "200172",
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
                                },
                                {
                                    "id": "200173",
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
                                            "id": "200174",
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
                                },
                                {
                                    "id": "200175",
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
                                            "id": "200176",
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
                                },
                                {
                                    "id": "200177",
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
                                            "id": "200178",
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
                                },
                                {
                                    "id": "200179",
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
                    "id": "200180",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 22. mars - 8. april 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200181",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-04-08",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200182",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "200183",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "200184",
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
            "id": "84974430-4ea1-41fa-a703-6936188496cc",
            "aktorId": "12345678",
            "sykmeldingId": "e9a99b9a-73e3-4998-82d1-063ca70866b2",
            "soknadstype": "SELVSTENDIGE_OG_FRILANSERE",
            "status": "NY",
            "fom": "2019-03-22",
            "tom": "2019-04-08",
            "opprettetDato": "2019-04-09",
            "innsendtDato": null,
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": null,
            "avbruttDato": null,
            "startSykeforlop": null,
            "sykmeldingUtskrevet": null,
            "arbeidsgiver": null,
            "korrigerer": null,
            "korrigertAv": null,
            "arbeidssituasjon": "FRILANSER",
            "soknadPerioder": [
                {
                    "fom": "2019-03-22",
                    "tom": "2019-03-30",
                    "grad": 100
                },
                {
                    "fom": "2019-03-31",
                    "tom": "2019-04-08",
                    "grad": 20
                }
            ],
            "sporsmal": [
                {
                    "id": "200185",
                    "tag": "ANSVARSERKLARING",
                    "sporsmalstekst": "Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart. \n",
                    "undertekst": null,
                    "svartype": "CHECKBOX",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "200186",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid som frilanser før sykmeldingsperioden utløp 8. april 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200187",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-03-22",
                            "max": "2019-04-09",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "200188",
                    "tag": "JOBBET_DU_GRADERT_0",
                    "sporsmalstekst": "I perioden 31. mars - 8. april 2019 skulle du ifølge sykmeldingen jobbe 80% som frilanser. Jobbet du mer enn dette?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200189",
                            "tag": "HVOR_MANGE_TIMER_0",
                            "sporsmalstekst": "Hvor mange timer jobber du normalt per uke som frilanser?",
                            "undertekst": null,
                            "svartype": "TIMER",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200190",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt i denne perioden som frilanser?",
                            "undertekst": null,
                            "svartype": "PROSENT",
                            "min": "81",
                            "max": "99",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "200191",
                    "tag": "JOBBET_DU_100_PROSENT_1",
                    "sporsmalstekst": "I perioden 22. - 30. mars 2019 var du 100% sykmeldt som frilanser. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200192",
                            "tag": "HVOR_MANGE_TIMER_1",
                            "sporsmalstekst": "Hvor mange timer jobber du normalt per uke som frilanser?",
                            "undertekst": null,
                            "svartype": "TIMER",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200193",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_1",
                            "sporsmalstekst": "Hvor mye jobbet du totalt i denne perioden som frilanser?",
                            "undertekst": null,
                            "svartype": "PROSENT",
                            "min": "1",
                            "max": "99",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "200194",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du annen inntekt?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200195",
                            "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                            "sporsmalstekst": "Hvilke inntektskilder har du?",
                            "undertekst": "Du trenger ikke oppgi penger fra NAV",
                            "svartype": "CHECKBOX_GRUPPE",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "200196",
                                    "tag": "INNTEKTSKILDE_ARBEIDSFORHOLD",
                                    "sporsmalstekst": "arbeidsforhold",
                                    "undertekst": null,
                                    "svartype": "CHECKBOX",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "200197",
                                            "tag": "INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
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
                                },
                                {
                                    "id": "200198",
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
                                            "id": "200199",
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
                                },
                                {
                                    "id": "200200",
                                    "tag": "INNTEKTSKILDE_FRILANSER_SELVSTENDIG",
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
                                            "id": "200201",
                                            "tag": "INNTEKTSKILDE_FRILANSER_SELVSTENDIG_ER_DU_SYKMELDT",
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
                                },
                                {
                                    "id": "200202",
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
                    "id": "200203",
                    "tag": "UTLAND",
                    "sporsmalstekst": "Har du oppholdt deg utenfor Norge i perioden 22. mars - 8. april 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200204",
                            "tag": "PERIODER",
                            "sporsmalstekst": "Når var du utenfor Norge?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-03-22",
                            "max": "2019-04-08",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200205",
                            "tag": "UTLANDSOPPHOLD_SOKT_SYKEPENGER",
                            "sporsmalstekst": "Har du søkt om å beholde sykepengene for disse dagene?",
                            "undertekst": null,
                            "svartype": "JA_NEI",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "NEI",
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "200206",
                                    "tag": "IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON",
                                    "sporsmalstekst": null,
                                    "undertekst": "<p>I utgangspunktet kan du bare få sykepenger mens du er i Norge. Du kan likevel <a target=\"_blank\" href=\"https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/sykepenger-ved-utenlandsopphold\">søke NAV om å få reise utenlands</a> og beholde sykepengene i en begrenset periode.",
                                    "svartype": "IKKE_RELEVANT",
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
                    "id": "200207",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 22. mars - 8. april 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200208",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-04-08",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200209",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "200210",
                    "tag": "BEKREFT_OPPLYSNINGER",
                    "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
                    "undertekst": null,
                    "svartype": "CHECKBOX",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "200211",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
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
            "id": "441eaf34-85d5-4bf5-8833-8162a70a78cd",
            "aktorId": "12345678",
            "sykmeldingId": null,
            "soknadstype": "OPPHOLD_UTLAND",
            "status": "NY",
            "fom": null,
            "tom": null,
            "opprettetDato": "2019-04-09",
            "innsendtDato": null,
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": "2019-05-10",
            "avbruttDato": null,
            "startSykeforlop": null,
            "sykmeldingUtskrevet": null,
            "arbeidsgiver": null,
            "korrigerer": null,
            "korrigertAv": null,
            "arbeidssituasjon": null,
            "soknadPerioder": [],
            "sporsmal": [
                {
                    "id": "200212",
                    "tag": "PERIODEUTLAND",
                    "sporsmalstekst": "Når skal du være utenfor Norge?",
                    "undertekst": null,
                    "svartype": "PERIODER",
                    "min": "2019-01-09",
                    "max": "2019-10-09",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "200213",
                    "tag": "LAND",
                    "sporsmalstekst": "Hvilket land skal du reise til?",
                    "undertekst": null,
                    "svartype": "LAND",
                    "min": null,
                    "max": "50",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "200214",
                    "tag": "ARBEIDSGIVER",
                    "sporsmalstekst": "Har du arbeidsgiver?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200215",
                            "tag": "SYKMELDINGSGRAD",
                            "sporsmalstekst": "Er du 100 % sykmeldt?",
                            "undertekst": null,
                            "svartype": "JA_NEI",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "200216",
                            "tag": "FERIE",
                            "sporsmalstekst": "Har du avtalt med arbeidsgiveren din at du skal ha ferie i hele perioden?",
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
                },
                {
                    "id": "200217",
                    "tag": "BEKREFT_OPPLYSNINGER_UTLAND_INFO",
                    "sporsmalstekst": "Før du reiser ber vi deg bekrefte:",
                    "undertekst": "<ul><li>Jeg har avklart med legen at reisen ikke vil forlenge sykefraværet</li><li>Reisen hindrer ikke planlagt behandling eller avtaler med NAV</li><li>Reisen er avklart med arbeidsgiveren min</li></ul>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "200218",
                            "tag": "BEKREFT_OPPLYSNINGER_UTLAND",
                            "sporsmalstekst": "Jeg bekrefter de tre punktene ovenfor",
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
            ]
        },
        {
            "id": "43aaf8e1-cc98-4786-8348-58cb2c63bb08",
            "aktorId": "12345678",
            "sykmeldingId": "32ef8e34-b84e-4d3f-a1af-cd7797869d51",
            "soknadstype": "ARBEIDSTAKERE",
            "status": "NY",
            "fom": "2019-05-05",
            "tom": "2019-05-13",
            "opprettetDato": "2019-05-14",
            "innsendtDato": null,
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": null,
            "avbruttDato": null,
            "startSykeforlop": "2019-05-02",
            "sykmeldingUtskrevet": "2019-05-05",
            "arbeidsgiver": {
                "navn": "TESTBEDRIFTEN AS",
                "orgnummer": "999888777"
            },
            "korrigerer": null,
            "korrigertAv": null,
            "arbeidssituasjon": "ARBEIDSTAKER",
            "soknadPerioder": [
                {
                    "fom": "2019-05-05",
                    "tom": "2019-05-13",
                    "grad": 100
                }
            ],
            "sporsmal": [
                {
                    "id": "210708",
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
                },
                {
                    "id": "210709",
                    "tag": "EGENMELDINGER",
                    "sporsmalstekst": "Vi har registrert at du ble sykmeldt torsdag 2. mai 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 16. april - 1. mai 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210710",
                            "tag": "EGENMELDINGER_NAR",
                            "sporsmalstekst": "Hvilke dager før 2. mai 2019 var du borte fra jobb?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2018-11-02",
                            "max": "2019-05-01",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210711",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid hos TESTBEDRIFTEN AS før 14. mai 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210712",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-05-05",
                            "max": "2019-05-13",
                            "pavirkerAndreSporsmal": true,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210713",
                    "tag": "JOBBET_DU_100_PROSENT_0",
                    "sporsmalstekst": "I perioden 5. - 13. mai 2019 var du 100 % sykmeldt fra TESTBEDRIFTEN AS. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210714",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210715",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 5. - 13. mai 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "210716",
                                    "tag": "HVOR_MYE_PROSENT_0",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210717",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "210718",
                                    "tag": "HVOR_MYE_TIMER_0",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210719",
                                            "tag": "HVOR_MYE_TIMER_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "210720",
                    "tag": "FERIE_V2",
                    "sporsmalstekst": "Har du tatt ut ferie i perioden 5. - 13. mai 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210721",
                            "tag": "FERIE_NAR_V2",
                            "sporsmalstekst": "Når tok du ut ferie?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-05-05",
                            "max": "2019-05-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210722",
                    "tag": "PERMISJON_V2",
                    "sporsmalstekst": "Har du hatt permisjon i perioden 5. - 13. mai 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210723",
                            "tag": "PERMISJON_NAR_V2",
                            "sporsmalstekst": "Når tok du permisjon?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-05-05",
                            "max": "2019-05-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210724",
                    "tag": "UTLAND_V2",
                    "sporsmalstekst": "Har oppholdt deg i utlandet i perioden 5. - 13. mai 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210725",
                            "tag": "UTLAND_NAR_V2",
                            "sporsmalstekst": "Når var du utenfor Norge?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-05-05",
                            "max": "2019-05-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210726",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du andre inntektskilder enn TESTBEDRIFTEN AS?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210727",
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
                                    "id": "210728",
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
                                            "id": "210729",
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
                                },
                                {
                                    "id": "210730",
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
                                            "id": "210731",
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
                                },
                                {
                                    "id": "210732",
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
                                            "id": "210733",
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
                                },
                                {
                                    "id": "210734",
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
                                            "id": "210735",
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
                                },
                                {
                                    "id": "210736",
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
                                            "id": "210737",
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
                                },
                                {
                                    "id": "210738",
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
                    "id": "210739",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 5. - 13. mai 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210740",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-05-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210741",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "210742",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "210743",
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
            "id": "542fgd88-gh33-4578-6543-23ki2s25bb89",
            "aktorId": "4567895",
            "sykmeldingId": "32ef8e34-b84e-4d3f-a1af-cd7797869d51",
            "soknadstype": "ARBEIDSTAKERE",
            "status": "SENDT",
            "fom": "2019-06-05",
            "tom": "2019-06-13",
            "opprettetDato": "2019-06-14",
            "innsendtDato": "2019-06-15",
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": null,
            "avbruttDato": null,
            "startSykeforlop": "2019-06-02",
            "sykmeldingUtskrevet": "2019-06-05",
            "arbeidsgiver": {
                "navn": "POINTOFNORETURN AS",
                "orgnummer": "345567234"
            },
            "korrigerer": null,
            "korrigertAv": null,
            "arbeidssituasjon": "ARBEIDSTAKER",
            "soknadPerioder": [
                {
                    "fom": "2019-06-05",
                    "tom": "2019-06-13",
                    "grad": 100
                }
            ],
            "sporsmal": [
                {
                    "id": "210708",
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
                },
                {
                    "id": "210709",
                    "tag": "EGENMELDINGER",
                    "sporsmalstekst": "Vi har registrert at du ble sykmeldt torsdag 2. juni 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 16. april - 1. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210710",
                            "tag": "EGENMELDINGER_NAR",
                            "sporsmalstekst": "Hvilke dager før 2. juni 2019 var du borte fra jobb?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2018-12-02",
                            "max": "2019-06-01",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210711",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid hos POINTOFNORETURN AS før 14. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210712",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": true,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210713",
                    "tag": "JOBBET_DU_100_PROSENT_0",
                    "sporsmalstekst": "I perioden 5. - 13. juni 2019 var du 100 % sykmeldt fra POINTOFNORETURN AS. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210714",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210715",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 5. - 13. juni 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "210716",
                                    "tag": "HVOR_MYE_PROSENT_0",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210717",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "210718",
                                    "tag": "HVOR_MYE_TIMER_0",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210719",
                                            "tag": "HVOR_MYE_TIMER_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "210720",
                    "tag": "FERIE_V2",
                    "sporsmalstekst": "Har du tatt ut ferie i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210721",
                            "tag": "FERIE_NAR_V2",
                            "sporsmalstekst": "Når tok du ut ferie?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210722",
                    "tag": "PERMISJON_V2",
                    "sporsmalstekst": "Har du hatt permisjon i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210723",
                            "tag": "PERMISJON_NAR_V2",
                            "sporsmalstekst": "Når tok du permisjon?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210724",
                    "tag": "UTLAND_V2",
                    "sporsmalstekst": "Har oppholdt deg i utlandet i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210725",
                            "tag": "UTLAND_NAR_V2",
                            "sporsmalstekst": "Når var du utenfor Norge?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210726",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du andre inntektskilder enn POINTOFNORETURN AS?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210727",
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
                                    "id": "210728",
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
                                            "id": "210729",
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
                                },
                                {
                                    "id": "210730",
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
                                            "id": "210731",
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
                                },
                                {
                                    "id": "210732",
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
                                            "id": "210733",
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
                                },
                                {
                                    "id": "210734",
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
                                            "id": "210735",
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
                                },
                                {
                                    "id": "210736",
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
                                            "id": "210737",
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
                                },
                                {
                                    "id": "210738",
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
                    "id": "210739",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210740",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210741",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "210742",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "210743",
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
            "id": "384jjd32-df93-3419-5598-44ki5s33bb84",
            "aktorId": "4567895",
            "sykmeldingId": "32ef8e34-b84e-4d3f-a1af-cd7797869d51",
            "soknadstype": "ARBEIDSTAKERE",
            "status": "KORRIGERT",
            "fom": "2019-06-05",
            "tom": "2019-06-13",
            "opprettetDato": "2019-06-14",
            "innsendtDato": "2019-06-15",
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": null,
            "avbruttDato": null,
            "startSykeforlop": "2019-06-02",
            "sykmeldingUtskrevet": "2019-06-05",
            "arbeidsgiver": {
                "navn": "POINTOFNORETURN AS",
                "orgnummer": "345567234"
            },
            "korrigerer": "542fgd88-gh33-4578-6543-23ki2s25bb89",
            "korrigertAv": null,
            "arbeidssituasjon": "ARBEIDSTAKER",
            "soknadPerioder": [
                {
                    "fom": "2019-06-05",
                    "tom": "2019-06-13",
                    "grad": 100
                }
            ],
            "sporsmal": [
                {
                    "id": "210708",
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
                },
                {
                    "id": "210709",
                    "tag": "EGENMELDINGER",
                    "sporsmalstekst": "Vi har registrert at du ble sykmeldt torsdag 2. juni 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 16. april - 1. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210710",
                            "tag": "EGENMELDINGER_NAR",
                            "sporsmalstekst": "Hvilke dager før 2. juni 2019 var du borte fra jobb?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2018-12-02",
                            "max": "2019-06-01",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210711",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid hos POINTOFNORETURN AS før 14. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210712",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": true,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210713",
                    "tag": "JOBBET_DU_100_PROSENT_0",
                    "sporsmalstekst": "I perioden 5. - 13. juni 2019 var du 100 % sykmeldt fra POINTOFNORETURN AS. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210714",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210715",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 5. - 13. juni 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "210716",
                                    "tag": "HVOR_MYE_PROSENT_0",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210717",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "210718",
                                    "tag": "HVOR_MYE_TIMER_0",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210719",
                                            "tag": "HVOR_MYE_TIMER_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "210720",
                    "tag": "FERIE_V2",
                    "sporsmalstekst": "Har du tatt ut ferie i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210721",
                            "tag": "FERIE_NAR_V2",
                            "sporsmalstekst": "Når tok du ut ferie?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210722",
                    "tag": "PERMISJON_V2",
                    "sporsmalstekst": "Har du hatt permisjon i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210723",
                            "tag": "PERMISJON_NAR_V2",
                            "sporsmalstekst": "Når tok du permisjon?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210724",
                    "tag": "UTLAND_V2",
                    "sporsmalstekst": "Har oppholdt deg i utlandet i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210725",
                            "tag": "UTLAND_NAR_V2",
                            "sporsmalstekst": "Når var du utenfor Norge?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210726",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du andre inntektskilder enn POINTOFNORETURN AS?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210727",
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
                                    "id": "210728",
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
                                            "id": "210729",
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
                                },
                                {
                                    "id": "210730",
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
                                            "id": "210731",
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
                                },
                                {
                                    "id": "210732",
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
                                            "id": "210733",
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
                                },
                                {
                                    "id": "210734",
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
                                            "id": "210735",
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
                                },
                                {
                                    "id": "210736",
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
                                            "id": "210737",
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
                                },
                                {
                                    "id": "210738",
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
                    "id": "210739",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210740",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210741",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "210742",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "210743",
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
            "id": "384jjd32-df93-3419-5598-44ki5s33bb84",
            "aktorId": "4567895",
            "sykmeldingId": "32ef8e34-b84e-4d3f-a1af-cd7797869d51",
            "soknadstype": "ARBEIDSTAKERE",
            "status": "AVBRUTT",
            "fom": "2019-06-05",
            "tom": "2019-06-13",
            "opprettetDato": "2019-06-14",
            "innsendtDato": "2019-06-15",
            "sendtTilNAVDato": null,
            "sendtTilArbeidsgiverDato": null,
            "avbruttDato": "2019-05-11",
            "startSykeforlop": "2019-06-02",
            "sykmeldingUtskrevet": "2019-06-05",
            "arbeidsgiver": {
                "navn": "POINTOFNORETURN AS",
                "orgnummer": "345567234"
            },
            "korrigerer": "542fgd88-gh33-4578-6543-23ki2s25bb89",
            "korrigertAv": null,
            "arbeidssituasjon": "ARBEIDSTAKER",
            "soknadPerioder": [
                {
                    "fom": "2019-06-05",
                    "tom": "2019-06-13",
                    "grad": 100
                }
            ],
            "sporsmal": [
                {
                    "id": "210708",
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
                },
                {
                    "id": "210709",
                    "tag": "EGENMELDINGER",
                    "sporsmalstekst": "Vi har registrert at du ble sykmeldt torsdag 2. juni 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 16. april - 1. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210710",
                            "tag": "EGENMELDINGER_NAR",
                            "sporsmalstekst": "Hvilke dager før 2. juni 2019 var du borte fra jobb?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2018-12-02",
                            "max": "2019-06-01",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210711",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid hos POINTOFNORETURN AS før 14. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210712",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": true,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210713",
                    "tag": "JOBBET_DU_100_PROSENT_0",
                    "sporsmalstekst": "I perioden 5. - 13. juni 2019 var du 100 % sykmeldt fra POINTOFNORETURN AS. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210714",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210715",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 5. - 13. juni 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "210716",
                                    "tag": "HVOR_MYE_PROSENT_0",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210717",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "210718",
                                    "tag": "HVOR_MYE_TIMER_0",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210719",
                                            "tag": "HVOR_MYE_TIMER_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "210720",
                    "tag": "FERIE_V2",
                    "sporsmalstekst": "Har du tatt ut ferie i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210721",
                            "tag": "FERIE_NAR_V2",
                            "sporsmalstekst": "Når tok du ut ferie?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210722",
                    "tag": "PERMISJON_V2",
                    "sporsmalstekst": "Har du hatt permisjon i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210723",
                            "tag": "PERMISJON_NAR_V2",
                            "sporsmalstekst": "Når tok du permisjon?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210724",
                    "tag": "UTLAND_V2",
                    "sporsmalstekst": "Har oppholdt deg i utlandet i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210725",
                            "tag": "UTLAND_NAR_V2",
                            "sporsmalstekst": "Når var du utenfor Norge?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210726",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du andre inntektskilder enn POINTOFNORETURN AS?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210727",
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
                                    "id": "210728",
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
                                            "id": "210729",
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
                                },
                                {
                                    "id": "210730",
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
                                            "id": "210731",
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
                                },
                                {
                                    "id": "210732",
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
                                            "id": "210733",
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
                                },
                                {
                                    "id": "210734",
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
                                            "id": "210735",
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
                                },
                                {
                                    "id": "210736",
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
                                            "id": "210737",
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
                                },
                                {
                                    "id": "210738",
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
                    "id": "210739",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210740",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210741",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "210742",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "210743",
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
            "id": "542fgd88-gh33-4578-6543-23ki2s25bb89",
            "aktorId": "4567895",
            "sykmeldingId": "32ef8e34-b84e-4d3f-a1af-cd7797869d51",
            "soknadstype": "ARBEIDSTAKERE",
            "status": "SENDT",
            "fom": "2019-06-05",
            "tom": "2019-06-13",
            "opprettetDato": "2019-06-14",
            "innsendtDato": "2019-06-15",
            "sendtTilNAVDato": "2019-06-05",
            "sendtTilArbeidsgiverDato": "2019-06-09",
            "avbruttDato": null,
            "startSykeforlop": "2019-06-02",
            "sykmeldingUtskrevet": "2019-06-05",
            "arbeidsgiver": {
                "navn": "POINTOFNORETURN AS",
                "orgnummer": "345567234"
            },
            "korrigerer": null,
            "korrigertAv": null,
            "arbeidssituasjon": "ARBEIDSTAKER",
            "soknadPerioder": [
                {
                    "fom": "2019-06-05",
                    "tom": "2019-06-13",
                    "grad": 100
                }
            ],
            "sporsmal": [
                {
                    "id": "210708",
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
                },
                {
                    "id": "210709",
                    "tag": "EGENMELDINGER",
                    "sporsmalstekst": "Vi har registrert at du ble sykmeldt torsdag 2. juni 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 16. april - 1. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210710",
                            "tag": "EGENMELDINGER_NAR",
                            "sporsmalstekst": "Hvilke dager før 2. juni 2019 var du borte fra jobb?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2018-12-02",
                            "max": "2019-06-01",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210711",
                    "tag": "TILBAKE_I_ARBEID",
                    "sporsmalstekst": "Var du tilbake i fullt arbeid hos POINTOFNORETURN AS før 14. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": true,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210712",
                            "tag": "TILBAKE_NAR",
                            "sporsmalstekst": "Når begynte du å jobbe igjen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": true,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210713",
                    "tag": "JOBBET_DU_100_PROSENT_0",
                    "sporsmalstekst": "I perioden 5. - 13. juni 2019 var du 100 % sykmeldt fra POINTOFNORETURN AS. Jobbet du noe i denne perioden?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210714",
                            "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                            "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                            "undertekst": "timer per uke",
                            "svartype": "TALL",
                            "min": "1",
                            "max": "150",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210715",
                            "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                            "sporsmalstekst": "Hvor mye jobbet du totalt 5. - 13. juni 2019 hos TESTBEDRIFTEN AS?",
                            "undertekst": null,
                            "svartype": "RADIO_GRUPPE_TIMER_PROSENT",
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "210716",
                                    "tag": "HVOR_MYE_PROSENT_0",
                                    "sporsmalstekst": "prosent",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210717",
                                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "prosent",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "99",
                                            "pavirkerAndreSporsmal": false,
                                            "kriterieForVisningAvUndersporsmal": null,
                                            "svar": [],
                                            "undersporsmal": []
                                        }
                                    ]
                                },
                                {
                                    "id": "210718",
                                    "tag": "HVOR_MYE_TIMER_0",
                                    "sporsmalstekst": "timer",
                                    "undertekst": null,
                                    "svartype": "RADIO",
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": "CHECKED",
                                    "svar": [],
                                    "undersporsmal": [
                                        {
                                            "id": "210719",
                                            "tag": "HVOR_MYE_TIMER_VERDI_0",
                                            "sporsmalstekst": null,
                                            "undertekst": "timer totalt",
                                            "svartype": "TALL",
                                            "min": "1",
                                            "max": "193",
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
                    "id": "210720",
                    "tag": "FERIE_V2",
                    "sporsmalstekst": "Har du tatt ut ferie i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210721",
                            "tag": "FERIE_NAR_V2",
                            "sporsmalstekst": "Når tok du ut ferie?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210722",
                    "tag": "PERMISJON_V2",
                    "sporsmalstekst": "Har du hatt permisjon i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210723",
                            "tag": "PERMISJON_NAR_V2",
                            "sporsmalstekst": "Når tok du permisjon?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210724",
                    "tag": "UTLAND_V2",
                    "sporsmalstekst": "Har oppholdt deg i utlandet i perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210725",
                            "tag": "UTLAND_NAR_V2",
                            "sporsmalstekst": "Når var du utenfor Norge?",
                            "undertekst": null,
                            "svartype": "PERIODER",
                            "min": "2019-06-05",
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                },
                {
                    "id": "210726",
                    "tag": "ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Har du andre inntektskilder enn POINTOFNORETURN AS?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210727",
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
                                    "id": "210728",
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
                                            "id": "210729",
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
                                },
                                {
                                    "id": "210730",
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
                                            "id": "210731",
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
                                },
                                {
                                    "id": "210732",
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
                                            "id": "210733",
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
                                },
                                {
                                    "id": "210734",
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
                                            "id": "210735",
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
                                },
                                {
                                    "id": "210736",
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
                                            "id": "210737",
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
                                },
                                {
                                    "id": "210738",
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
                    "id": "210739",
                    "tag": "UTDANNING",
                    "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 5. - 13. juni 2019?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "JA",
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "210740",
                            "tag": "UTDANNING_START",
                            "sporsmalstekst": "Når startet du på utdanningen?",
                            "undertekst": null,
                            "svartype": "DATO",
                            "min": null,
                            "max": "2019-06-13",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        },
                        {
                            "id": "210741",
                            "tag": "FULLTIDSSTUDIUM",
                            "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
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
                },
                {
                    "id": "210742",
                    "tag": "VAER_KLAR_OVER_AT",
                    "sporsmalstekst": "Viktig å være klar over:",
                    "undertekst": "<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href=\"https://www.nav.no/sykepenger\" target=\"_blank\">nav.no/sykepenger</a>.</p>",
                    "svartype": "IKKE_RELEVANT",
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "210743",
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
    ]
;
