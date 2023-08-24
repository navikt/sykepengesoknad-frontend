import { useQuery } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad } from '../types/types'
import { rsToSoknad } from '../types/mapping'

import { useTestpersonQuery } from './useTestpersonQuery'

export default function useSoknad(id: string | undefined, enabled = true) {
    const testpersonQuery = useTestpersonQuery()

    return useQuery<Soknad, Error>({
        queryKey: ['soknad', id],
        enabled: enabled,
        queryFn: () => {
            if (id === undefined && enabled) {
                throw new Error(`Søknad id [${id}] kan ikke være undefined`)
            }
            return fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/${id}${testpersonQuery.query()}`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            ).then((json) => rsToSoknad(json))
        },
    })
}
