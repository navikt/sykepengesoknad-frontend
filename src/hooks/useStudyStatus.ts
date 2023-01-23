import { useQuery } from '@tanstack/react-query'

export function useStudyStatus(id: string) {
    return useQuery<boolean, Error>({
        queryKey: ['study', id],
        queryFn: async () => {
            const fetchResult = await fetch(`https://api.uxsignals.com/v2/study/id/${id}/active`)

            if (fetchResult.status !== 200 || !fetchResult.ok) {
                return false
            }

            const response = await fetchResult.json()

            return response.active
        },
    })
}
