import { useQuery } from 'react-query'

import { RSSoknadmetadata } from '../types/rs-types/rs-soknadmetadata'
import { fetchJsonMedRequestId } from '../utils/fetch'

export default function useSoknader() {
    return useQuery<RSSoknadmetadata[], Error>('soknader', () =>
        fetchJsonMedRequestId('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/metadata', {
            method: 'GET',
            credentials: 'include',
        }).then((json) => json.map((soknadMetadata: any) => new RSSoknadmetadata(soknadMetadata))),
    )
}
