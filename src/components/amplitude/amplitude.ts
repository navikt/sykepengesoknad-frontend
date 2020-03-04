import amplitude from 'amplitude-js';
import env from '../../utils/environment';
import { useEffect, useRef } from 'react';
import createUseContext from 'constate';
import { useAppStore } from '../../data/stores/app-store';

export const useAmplitudeInstance = createUseContext(() => {
    const { unleash } = useAppStore();
    const unleashAmplitudeEnabled = unleash['syfo.amplitude'];

    const instance: any = useRef({
        _userAgent: '',
        logEvent: (eventName: string, data?: any) => {
            // eslint-disable-next-line no-console
            if (unleashAmplitudeEnabled) {
                console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}!`);
            }
            return 1;
        },
        init: () => {
            // eslint-disable-next-line no-console
            console.log('Initialiserer mockAmplitude');
        }
    });

    useEffect(() => { 
        if (unleashAmplitudeEnabled && env.amplitudeEnabled) {
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
        );
        instance.current._userAgent = '';
    }, []);


    function logEvent(eventName: string, eventProperties: any) {
        instance.current.logEvent(eventName, eventProperties);
    }

    return {
        logEvent
    }
});
