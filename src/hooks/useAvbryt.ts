import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import fetchMedRequestId, { FetchError } from '../utils/fetch'
import { Soknad } from '../types/types'
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { logEvent } from '../components/amplitude/amplitude'

import { useTestpersonQuery } from './useTestpersonQuery'

interface AvbrytProp {
    valgtSoknad: Soknad
    onSuccess?: () => void
}

export function useAvbryt() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<unknown, FetchError, AvbrytProp>({
        mutationFn: (prop) => {
            return fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    prop.valgtSoknad.id
                }/avbryt${testpersonQuery.query()}`,
                {
                    method: 'POST',
                    credentials: 'include',
                },
            )
        },
        onSuccess: async (_data, variables) => {
            if (variables.onSuccess) {
                variables.onSuccess()
            }

            if (variables.valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
                await queryClient.invalidateQueries(['soknad', variables.valgtSoknad.id], { refetchType: 'none' })
                await queryClient.invalidateQueries(['soknader'])
                await router.push('/')
            } else {
                await queryClient.invalidateQueries(['soknad', variables.valgtSoknad.id])
                queryClient.invalidateQueries(['soknader']).catch()
            }
            if (variables.valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                await router.push(`/avbrutt/${variables.valgtSoknad.id}`)
            }
        },
        onError: (e) => {
            logEvent('mutation error', {
                mutation: 'avbryt soknad',
                skjemanavn: 'sykepengesoknad',
                status: e?.status?.toString(),
            })
        },
    })
}
