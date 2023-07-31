import { useQuery } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad } from '../types/types'

export default function useSoknad(id: string | undefined, enabled = true) {
    return useQuery<Soknad, Error>({
        queryKey: ['soknad', id],
        enabled: enabled,
        queryFn: () => {
            if (id === undefined && enabled) {
                throw new Error(`Søknad id [${id}] kan ikke være undefined`)
            }
            return fetchJsonMedRequestId(`/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/${id}`, {
                method: 'GET',
                credentials: 'include',
            }).then((json) => new Soknad(json))
        },
    })
}
