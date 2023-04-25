import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { FetchError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'
import { RouteParams } from '../app'

import useSoknad from './useSoknad'

export function useSendSoknad() {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const queryClient = useQueryClient()

    if (!valgtSoknad) {
        throw Error('Skal ha valgt søknad')
    }
    return useMutation<unknown, FetchError>({
        mutationFn: async () =>
            fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/send`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            ),
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
