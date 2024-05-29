import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'
import { visFlexjarSurvey } from '../components/flexjar/utils'

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
            await visFlexjarSurvey(router)
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
