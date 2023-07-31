import { useQuery } from '@tanstack/react-query'

import { fetchMedRequestId } from '../utils/fetch'

export default function useKvittering(blobId: string | undefined) {
    return useQuery<File, Error>({
        queryKey: ['kvittering', blobId],
        enabled: Boolean(blobId),
        queryFn: async () => {
            const fetchResult = await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/kvittering/${blobId}`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
            const blob = await fetchResult.response.blob()
            return new File([blob], '', { type: blob.type })
        },
    })
}
