import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

interface SlettKvitteringProp {
    soknadId: string
    sporsmalId: string
    svarId: string
    onSuccess: () => void
}

export function useSlettKvittering() {
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, SlettKvitteringProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.soknadId}/sporsmal/${
                    prop.sporsmalId
                }/svar/${prop.svarId}${testpersonQuery.query()}`,
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
            variables.onSuccess()
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
