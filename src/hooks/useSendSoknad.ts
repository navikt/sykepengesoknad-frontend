import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { logger } from '@navikt/next-logger'

import Fetch, { AuthenticationError } from '../utils/fetch'
import { RouteParams } from '../app'
import fetchMedRequestId from '../utils/fetch'

import useSoknad from './useSoknad'

export class SendSoknadError extends Error {
    status: number

    constructor(status: number) {
        super()
        this.status = status
    }
}

export function useSendSoknad() {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const queryClient = useQueryClient()

    if (!valgtSoknad) {
        throw Error('Skal ha valgt søknad')
    }
    return useMutation<unknown, SendSoknadError>({
        mutationFn: async () => {
            throw new SendSoknadError(400)
            try {
                await fetchMedRequestId(
                    `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/send`,
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
            } catch (e: any) {
                if (!(e instanceof AuthenticationError)) {
                    logger.warn(e)
                }
                return
            }
        },
        mutationKey: ['sendsoknad'],

        onSuccess: async () => {
            await queryClient.invalidateQueries(['soknad', valgtSoknad.id])

            queryClient.invalidateQueries(['soknader']).catch()

            if (valgtSoknad.korrigerer !== undefined) {
                queryClient.invalidateQueries(['soknad', valgtSoknad.korrigerer]).catch()
            }
        },
    })
}
