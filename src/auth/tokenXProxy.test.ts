import { expect } from '@jest/globals'

import { tokenXProxy } from './tokenXProxy'

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ data: 'jada' }),
    } as any)
)

let grantRequest: any

jest.mock('openid-client', () => ({
    Issuer: {
        discover: jest.fn().mockImplementation(() => ({
            metadata: {
                jwks_uri: 'http://exmaple.com/fake-jwks-uri',
                token_endpoint: 'http://ttoken',
            },
            Client: jest.fn().mockImplementation(() => {
                return {
                    grant: jest.fn().mockImplementation((req: any) => {
                        grantRequest = req
                        return {
                            access_token: 'ey.nyttToken',
                        }
                    }),
                    issuer: { metadata: { token_endpoint: 'http://ttoken' } },
                }
            }),
        })),
    },
    errors: {},
}))

jest.mock('next/config', () => ({
    __esModule: true, // this property makes it work
    default: () => {
        return {
            serverRuntimeConfig: {
                tokenXClientId: 'ditt-sykefravaer-client',
                tokenXPrivateJwk: JSON.stringify({}),
                tokenXWellKnownUrl: 'http://well-known',
            },
        }
    },
}))

describe('tokenXProxy', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('kaller backend api med innveksla token', async () => {
        const response = await tokenXProxy({
            url: 'http://backend/url',
            req: {
                method: 'GET',
                headers: {
                    authorization: 'Bearer tokeninn',
                },
            } as any,
            clientId: 'klienten',
            method: 'GET',
        })
        expect(response).toEqual({ data: 'jada' })
        expect(global.fetch).toHaveBeenCalledWith('http://backend/url', {
            headers: { Authorization: 'Bearer ey.nyttToken' },
            method: 'GET',
        })
        expect(grantRequest).toEqual({
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type:
                'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience: 'klienten',
            subject_token: 'tokeninn',
        })
    })
})
