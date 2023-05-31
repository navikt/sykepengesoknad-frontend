import { logAmplitudeEvent } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'

import { TagTyper } from '../../types/enums'
import { Kvittering, Sporsmal } from '../../types/types'
import { amplitudeEnabled } from '../../utils/environment'
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
    | 'skjema åpnet'
    | 'skjema fullført'
    | 'skjema spørsmål åpnet'
    | 'skjema spørsmål besvart'
    | 'modal åpnet'
    | 'modal lukket' //Bruk kun navn fra taksonomien

export const logEvent = (eventName: validEventNames, eventData: Record<string, string | boolean>) => {
    if (window) {
        if (amplitudeEnabled()) {
            logAmplitudeEvent({
                origin: 'sykepengesoknad-frontend',
                eventName,
                eventData,
            }).catch((e) => logger.warn(`Feil ved amplitude logging`, e))
        } else {
            // eslint-disable-next-line no-console
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(eventData)}!`)
        }
    }
}

export const hentAnnonymisertSvar = (sporsmal: Sporsmal): any => {
    const hovedSpmSvar = hentSvar(sporsmal)

    if (sporsmal.tag === TagTyper.KVITTERINGER) {
        return hovedSpmSvar.map((svar: Kvittering) => svar.typeUtgift)
    }

    return hovedSpmSvar
}
