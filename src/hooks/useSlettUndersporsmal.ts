import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

interface SlettUndersporsmalProp {
    soknadId: string
    sporsmalId: string
    undersporsmalId: string
}

export function useSlettUndersporsmal() {
    const queryClient = useQueryClient()

    return useMutation<unknown, FetchError, SlettUndersporsmalProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.soknadId}/sporsmal/${prop.sporsmalId}/undersporsmal/${prop.undersporsmalId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                },
            )
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['soknad', variables.soknadId])
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
