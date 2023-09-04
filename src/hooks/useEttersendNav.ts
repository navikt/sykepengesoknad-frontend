import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

interface EttersendtNavProp {
    id: string
    onSuccess: () => void
}

export function useEttersendNav() {
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, EttersendtNavProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    prop.id
                }/ettersendTilNav${testpersonQuery.query()}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['soknad', variables.id])
            queryClient.invalidateQueries(['mottaker', variables.id]).catch()
            queryClient.invalidateQueries(['soknader']).catch()
            variables.onSuccess()
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
