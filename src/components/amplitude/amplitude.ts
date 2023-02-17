import amplitude from 'amplitude-js'
import constate from 'constate'
import { useEffect, useRef } from 'react'

import { TagTyper } from '../../types/enums'
import { Kvittering, Sporsmal } from '../../types/types'
import { amplitudeEnabled } from '../../utils/environment'
import { hentSvar } from '../sporsmal/hent-svar'

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
        | 'readmore åpnet'
        | 'readmore lukket'
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

export const hentAnnonymisertSvar = (sporsmal: Sporsmal): any => {
    const hovedSpmSvar = hentSvar(sporsmal)

    if (sporsmal.tag === TagTyper.KVITTERINGER) {
        return hovedSpmSvar.map((svar: Kvittering) => svar.typeUtgift)
    }

    return hovedSpmSvar
}
