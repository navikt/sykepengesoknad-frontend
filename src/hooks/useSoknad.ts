import { useQuery } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad } from '../types/types'

export default function useSoknad(id: string) {
    return useQuery<Soknad, Error>(['soknad', id], () =>
        fetchJsonMedRequestId(`/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/${id}`, {
            method: 'GET',
            credentials: 'include',
        }).then((json) => {
            console.log('json', json) // eslint-disable-line
            return new Soknad(json)
        }),
    )
}
