# AGENTS.md - `sykepengesoknad-frontend`
Repoet `sykepengesoknad-frontend` er en React-app for søknader om sykepenger i Nav.

## 1) Kommandoer

Bruk IntelliJ MCP (`execute_run_configuration`) for alle scripts — se **`AGENTS-intellij.md`**. Scripts for referanse:

```sh
npm run dev           # kjør lokalt (mock-backend)
npm run test:ci       # enhetstester uten watch
npm run build         # bygg for produksjon
npm run format        # formater med Prettier + ESLint
npm run play-headless # E2E-tester headless
```

### Før commit (obligatorisk)

Kjør i rekkefølge via `execute_run_configuration`:

1. `format`
2. `test:ci`
3. `play-headless`
4. `build`

## 2) Testing

- Enhet/integrasjon: **Vitest** (`.test.ts` / `.test.tsx`) i `src/`
- E2E: **Playwright** i `playwright/**/*.spec.ts`
- «Kjør tester» betyr alltid begge — `test:ci` **og** `play-headless` via IntelliJ MCP. Spesifiser eksplisitt hvis bare én type ønskes.
- Prioriter tester for endret domenelogikk

### Playwright-mønstre

- Naviger direkte til vedtak med `?testperson=X&id=Y` i URL — unngår `trykkPaVedtakMedId` og `beforeEach`
- Én test per `describe` er normen — slå sammen assertions som krever samme interaksjon
- Selektorer: bruk `getByRole('button', ...)` fremfor `getByText(...)` når det finnes flere treff
- `playwright/utils/` - hjelpefunksjoner for E2E-testing

## 3) Prosjektstruktur

- Pages og API-ruter: `src/pages/` (`*.page.tsx`, `pages/api/**`)
- UI: `src/components/`
- Datahenting/server state: `src/hooks/` (React Query + egne hooks)
- Hjelpefunksjoner: `src/utils/`
- Mock-data i dev: `src/data/testdata/`

Ved nytt backend-endepunkt:
1. Opprett rute i `src/pages/api/{backend}/[[...path]].api.ts`
2. Oppdater `tillatteApier`
3. Behold `beskyttetApi()` + `proxyKallTilBackend()`
4. Hent fra hook med `useQuery()` + `fetchJsonMedRequestId()`

## 4) Kodestil

- All kode, kommentarer og UI-tekst på **norsk bokmål**
- Bruk eksisterende mønstre i koden fremfor nye varianter
- Bruk props-basert dataflyt og hooks (ingen Redux/Zustand)
- Dato-strenger skal parses med `toDate()` (ikke `new Date('YYYY-MM-DD')`)
- I datovelgere: normaliser kalenderdato før sammenligning/lagring (`tilOsloDatoFraDato` / `tilLokalDatoFraDato`)

## 5) Git-workflow

- Egen branch per feature/fix, aldri direkte på `main`
- Hold commit-meldinger korte, beskrivende, én linje, uten punktum
- Ingen conventional commit-prefix og ingen issue-nummer påkrevd

Standard flyt:

```sh
git checkout -b kort-beskrivende-navn
# kjør format, tester og bygg via IntelliJ MCP (se «Før commit» i seksjon 1)
git commit -m "Kort beskrivelse"
git push origin <branch>
```

Opprett PR via GitHub MCP (`create_pull_request`) eller `gh pr create --fill`.

## 6) Grenser (aldri gjør dette)

- Aldri lekke eller logge sensitiv informasjon (fnr, tokens, session-data)
- Aldri hardkode hemmeligheter eller credentials
- Aldri bytt ut `toDate()` med `new Date('YYYY-MM-DD')`
- Aldri innfør ny global state-løsning uten eksplisitt beskjed
- Aldri kall backend direkte fra tilfeldige komponenter når hook/API-mønster finnes
- Aldri fjern sikkerhetsmekanismer i API-ruter (`beskyttetApi`, whitelist)
- Aldri commit med rød format/test/build

## Når du trenger mer kontekst

- `README.md` - prosjektformål og lokal kjøring
- `package.json` - scripts og verktøy som faktisk brukes
- `src/utils/environment.ts` - miljødeteksjon (`isProd()`, `isMockBackend()`)
- `src/pages/api/**/*.api.ts` - API-proxy, whitelist og sikkerhetsmønstre
- `src/hooks/` - anbefalt mønster for datahenting
- `src/utils/dato-utils.ts` - korrekt parsing av dato-strenger
- `playwright/utils/` - hjelpefunksjoner for E2E-testing

## Hurtigsjekk før levering

- [ ] Endringen følger eksisterende mønster i berørte filer
- [ ] Tester er oppdatert der domenelogikk er endret
- [ ] Format, enhetstester, E2E-tester og bygg er grønn (se «Før commit» i seksjon 1)

