import { IncomingHttpHeaders } from 'http'

import { IToggle, getDefinitions, evaluateFlags } from '@unleash/nextjs'
import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext } from 'next/types'
import * as R from 'remeda'
import NodeCache from 'node-cache'

import { isIntegrationtest, isLocalBackend, isMockBackend } from '../utils/environment'

import { getUnleashEnvironment, localDevelopmentToggles } from './utils'
import { EXPECTED_TOGGLES } from './toggles'

export async function getFlagsServerSide(
    req: GetServerSidePropsContext['req'],
    res: GetServerSidePropsContext['res'],
): Promise<{ toggles: IToggle[] }> {
    if (isMockBackend() || isLocalBackend()) {
        if (!isIntegrationtest()) {
            logger.warn('Running in local or demo mode, falling back to development toggles.')
        }
        return { toggles: localDevelopmentToggles() }
    }

    try {
        const { userId } = handleUnleashIds(req, res)
        const definitions = await getAndValidateDefinitions()
        return evaluateFlags(definitions, {
            userId,
            environment: getUnleashEnvironment(),
        })
    } catch (e) {
        logger.error(new Error('Failed to get flags from Unleash. Falling back to default flags.', { cause: e }))
        return {
            toggles: EXPECTED_TOGGLES.map(
                (it): IToggle => ({
                    name: it,
                    variant: {
                        name: 'default',
                        enabled: false,
                    },
                    impressionData: false,
                    enabled: false,
                }),
            ),
        }
    }
}

const unleashCache = new NodeCache({ stdTTL: 15 })

/**
 * If there are any toggles defined in EXPECTED_TOGGLES that are not returned by Unleash, something is out of sync.
 */
async function getAndValidateDefinitions(): Promise<ReturnType<typeof getDefinitions>> {
    if (unleashCache.has('toggles')) {
        const cachedToggles = unleashCache.get<ReturnType<typeof getDefinitions>>('toggles')
        if (cachedToggles != null) {
            return cachedToggles
        }
    }
    const definitions = await getDefinitions({
        url: process.env.UNLEASH_SERVER_API_URL + '/api/client/features',
        token: process.env.UNLEASH_SERVER_API_TOKEN,
        appName: 'sykepengesoknad-frontend',
    })

    unleashCache.set('toggles', definitions)

    const diff = R.difference(
        EXPECTED_TOGGLES,
        R.map(definitions.features, (it) => it.name),
    )

    if (diff.length > 0) {
        logger.error(
            `Difference in expected flags and flags in unleash, expected but not in unleash: ${diff.join(', ')}`,
        )
    }

    return definitions
}

const unleashCookieName = 'sykepengesoknad-frontend-unleash-session-id'

export function handleUnleashIds(
    req: GetServerSidePropsContext['req'],
    res: GetServerSidePropsContext['res'],
): {
    userId: string | undefined
} {
    const pid = parseAuthHeader(req.headers)?.pid ?? undefined

    const harGammelUnleashCookie = req.cookies[unleashCookieName]
    if (harGammelUnleashCookie != null) {
        // Delete the old cookie
        res.setHeader('set-cookie', `${unleashCookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`)
    }
    return {
        userId: pid,
    }
}

function parseAuthHeader(headers: IncomingHttpHeaders): TokenPayload | null {
    if (!headers.authorization) return null

    const accessToken = headers.authorization.replace('Bearer ', '')
    const jwtPayload = accessToken.split('.')[1]

    return JSON.parse(Buffer.from(jwtPayload, 'base64').toString())
}

interface TokenPayload {
    sub: string
    iss: string
    client_amr: string
    pid: string
    token_type: string
    client_id: string
    acr: string
    scope: string
    exp: string
    iat: string
    client_orgno: string
    jti: string
    consumer: {
        authority: string
        ID: string
    }
}
