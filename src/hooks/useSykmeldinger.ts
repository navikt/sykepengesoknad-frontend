import { useQuery } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { AuthenticationError, fetchJsonMedRequestId } from '../utils/fetch'
import { Sykmelding } from '../types/sykmelding'

export default function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>({
        queryKey: ['sykmeldinger'],
        queryFn: () =>
            fetchJsonMedRequestId('/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger', {
                method: 'GET',
                credentials: 'include',
            }).then((json) => json.map((json: any) => new Sykmelding(json))),
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
