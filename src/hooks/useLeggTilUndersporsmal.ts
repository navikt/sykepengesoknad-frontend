import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { FetchError, AuthenticationError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'

interface LeggTilUndesporsmalProp {
    soknadId: string
    sporsmalId: string
}
export function useLeggTilUndersporsmal() {
    const queryClient = useQueryClient()

    return useMutation<unknown, FetchError, LeggTilUndesporsmalProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.soknadId}/sporsmal/${prop.sporsmalId}/undersporsmal`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
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