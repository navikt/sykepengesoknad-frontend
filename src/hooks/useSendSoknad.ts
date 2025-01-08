import { useMutation, useQueryClient } from '@tanstack/react-query'

import fetchMedRequestId, { FetchError } from '../utils/fetch'
import { Soknad } from '../types/types'
import { logEvent } from '../components/amplitude/amplitude'

import { useTestpersonQuery } from './useTestpersonQuery'

export function useSendSoknad() {
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, Soknad>({
        mutationFn: async (soknad) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    soknad.id
                }/send${testpersonQuery.query()}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        mutationKey: ['sendsoknad'],

        onSuccess: async (_, soknad) => {
            await queryClient.invalidateQueries({
                queryKey: ['soknad', soknad.id],
            })

            queryClient
                .invalidateQueries({
                    queryKey: ['soknader'],
                })
                .catch()

            if (soknad.korrigerer !== undefined) {
                queryClient
                    .invalidateQueries({
                        queryKey: ['soknad', soknad.korrigerer],
                    })
                    .catch()
            }
        },
        onError: (e) => {
            logEvent('mutation error', {
                mutation: 'send soknad',
                skjemanavn: 'sykepengesoknad',
                status: e?.status?.toString(),
            })
        },
    })
}
