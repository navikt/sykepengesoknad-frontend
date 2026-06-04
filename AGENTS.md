# AGENTS.md - `spinnsyn-frontend`
Repoet `spinnsyn-frontend` er en React-app for søknader om sykepenger i Nav.

## 1) Kommandoer

```sh
npm run dev
npm run test
npm run test:ci
npm run build
npm run format
npm run play-headless
```

- `npm run dev` bruker mock-backend lokalt (`MOCK_BACKEND=true`)
- Bruk pnpm-ekvivalenter hvis du kjører pnpm lokalt (f.eks. `pnpm build`)

### Før commit (obligatorisk)

```sh
npm run format && npm run test:ci && npm run build
```

## 2) Testing

- Enhet/integrasjon: **Vitest** (`.test.ts` / `.test.tsx`) i `src/`
- E2E: **Playwright** i `playwright/**/*.spec.ts`
- Prioriter tester for endret domenelogikk

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

## 5) Git-workflow

- Egen branch per feature/fix, aldri direkte på `main`
- Hold commit-meldinger korte, beskrivende, én linje, uten punktum
- Ingen conventional commit-prefix og ingen issue-nummer påkrevd

Standard flyt:

```sh
git checkout -b kort-beskrivende-navn
npm run format && npm run test:ci && npm run build
git commit -m "Kort beskrivelse"
git push origin <branch>
gh pr create --fill
```

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

## Hurtigsjekk før levering

- [ ] Endringen følger eksisterende mønster i berørte filer
- [ ] Tester er oppdatert der domenelogikk er endret
- [ ] `npm run format && npm run test:ci && npm run build` er grønn

