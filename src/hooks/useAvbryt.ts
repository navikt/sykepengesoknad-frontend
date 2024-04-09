import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import fetchMedRequestId, { AuthenticationError, FetchError } from '../utils/fetch'
import { Soknad } from '../types/types'
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus'
import { visFlexjarSurvey } from '../components/flexjar/utils'

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
        onSuccess: async (data, variables) => {
            if (variables.onSuccess) {
                variables.onSuccess()
            }

            if (
                variables.valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ||
                variables.valgtSoknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
            ) {
                await queryClient.invalidateQueries(['soknad', variables.valgtSoknad.id], { refetchType: 'none' })
                await queryClient.invalidateQueries(['soknader'])
                if (variables.valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                    await router.push('/?visSurvey=true')
                } else {
                    await router.push('/')
                }
            } else {
                await queryClient.invalidateQueries(['soknad', variables.valgtSoknad.id])
                queryClient.invalidateQueries(['soknader']).catch()
                await visFlexjarSurvey(router)
            }
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
