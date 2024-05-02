import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next/types'
import { IToggle } from '@unleash/nextjs'
import { getToken, validateIdportenToken } from '@navikt/oasis'

import metrics, { cleanPathForMetric, shouldLogMetricForPath } from '../metrics'
import { isLocalBackend, isMockBackend } from '../utils/environment'
import { getFlagsServerSide } from '../toggles/ssr'

type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<ServerSidePropsResult>>

export interface ServerSidePropsResult {
    toggles: IToggle[]
}

function beskyttetSide(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<typeof handler>> {
        if (isMockBackend() || isLocalBackend()) {
            return handler(context)
        }

        const request = context.req

        if (!request) {
            throw new Error('Context is missing request. This should not happen')
        }

        const cleanPath = cleanPathForMetric(request.url!)
        if (shouldLogMetricForPath(cleanPath)) {
            metrics.pageInitialLoadCounter.inc({ path: cleanPath }, 1)
        }

        const wonderwallRedirect = {
            redirect: {
                destination: '/oauth2/login?redirect=/syk/sykepengesoknad' + context.req?.url,
                permanent: false,
            },
        }
        const token = getToken(context.req)
        if (token == null) {
            if (shouldLogMetricForPath(cleanPath)) {
                metrics.wonderwallRedirect.inc({ path: cleanPath }, 1)
            }
            return wonderwallRedirect
        }
        const validationResult = await validateIdportenToken(token)
        if (!validationResult.ok) {
            const error = new Error(
                `Invalid JWT token found (cause: ${validationResult.error.message}, redirecting to login.`,
                { cause: validationResult.error },
            )

            if (validationResult.errorType === 'token expired') {
                logger.warn(error)
            } else {
                logger.error(error)
            }
            if (shouldLogMetricForPath(cleanPath)) {
                metrics.wonderwallRedirect.inc({ path: cleanPath }, 1)
            }

            return wonderwallRedirect
        }
        return handler(context)
    }
}

export const beskyttetSideUtenProps = beskyttetSide(async (context): Promise<{ props: ServerSidePropsResult }> => {
    const flags = await getFlagsServerSide(context.req, context.res)

    return {
        props: { toggles: flags.toggles },
    }
})
