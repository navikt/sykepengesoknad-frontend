# Hvilke land regnes som innenfor EU/EØS i sykepengesøknaden?

## Kort oppsummert

- Sykepengesøknaden har egne lister over land innenfor og utenfor EU/EØS.
- Listene følger Navs regelverk for trygd i EØS og Norden.
- Spørsmål om reise og spørsmål om medlemskap bruker ulike lister, fordi reglene er ulike.

## Hvorfor betyr listene noe?

Når en sykmeldt skal reise, må hen søke Nav om å beholde sykepengene hvis reisen går **utenfor** EU/EØS. Reiser hen **innenfor** EU/EØS, trenger hen ikke å søke.

Landet brukeren velger i søknaden, avgjør derfor om hen får beskjed om å søke.

## Reise: hva regnes som innenfor?

Brukeren trenger ikke søke ved reise til disse landene og områdene:

| Gruppe | Land og områder | Hvorfor |
|---|---|---|
| EU-landene | Alle 27 EU-land | Med i EØS |
| EFTA-landene | Island og Liechtenstein | Med i EØS |
| Sveits | Sveits | Egen avtale som gir samme regler som EØS |
| Storbritannia | Storbritannia, England, Skottland, Wales og Nord-Irland | Egen avtale mellom Norge og Storbritannia |
| Franske områder utenfor Europa | Réunion, Mayotte, Guadeloupe, Martinique, Fransk Guyana og Saint-Martin (Fransk del) | En del av EU |
| Nordiske øyer | Færøyene, Grønland og Åland | Ikke med i EØS, men Nordisk konvensjon om trygd gir samme regler |

## Reise: hva regnes som utenfor?

Brukeren må søke ved reise til alle andre land. Noen områder kan se ut som de hører til et EØS-land, men regnes likevel som utenfor:

| Gruppe | Land og områder | Hvorfor |
|---|---|---|
| Europeiske småstater | Andorra, Monaco, San Marino og Vatikanstaten | Ikke med i EØS |
| Britiske områder | Gibraltar, Jersey, Guernsey og Man | Ikke med i avtalen med Storbritannia |
| Oversjøiske områder | For eksempel Fransk Polynesia, Ny-Caledonia, Saint-Barthélemy, Aruba og Curaçao | Hører til et EU-land, men er ikke en del av EU |
| Norske områder i Antarktis | Bouvetøya | Ikke norsk territorium |

Svalbard og Jan Mayen regnes som Norge og står ikke i listene.

## Medlemskap: hva regnes som utenfor?

Søknaden spør også om brukeren har oppholdt seg «utenfor EU/EØS eller Sveits» det siste året. Svaret brukes til å vurdere om brukeren er medlem i folketrygden.

Her gjelder ikke unntakene for reise. Brukeren kan derfor også velge:

- **Storbritannia** med England, Skottland, Wales og Nord-Irland
- **Færøyene, Grønland og Åland**

Disse er formelt utenfor EØS. Det samsvarer med hvordan systemet som vurderer medlemskap (LovMe), behandler dem.

## Hvorfor hentes ikke listene automatisk?

Nav har et felles register over land (kodeverket). Det inneholder bare de vanlige EØS-landene, ikke områdene og unntakene over. De måtte uansett legges inn for hånd. Derfor ligger listene i søknaden. Andre team i Nav gjør det på samme måte.

## Vedlikehold

Listene oppdateres ikke av seg selv. Hvis et land blir med i eller går ut av EU/EØS, eller reglene endres, må listene oppdateres for hånd. Juristen på teamet bør bekrefte endringer.

Listene ligger i `src/components/sporsmal/landliste.ts`.

## Kilder

- [Navs rundskriv til EØS-avtalens bestemmelser om trygd, kapittel 1](https://lovdata.no/nav/rundskriv/r45-00) (hvilke områder som er med i EØS)
- [Navs rundskriv til Nordisk konvensjon om trygd](https://lovdata.no/nav/rundskriv/r41-00) (Færøyene, Grønland, Åland, Svalbard og Jan Mayen)
- [Navs rundskriv om avtaler mellom Norge og Storbritannia](https://lovdata.no/nav/rundskriv/r20201127-131) (Storbritannia, Gibraltar, Jersey og Man)
- [Landkode.kt i medlemskap-oppslag](https://github.com/navikt/medlemskap-oppslag/blob/main/src/main/kotlin/no/nav/medlemskap/domene/Landkode.kt) (hvordan LovMe behandler EØS-land)
