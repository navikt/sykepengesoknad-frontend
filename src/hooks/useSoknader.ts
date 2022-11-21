import { useQuery } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { RSSoknadmetadata } from '../types/rs-types/rs-soknadmetadata'
import { AuthenticationError, fetchJsonMedRequestId } from '../utils/fetch'

export default function useSoknader() {
    return useQuery<RSSoknadmetadata[], Error>({
        queryKey: ['soknader'],
        queryFn: () =>
            fetchJsonMedRequestId('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/metadata', {
                method: 'GET',
                credentials: 'include',
            }).then((json) => json.map((soknadMetadata: any) => new RSSoknadmetadata(soknadMetadata))),
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
