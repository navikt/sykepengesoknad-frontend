import { logger } from '@navikt/next-logger'
import cookie from 'cookie'
import { NextPageContext } from 'next'

import metrics, { cleanPathForMetric, shouldLogMetricForPath } from '../metrics'
import { isMockBackend, loginServiceRedirectUrl, loginServiceUrl } from '../utils/environment'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'
import { validerLoginserviceToken } from './verifyLoginserviceAccessToken'

type PageHandler = (context: NextPageContext) => void | Promise<any>

function beskyttetSide(handler: PageHandler) {
    return async function withBearerTokenHandler(context: NextPageContext): Promise<ReturnType<typeof handler>> {
        if (isMockBackend()) {
            return handler(context)
        }

        const request = context.req

        if (request == null) {
            throw new Error('Context is missing request. This should not happen')
        }
        const skapLoginserviceRedirectUrl = () => {
            if (context.req?.url?.includes('sykepengesoknad-utland')) {
                return loginServiceRedirectUrl() + '/sykepengesoknad-utland'
            }
            return loginServiceRedirectUrl()
        }

        const cleanPath = cleanPathForMetric(request.url!)
        if (shouldLogMetricForPath(cleanPath)) {
            metrics.pageInitialLoadCounter.inc({ path: cleanPath }, 1)
        }
        const loginserviceRedirect = {
            redirect: {
                destination: `${loginServiceUrl()}?redirect=${skapLoginserviceRedirectUrl()}`,
                permanent: false,
            },
        }
        const cookies = cookie.parse(context.req?.headers.cookie || '')
        const selvbetjeningIdtoken = cookies['selvbetjening-idtoken']
        if (!selvbetjeningIdtoken) {
            if (shouldLogMetricForPath(cleanPath)) {
                metrics.loginserviceRedirect.inc({ path: cleanPath }, 1)
            }
            return loginserviceRedirect
        }
        try {
            await validerLoginserviceToken(selvbetjeningIdtoken)
        } catch (e) {
            if (shouldLogMetricForPath(cleanPath)) {
                metrics.loginserviceRedirect.inc({ path: cleanPath }, 1)
            }
            return loginserviceRedirect
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
            logger.warn(`Kunne ikke validere token fra ID-porten i beskyttetSide. Error: ${e}.`)
            return wonderwallRedirect
        }
        return handler(context)
    }
}

export const beskyttetSideUtenProps = beskyttetSide(async (): Promise<any> => {
    return {
        props: {},
    }
})
