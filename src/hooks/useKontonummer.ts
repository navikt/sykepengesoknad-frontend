import { useQuery } from '@tanstack/react-query'

import fetchMedRequestId from '../utils/fetch'

import { useTestpersonQuery } from './useTestpersonQuery'

export function UseKontonummer() {
    const testpersonQuery = useTestpersonQuery()

    return useQuery<string | null, Error>({
        queryKey: ['kontonummer'],
        queryFn: async () => {
            const fetchResult = await fetchMedRequestId(
                '/syk/sykepengesoknad/api/sokos-kontoregister-person/api/borger/v1/hent-aktiv-konto' +
                    testpersonQuery.query(),
                {},
                (response, _, defaultErrorHandler) => {
                    if (response.status == 404) {
                        // Det returneres 404 hvis det ikke ble funnet noe kontonummer.
                        return
                    }
                    defaultErrorHandler()
                },
            )
            if (fetchResult.response.status == 404) {
                return null
            }

            const response = await fetchResult.response.json()
            return response.kontonummer
        },
    })
}
