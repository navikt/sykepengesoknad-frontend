import {
    createRemoteJWKSet,
    FlattenedJWSInput,
    JWSHeaderParameters,
    jwtVerify,
} from 'jose'
import { GetKeyFunction } from 'jose/dist/types/types'
import getConfig from 'next/config'
import { Client, Issuer } from 'openid-client'

const { serverRuntimeConfig } = getConfig()

let _issuer: Issuer<Client>
let _remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>

async function validerToken(token: string | Uint8Array) {
    return jwtVerify(token, await jwks(), {
        issuer: (await issuer()).metadata.issuer,
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
        if (!serverRuntimeConfig.idportenWellKnownUrl)
            throw new Error(
                'Miljøvariabelen "IDPORTEN_WELL_KNOWN_URL" må være satt'
            )
        _issuer = await Issuer.discover(
            serverRuntimeConfig.idportenWellKnownUrl
        )
    }
    return _issuer
}

export async function verifyIdportenAccessToken(bearerToken: string) {
    const token = bearerToken.split(' ')[1]

    const verified = await validerToken(token)

    if (verified.payload.client_id !== serverRuntimeConfig.idportenClientId) {
        throw new Error('client_id matcher ikke min client ID')
    }

    if (verified.payload.acr !== 'Level4') {
        throw new Error('Har ikke acr Level4')
    }
}
