import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import { AuthenticationError, FetchError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'
import { Soknad } from '../types/types'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'

interface AvbrytProp {
    valgtSoknad: Soknad
    onSuccess?: () => void
}

export function useAvbryt() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<unknown, FetchError, AvbrytProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${prop.valgtSoknad.id}/avbryt`,
                {
                    method: 'POST',
                    credentials: 'include',
                },
            )
        },
        onSuccess: async (data, variables) => {
            if (variables.onSuccess) {
                variables.onSuccess()
            }

            if (
                variables.valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ||
                variables.valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
            ) {
                await queryClient.invalidateQueries(['soknader'])
                await router.push('/')
            } else {
                await queryClient.invalidateQueries(['soknad', variables.valgtSoknad.id])
                queryClient.invalidateQueries(['soknader']).catch()
            }
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}