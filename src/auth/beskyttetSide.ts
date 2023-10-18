import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next/types'
import { IToggle } from '@unleash/nextjs'

import metrics, { cleanPathForMetric, shouldLogMetricForPath } from '../metrics'
import { isMockBackend } from '../utils/environment'
import { AuthenticationError } from '../utils/fetch'
import { getFlagsServerSide } from '../toggles/ssr'

import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'

type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<ServerSidePropsResult>>

export interface ServerSidePropsResult {
    toggles: IToggle[]
}

function beskyttetSide(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<typeof handler>> {
        if (isMockBackend()) {
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
        const bearerToken: string | null | undefined = request.headers['authorization']
        if (!bearerToken) {
            if (shouldLogMetricForPath(cleanPath)) {
                metrics.wonderwallRedirect.inc({ path: cleanPath }, 1)
            }
            return wonderwallRedirect
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            if (shouldLogMetricForPath(cleanPath)) {
                metrics.wonderwallRedirect.inc({ path: cleanPath }, 1)
            }
            if (!(e instanceof AuthenticationError)) {
                logger.warn(`Kunne ikke validere token fra ID-porten i beskyttetSide. Error: ${e}.`)
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
