import {
    createRemoteJWKSet,
    FlattenedJWSInput,
    JWSHeaderParameters,
    jwtVerify,
} from 'jose'
import { GetKeyFunction } from 'jose/dist/types/types'
import getConfig from 'next/config'
import { Client, Issuer } from 'openid-client'

import { logger } from '../utils/logger'

const { serverRuntimeConfig } = getConfig()

let _issuer: Issuer<Client>
let _remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>

export async function validerLoginserviceToken(token: string | Uint8Array) {
    return jwtVerify(token, await jwks(), {
        issuer: (await issuer()).metadata.issuer,
        audience: serverRuntimeConfig.loginserviceIdportenAudience,
    })
}

async function jwks() {
    if (typeof _remoteJWKSet === 'undefined') {
        const iss = await issuer()
        _remoteJWKSet = createRemoteJWKSet(
            new URL(<string>iss.metadata.jwks_uri)
        )
    }

    return _remoteJWKSet
}

async function issuer() {
    if (typeof _issuer === 'undefined') {
        if (!serverRuntimeConfig.loginserviceIdportenDiscoveryUrl) {
            logger.error(
                'Miljøvariabelen  "LOGINSERVICE_IDPORTEN_DISCOVERY_URL" er ikke satt'
            )
        }
        _issuer = await Issuer.discover(
            serverRuntimeConfig.loginserviceIdportenDiscoveryUrl
        )
    }
    return _issuer
}
