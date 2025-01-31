import { logger } from '@navikt/next-logger'

import { isMockBackend } from './environment'

export const checkJwks = async (): Promise<boolean> => {
    if (isMockBackend()) {
        return true
    }
    const jwksUri = process.env.IDPORTEN_JWKS_URI

    if (!jwksUri) {
        logger.error('Missing IDPORTEN_JWKS_URI environment variable')
        return false
    }

    try {
        const response = await fetch(jwksUri, { method: 'GET' })

        if (response.ok) {
            return true
        } else {
            logger.error(`Failed to contact ${jwksUri}: ${response.status} ${response.statusText}`)
            return false
        }
    } catch (error) {
        logger.error(`Error connecting to ${jwksUri}: ${JSON.stringify(error)}`)
        return false
    }
}
