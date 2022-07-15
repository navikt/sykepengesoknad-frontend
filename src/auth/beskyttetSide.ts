import cookie from 'cookie'
import { NextPageContext } from 'next'

import {
    isMockBackend,
    loginServiceRedirectUrl,
    loginServiceUrl,
} from '../utils/environment'
import { logger } from '../utils/logger'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'
import { validerLoginserviceToken } from './verifyLoginserviceAccessToken'

type PageHandler = (context: NextPageContext) => void | Promise<any>

function beskyttetSide(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: NextPageContext
    ): Promise<ReturnType<typeof handler>> {
        if (isMockBackend()) {
            return handler(context)
        }

        const request = context.req
        if (request == null) {
            throw new Error(
                'Context is missing request. This should not happen'
            )
        }
        const skapLoginserviceRedirectUrl = () => {
            if (context.req?.url?.includes('sykepengesoknad-utland')) {
                return loginServiceRedirectUrl() + '/sykepengesoknad-utland'
            }
            return loginServiceRedirectUrl()
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
            return loginserviceRedirect
        }
        try {
            await validerLoginserviceToken(selvbetjeningIdtoken)
        } catch (e) {
            return loginserviceRedirect
        }

        const wonderwallRedirect = {
            redirect: {
                destination:
                    '/oauth2/login?redirect=/syk/sykepengesoknad' +
                    context.req?.url,
                permanent: false,
            },
        }
        const bearerToken: string | null | undefined =
            request.headers['authorization']
        if (!bearerToken) {
            return wonderwallRedirect
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            logger.error('kunne ikke validere idportentoken i beskyttetSide', e)
            return wonderwallRedirect
        }
        return handler(context)
    }
}

export const beskyttetSideUtenProps = beskyttetSide(
    async (ctx): Promise<any> => {
        return {
            props: {},
        }
    }
)
