import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

export function useGjenapne() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, string>({
        mutationFn: (id) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${id}/gjenapne${testpersonQuery.query()}`,
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
            await router.replace(
                {
                    pathname: router.pathname,
                    query: { ...router.query, visSurvey: 'true' },
                },
                undefined,
                { shallow: true },
            )
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
