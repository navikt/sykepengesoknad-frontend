import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

interface SlettKvitteringProp {
    soknadId: string
    sporsmalId: string
    svarId: string
    onSuccess: () => void
}

export function useSlettKvittering() {
    const queryClient = useQueryClient()

    return useMutation<unknown, FetchError, SlettKvitteringProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.soknadId}/sporsmal/${prop.sporsmalId}/svar/${prop.svarId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                },
            )
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['soknad', variables.soknadId])
            variables.onSuccess()
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
