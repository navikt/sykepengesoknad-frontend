import { useQuery } from 'react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { RSSoknad } from '../types/rs-types/rs-soknad'

export default function useSoknad(id: string) {
    return useQuery<RSSoknad, Error>('soknad', () =>
        fetchJsonMedRequestId(`/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknad/${id}`, {
            method: 'GET',
            credentials: 'include',
        }),
    )
}
