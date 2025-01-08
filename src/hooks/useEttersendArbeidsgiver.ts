import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

interface EttersendArbeidsgiverProp {
    id: string
    onSuccess: () => void
}

export function useEttersendArbeidsgiver() {
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, EttersendArbeidsgiverProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    prop.id
                }/ettersendTilArbeidsgiver${testpersonQuery.query()}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['soknad', variables.id],
            })
            queryClient
                .invalidateQueries({
                    queryKey: ['mottaker', variables.id],
                })
                .catch()
            queryClient
                .invalidateQueries({
                    queryKey: ['soknader'],
                })
                .catch()
            variables.onSuccess()
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
