import { logAmplitudeEvent } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'

import { amplitudeEnabled, isLocalBackend } from '../../utils/environment'

type validEventNames =
    | 'readmore lukket'
    | 'readmore åpnet'
    | 'navigere'
    | 'skjema validering feilet'
    | 'alert vist'
    | 'guidepanel vist'
    | 'accordion åpnet'
    | 'accordion lukket'
    | 'knapp klikket'
    | 'knapp vist'
    | 'skjema åpnet'
    | 'skjema fullført'
    | 'skjema spørsmål åpnet'
    | 'skjema spørsmål besvart'
    | 'modal åpnet'
    | 'modal lukket'
    | 'expansioncard åpnet'
    | 'expansioncard lukket' //Bruk kun navn fra taksonomien

const godkjenteSvarKeys = ['JA', 'NEI', 'CHECKED', 'UNCHECKED', 'Prosent', 'Timer']

export const logEvent = (eventName: validEventNames, eventData: Record<string, string | boolean | undefined>) => {
    if (window) {
        // Fjern nøkkel-verdi par med verdien undefined fra eventData
        const cleanedEventData = Object.fromEntries(Object.entries(eventData).filter((event) => event[1] !== undefined))
        const svar = cleanedEventData['svar']
        if (svar) {
            // Whitelister svar for å unngå logging av sensitiv informasjon
            if (!godkjenteSvarKeys.includes(svar as string)) {
                cleanedEventData['svar'] = '[redacted]'
                if (isLocalBackend()) {
                    // eslint-disable-next-line no-console
                    console.log('Redacted svar: ', svar)
                }
            }
        }
        if (amplitudeEnabled()) {
            logAmplitudeEvent({
                origin: 'sykepengesoknad-frontend',
                eventName,
                eventData: cleanedEventData,
            }).catch((e) => logger.warn(`Feil ved amplitude logging`, e))
        } else {
            // eslint-disable-next-line no-console
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(cleanedEventData)}`)

            if (isLocalBackend()) {
                let url = window.location.href
                url = url.replace('http://localhost:3000', 'www.nav.no')
                // replace uuid with [redacted]
                url = url.replace(/\/[a-f0-9-]{36}/g, '/[redacted]')

                cleanedEventData['url'] = url

                fetch('http://localhost/api/amplitude', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        event_type: eventName,
                        client_event_time: new Date().toISOString(),
                        event_properties: cleanedEventData,
                    }),
                }).catch((e) => {
                    logger.warn(`Feil ved lokal amplitude logging`, e)
                })
            }
        }
    }
}
