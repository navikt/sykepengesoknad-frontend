import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import { AuthenticationError, FetchError, fetchJsonMedRequestId } from '../utils/fetch'
import { urlTilSoknad } from '../components/soknad/soknad-link'
import { RSSoknad } from '../types/rs-types/rs-soknad'
import { rsToSoknad } from '../types/mapping'

import { useTestpersonQuery } from './useTestpersonQuery'

interface KorrigeringProp {
    id: string
    onSuccess: () => void
}

export function useKorriger() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, KorrigeringProp>({
        mutationFn: (prop) => {
            return fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    prop.id
                }/korriger${testpersonQuery.query()}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        onSuccess: async (data, variables) => {
            const soknad = rsToSoknad(data as RSSoknad)
            queryClient.setQueryData(['soknad', soknad.id], soknad)
            queryClient
                .invalidateQueries({
                    queryKey: ['soknader'],
                })
                .catch()
            variables.onSuccess()
            await router.push(urlTilSoknad(soknad))
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
