import { logAmplitudeEvent } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'

import { Kvittering, Sporsmal } from '../../types/types'
import { amplitudeEnabled, isLocalBackend } from '../../utils/environment'
import { hentSvar } from '../sporsmal/hent-svar'

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

export const logEvent = (eventName: validEventNames, eventData: Record<string, string | boolean | undefined>) => {
    if (window) {
        // Fjern nøkkel-verdi par med verdien undefined fra eventData
        const cleanedEventData = Object.fromEntries(Object.entries(eventData).filter((event) => event[1] !== undefined))

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

export const hentAnnonymisertSvar = (sporsmal: Sporsmal): any => {
    const hovedSpmSvar = hentSvar(sporsmal)

    if (sporsmal.tag === 'KVITTERINGER') {
        return hovedSpmSvar.map((svar: Kvittering) => svar.typeUtgift)
    }

    return hovedSpmSvar
}
