# sykepengesoknad-frontend
Søknadsdialog for sykepenger. Bruker next.js og designsystemet.


## Kjør lokalt
`npm run dev`


### Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR, så må man sette opp tilgang til GPR med en PAT (personal access token) som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens). Dersom du har en PAT som du bruker for tilgang til maven-packages i github kan du gjenbruke denne.

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

### Playwright UI tester
Krever browsere installert. Kjør: `npx playwright install`



## Dette logges i Amplitude


| brukers handling/logg                                      | skjemanavn | søknadstype | søknadsstatus | spørsmålstag | tekst | svar (hoved) | komponentnavn |
|------------------------------------------------------------|:----------:|:-----------:|:-------------:|:------------:|:-----:|:------------:|:-------------:|
| Åpne skjema                                                |     x      |      x      |       x       |              |       |              |               |
| Fullføre skjema                                            |     x      |      x      |               |              |       |              |               |
| Svare på spørsmål                                          |     x      |      x      |               |      x       |       |      x       |               |
| Åpne/lukke "Om sykepenger"                                 |            |             |               |              |   x   |              |       x       |
| Åpne/lukke "For Arbeidstakere"                             |            |             |               |              |   x   |              |       x       |
| Åpne/lukke "For selvstendig næringsdrivende og frilansere" |            |             |               |              |   x   |              |       x       |
| Åpne/lukke "Opplysninger fra sykmeldingen"                 |            |             |               |      x       |       |              |       x       |
| Åpne hjelpetekst i alle spørsmål untatt noen få            |            |             |               |      x       |       |              |       x       |
| Åpne/lukke "Slik behandler NAV personopplysningene dine"   |            |      x      |               |              |   x   |              |       x       |
| Åpne/lukke "Avslutt og fortsett senere"               |            |      x      |               |              |       |              |       x       |
| Åpne/lukke "Jeg vil slette denne søknaden"         |            |      x      |               |              |       |              |       x       |
| Åpne/lukke "Jeg vil endre svarene i søknaden"              |            |             |               |              |   x   |              |               |
| Navigering i brødsmulesti                                  |            |             |               |              |   x   |              |               |
| Navigering fra/til andre spørsmål via "tilbake" knappen    |            |      x      |               |      x       |   x   |              |               |
| Navigering fra/til andre spørsmål via stegindikator        |            |             |               |      x       |       |              |               |
| Navigering til veiledningen "Hvorfor spør vi om ferie ..." |            |             |               |              |   x   |              |               |
| Klikk på "Gå til eldste søknad"                            |            |             |               |              |   x   |              |       x       |
| Klikk på "Gå til sykmeldingen"                             |            |             |               |              |   x   |              |       x       |
| Klikk på "Gå til sykmeldingene"                            |            |             |               |              |   x   |              |       x       |
| Klikk på "Gå til søknaden"                                 |            |             |               |              |   x   |              |       x       |
| Klikk på "Gå til neste søknad"                             |            |             |               |              |   x   |              |       x       |
| Klikk på "Ferdig" i kvitteringssiden                       |            |      x      |               |              |   x   |              |               |
| Svare survey om helligdager                                |     x      |             |               |              |   x   |      x       |               |
| Ved valideringsfeil                                        |     x      |             |               |      x       |       |              |               |


# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles til flex@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #flex.
