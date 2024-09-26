import { useQuery } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { RSMottaker } from '../types/rs-types/rs-mottaker'

export async function mottakerSoknadQueryFn(id: string) {
    const json = await fetchJsonMedRequestId(
        `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${id}/mottaker`,
        {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        },
    )
    return await json.mottaker
}

export default function useMottakerSoknad(id: string, enabled = true) {
    return useQuery<RSMottaker, Error>({
        queryKey: ['mottaker', id],
        enabled: enabled,
        queryFn: () => mottakerSoknadQueryFn(id),
    })
}
