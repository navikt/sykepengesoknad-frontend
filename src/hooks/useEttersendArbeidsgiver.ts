import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { AuthenticationError, FetchError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'

interface EttersendArbeidsgiverProp {
    id: string
    onSuccess: () => void
}

export function useEttersendArbeidsgiver() {
    const queryClient = useQueryClient()

    return useMutation<unknown, FetchError, EttersendArbeidsgiverProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.id}/ettersendTilArbeidsgiver`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries(['soknad', variables.id])
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
