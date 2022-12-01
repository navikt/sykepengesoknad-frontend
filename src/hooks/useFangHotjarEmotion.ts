import { useEffect } from 'react'
import { logger } from '@navikt/next-logger'

import { fetchMedRequestId } from '../utils/fetch'

export function useFangHotjarEmotion(): void {
    useEffect(() => {
        ;(XMLHttpRequest as any).callback = (xhr: XMLHttpRequest, body?: Document | XMLHttpRequestBodyInit | null) => {
            window.setTimeout(() => {
                try {
                    const hotjarUrl = 'https://in.hotjar.com/api/v1/client/sites/118350/feedback/'
                    if (!xhr.responseURL.startsWith(hotjarUrl)) {
                        return
                    }
                    if (!body) {
                        return
                    }

                    const parset = JSON.parse(body as string)
                    const emotion = parset.response.emotion + 1
                    const survey = xhr.responseURL.replace(hotjarUrl, '')
                    if (!emotion || !survey) {
                        return
                    }

                    fetchMedRequestId(`/syk/sykepengesoknad/api/flex-hotjar-emotions/api/v1/emotion`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            emotion,
                            survey,
                        }),
                    }).catch((e) => {
                        logger.warn('Feil ved lagring av hotjar emotion', e)
                    })
                } catch (e) {
                    logger.warn('Feil ved parsing av emotion', e)
                }
            }, 1000)
        }
        const oldSend = XMLHttpRequest.prototype.send
        XMLHttpRequest.prototype.send = function (...args) {
            ;(XMLHttpRequest as any).callback(this, args)
            oldSend.apply(this, args)
        }
    }, [])
}
