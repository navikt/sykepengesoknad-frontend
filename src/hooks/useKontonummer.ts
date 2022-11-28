import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import fetchMedRequestId from '../utils/fetch'

export function UseKontonummer() {
    const router = useRouter()
    const testpersonQuery = router.query['testperson']

    const query = () => {
        if (testpersonQuery) {
            return `?testperson=${testpersonQuery}`
        }
        return ''
    }
    return useQuery<string | null, Error>({
        queryKey: ['kontonummer'],
        queryFn: async () => {
            const fetchResult = await fetchMedRequestId(
                '/syk/sykepengesoknad/api/sokos-kontoregister-person/api/borger/v1/hent-aktiv-konto' + query(),
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
