import * as z from 'zod'

const BoolString = z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true')

// ──────────────────────────────────────────────────────────────────────────────
// Bundled (byggetidspunkt) miljøvariabler
//
// Alle variabler med NEXT_PUBLIC_-prefiks bakes inn i klient-bundelen av
// Next.js ved byggetidspunktet. Disse er tilgjengelige både på server og klient.
//
// Valideringen kjører ved modulinnlasting og feiler TIDLIG (ved bygging)
// dersom påkrevde variabler mangler.
// ──────────────────────────────────────────────────────────────────────────────

const BundledEnvSchema = z.object({
    NEXT_PUBLIC_RUNTIME_ENV: z.enum(['demo', 'dev-gcp', 'prod-gcp']),
    NEXT_PUBLIC_DECORATOR_ENV: z.enum(['dev', 'prod']),
    NEXT_PUBLIC_ASSET_PREFIX: z.string().nullish(),
    NEXT_PUBLIC_MOCK_BACKEND: BoolString,
    NEXT_PUBLIC_LOCAL_BACKEND: BoolString,
    NEXT_PUBLIC_OPPLAERING: BoolString,
    NEXT_PUBLIC_UMAMI_ENABLED: BoolString,
    NEXT_PUBLIC_VEDLIKEHOLD: BoolString,
    NEXT_PUBLIC_SYKEFRAVAER_URL: z.string().url(),
    NEXT_PUBLIC_SYKMELDINGER_URL: z.string().url(),
    NEXT_PUBLIC_MINSIDE_URL: z.string().url(),
    NEXT_PUBLIC_SEND_INN_URL: z.string().url(),
    NEXT_PUBLIC_TELEMETRY_URL: z.string().url().nullish(),
    NEXT_PUBLIC_APP_NAME: z.string().default('sykepengesoknad'),
    NEXT_PUBLIC_VERSION: z.string().nullish(),
})

export type BundledEnv = z.infer<typeof BundledEnvSchema>

export const bundledEnv: BundledEnv = BundledEnvSchema.parse({
    NEXT_PUBLIC_RUNTIME_ENV: process.env.NEXT_PUBLIC_RUNTIME_ENV,
    NEXT_PUBLIC_DECORATOR_ENV: process.env.NEXT_PUBLIC_DECORATOR_ENV,
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    NEXT_PUBLIC_MOCK_BACKEND: process.env.NEXT_PUBLIC_MOCK_BACKEND,
    NEXT_PUBLIC_LOCAL_BACKEND: process.env.NEXT_PUBLIC_LOCAL_BACKEND,
    NEXT_PUBLIC_OPPLAERING: process.env.NEXT_PUBLIC_OPPLAERING,
    NEXT_PUBLIC_UMAMI_ENABLED: process.env.NEXT_PUBLIC_UMAMI_ENABLED,
    NEXT_PUBLIC_VEDLIKEHOLD: process.env.NEXT_PUBLIC_VEDLIKEHOLD,
    NEXT_PUBLIC_SYKEFRAVAER_URL: process.env.NEXT_PUBLIC_SYKEFRAVAER_URL,
    NEXT_PUBLIC_SYKMELDINGER_URL: process.env.NEXT_PUBLIC_SYKMELDINGER_URL,
    NEXT_PUBLIC_MINSIDE_URL: process.env.NEXT_PUBLIC_MINSIDE_URL,
    NEXT_PUBLIC_SEND_INN_URL: process.env.NEXT_PUBLIC_SEND_INN_URL,
    NEXT_PUBLIC_TELEMETRY_URL: process.env.NEXT_PUBLIC_TELEMETRY_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION,
} satisfies Record<keyof BundledEnv, unknown>)

// ──────────────────────────────────────────────────────────────────────────────
// Server-only miljøvariabler
//
// Disse er kun tilgjengelige på serveren og leses ved kjøretid.
// getServerEnv() er lazy — kall den kun i server-side-kode (API-ruter, GSP).
// Valideres ved oppstart via /api/internal/isReady-endepunktet.
// ──────────────────────────────────────────────────────────────────────────────

const ServerEnvSchema = z.object({
    NO_DECORATOR: z.string().optional(),
    SYKMELDINGER_BACKEND_CLIENT_ID: z.string().min(1),
    FLEXJAR_BACKEND_CLIENT_ID: z.string().min(1),
    SYKEPENGESOKNAD_BACKEND_CLIENT_ID: z.string().min(1),
    SYKEPENGESOKNAD_KVITTERINGER_CLIENT_ID: z.string().min(1),
    SOKOS_KONTOREGISTER_PERSON_CLIENT_ID: z.string().min(1),
})

export type ServerEnv = z.infer<typeof ServerEnvSchema>

export function getServerEnv(): ServerEnv {
    return ServerEnvSchema.parse({
        NO_DECORATOR: process.env.NO_DECORATOR,
        SYKMELDINGER_BACKEND_CLIENT_ID: process.env.SYKMELDINGER_BACKEND_CLIENT_ID,
        FLEXJAR_BACKEND_CLIENT_ID: process.env.FLEXJAR_BACKEND_CLIENT_ID,
        SYKEPENGESOKNAD_BACKEND_CLIENT_ID: process.env.SYKEPENGESOKNAD_BACKEND_CLIENT_ID,
        SYKEPENGESOKNAD_KVITTERINGER_CLIENT_ID: process.env.SYKEPENGESOKNAD_KVITTERINGER_CLIENT_ID,
        SOKOS_KONTOREGISTER_PERSON_CLIENT_ID: process.env.SOKOS_KONTOREGISTER_PERSON_CLIENT_ID,
    } satisfies Record<keyof ServerEnv, unknown>)
}
