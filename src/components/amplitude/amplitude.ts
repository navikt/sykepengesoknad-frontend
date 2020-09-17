import amplitude from 'amplitude-js'
import constate from 'constate'
import { useEffect, useRef } from 'react'

import env from '../../utils/environment'

export const [ AmplitudeProvider, useAmplitudeInstance ] = constate(() => {

    const instance: any = useRef({
        _userAgent: '',
        logEvent: (eventName: string, data?: any) => {
            // eslint-disable-next-line
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}!`);
            return 1
        },
        init: () => {
            // console.log('Initialiserer mockAmplitude'); // eslint-disable-line
        }
    })

    useEffect(() => {
        if (env.amplitudeEnabled) {
            instance.current = amplitude.getInstance()
        }
        instance.current.init(
            env.amplitudeKey, null, {
                apiEndpoint: 'amplitude.nav.no/collect',
                saveEvents: false,
                includeUtm: true,
                batchEvents: false,
                includeReferrer: true,
                trackingOptions: {
                    city: false,
                    ip_address: false, // eslint-disable-line
                    version_name: false, // eslint-disable-line
                    region: false,
                    country: false,
                    dma: false,
                },
            },
        )
        instance.current._userAgent = ''
        // eslint-disable-next-line
    }, []);

    function logEvent(eventName: string, eventProperties: any) {
        instance.current.logEvent(eventName, eventProperties)
    }

    return { logEvent }
})
