import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { AuthenticationError, FetchError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'

export function useGjenapne() {
    const queryClient = useQueryClient()

    return useMutation<unknown, FetchError, string>({
        mutationFn: (id) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${id}/gjenapne`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        onSuccess: async (data, id) => {
            await queryClient.invalidateQueries(['soknad', id])
            queryClient.invalidateQueries(['soknader']).catch()
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
