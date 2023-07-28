import { useQuery } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Sykmelding } from '../types/sykmelding'

import { UseTestpersonQuery } from './useTestpersonQuery'

export default function useSykmeldinger() {
    const testpersonQuery = UseTestpersonQuery()

    return useQuery<Sykmelding[], Error>({
        queryKey: ['sykmeldinger'],
        queryFn: () =>
            fetchJsonMedRequestId(
                '/syk/sykepengesoknad/api/sykmeldinger-backend/api/v2/sykmeldinger' + testpersonQuery.query(),
                {
                    method: 'GET',
                    credentials: 'include',
                },
            ).then((json) => json.map((json: any) => new Sykmelding(json))),
    })
}
