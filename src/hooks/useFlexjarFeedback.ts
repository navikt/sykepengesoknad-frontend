import { useMutation } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'

export default function UseFlexjarFeedback() {
    return useMutation<unknown, Error, object>({
        mutationKey: ['flexjar-feedback'],
        mutationFn: async (body) => {
            return await fetchJsonMedRequestId(`/syk/sykepengesoknad/api/flexjar-backend/api/v1/feedback`, {
                body: JSON.stringify(body),
                method: 'POST',
            })
        },
    })
}
