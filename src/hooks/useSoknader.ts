import { useQuery } from '@tanstack/react-query'

import { RSSoknadmetadata } from '../types/rs-types/rs-soknadmetadata'
import { fetchJsonMedRequestId } from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

export default function useSoknader() {
    const testpersonQuery = useTestpersonQuery()

    return useQuery<RSSoknadmetadata[], Error>({
        queryKey: ['soknader'],
        queryFn: () =>
            fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/metadata${testpersonQuery.query()}`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            ).then((json) => json.map((soknadMetadata: any) => new RSSoknadmetadata(soknadMetadata))),
    })
}
