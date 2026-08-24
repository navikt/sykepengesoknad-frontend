import { GlobalAlert } from '@navikt/ds-react'
import React, { useState } from 'react'
import { differenceInDays } from 'date-fns'

import { isOpplaering } from '../../utils/environment'
import { now, toDate } from '../../utils/dato-utils'

const DemoWarning = () => {
    const [alertLukket, setAlertLukket] = useState(() => {
        const lukketDato = localStorage.getItem('demo-warning-lukket')
        if (lukketDato) {
            const lagretDato = toDate(lukketDato)
            const forskjellIDager = differenceInDays(now(), lagretDato)

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
        <GlobalAlert status="warning">
            <GlobalAlert.Header>
                <GlobalAlert.Title>Dette er en demoside og inneholder ikke dine personlige data.</GlobalAlert.Title>
                <GlobalAlert.CloseButton
                    onClick={() => {
                        setAlertLukket(true)
                        localStorage.setItem('demo-warning-lukket', new Date().toISOString())
                    }}
                />
            </GlobalAlert.Header>
        </GlobalAlert>
    )
}

export default DemoWarning
