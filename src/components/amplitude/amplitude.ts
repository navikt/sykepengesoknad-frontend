import amplitude from 'amplitude-js'
import constate from 'constate'
import { useEffect, useRef } from 'react'

import { amplitudeEnabled } from '../../utils/environment'

export const [AmplitudeProvider, useAmplitudeInstance] = constate(() => {
    const instance: any = useRef({
        _userAgent: '',
        logEvent: (eventName: string, data?: any) => {
            // eslint-disable-next-line
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}`)
            return 1
        },
        init: () => {
            // console.log('Initialiserer mockAmplitude'); // eslint-disable-line
        },
    })

    useEffect(() => {
        if (amplitudeEnabled()) {
            instance.current = amplitude.getInstance()
        }
        instance.current.init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: true,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
            batchEvents: false,
        })
        // eslint-disable-next-line
    }, [])

    type validEventNames =
        | 'navigere'
        | 'skjema validering feilet'
        | 'alert vist'
        | 'guidepanel vist'
        | 'accordion åpnet'
        | 'accordion lukket'
        | 'knapp klikket'
        | 'skjema åpnet'
        | 'skjema fullført'
        | 'skjema spørsmål besvart'
        | 'modal åpnet'
        | 'modal lukket' //Bruk kun navn fra taksonomien

    function logEvent(eventName: validEventNames, eventProperties: Record<string, any>) {
        instance.current.logEvent(eventName, eventProperties)
    }

    return { logEvent }
})
