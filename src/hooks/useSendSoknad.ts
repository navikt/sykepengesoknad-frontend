import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FetchError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'
import { Soknad } from '../types/types'

export function useSendSoknad(valgtSoknad: Soknad) {
    const queryClient = useQueryClient()

    return useMutation<unknown, FetchError>({
        mutationFn: async () => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad.id}/send`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
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
