import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

interface SlettUndersporsmalProp {
    soknadId: string
    sporsmalId: string
    undersporsmalId: string
}

export function useSlettUndersporsmal() {
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, SlettUndersporsmalProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.soknadId}/sporsmal/${
                    prop.sporsmalId
                }/undersporsmal/${prop.undersporsmalId}${testpersonQuery.query()}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                },
            )
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['soknad', variables.soknadId],
            })
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
