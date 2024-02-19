import { useQuery } from '@tanstack/react-query'

import { FetchError, fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad } from '../types/types'
import { rsToSoknad } from '../types/mapping'

import { useTestpersonQuery } from './useTestpersonQuery'

export default function useSoknad(id: string | undefined, enabled = true) {
    const testpersonQuery = useTestpersonQuery()

    return useQuery<Soknad, FetchError>({
        queryKey: ['soknad', id],
        enabled: enabled,
        queryFn: async () => {
            if (id === undefined && enabled) {
                throw new Error(`Søknad id [${id}] kan ikke være undefined`)
            }
            const json = await fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/${id}${testpersonQuery.query()}`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            )
            return rsToSoknad(json)
        },
    })
}
