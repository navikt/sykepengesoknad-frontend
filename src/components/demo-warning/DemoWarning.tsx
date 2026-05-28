import { Alert } from '@navikt/ds-react'
import React, { useState } from 'react'
import { differenceInDays, parseISO } from 'date-fns'

import { isOpplaering } from '../../utils/environment'

const DemoWarning = () => {
    const [alertLukket, setAlertLukket] = useState(() => {
        const lukketDato = localStorage.getItem('demo-warning-lukket')
        if (lukketDato) {
            const lagretDato = parseISO(lukketDato)
            const forskjellIDager = differenceInDays(new Date(), lagretDato)

            // Sjekk om det har gått mer enn 14 dager
            return forskjellIDager < 14
        }
        return false
    })
    if (!isOpplaering()) {
        return null
    }
    if (alertLukket) {
        return null
    }

    return (
        <Alert
            role="banner"
            variant="warning"
            closeButton={true}
            onClose={() => {
                setAlertLukket(true)
                localStorage.setItem('demo-warning-lukket', new Date().toISOString())
            }}
        >
            Dette er en demoside og inneholder ikke dine personlige data.
        </Alert>
    )
}

export default DemoWarning
