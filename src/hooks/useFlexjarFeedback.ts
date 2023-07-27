import { useMutation } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { AuthenticationError, fetchJsonMedRequestId } from '../utils/fetch'

export default function UseFlexjarFeedback() {
    return useMutation<unknown, Error, object>({
        mutationFn: async (body) => {
            return await fetchJsonMedRequestId(`/syk/sykepengesoknad/api/flexjar-backend/api/v1/feedback`, {
                body: JSON.stringify(body),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
        },
        onError: (e) => {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
        },
    })
}
