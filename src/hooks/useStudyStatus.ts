import { useQuery } from '@tanstack/react-query'

import { isIntegrationtest, isLabs } from '../utils/environment'

export function useStudyStatus(id: string) {
    return useQuery<boolean, Error>({
        queryKey: ['study', id],
        queryFn: async () => {
            if (isIntegrationtest() && !isLabs()) {
                return false
            }

            const fetchResult = await fetch(`https://api.uxsignals.com/v2/study/id/${id}/active`)

            if (fetchResult.status !== 200 || !fetchResult.ok) {
                return false
            }

            const response = await fetchResult.json()

            return response.active
        },
    })
}
