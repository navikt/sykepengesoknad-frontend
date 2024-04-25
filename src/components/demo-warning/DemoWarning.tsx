import { Alert } from '@navikt/ds-react'
import React, { useState } from 'react'
import dayjs from 'dayjs'

import { isOpplaering } from '../../utils/environment'

const DemoWarning = () => {
    const [alertLukket, setAlertLukket] = useState(() => {
        const lukketDato = localStorage.getItem('demo-warning-lukket')
        if (lukketDato) {
            const lagretDato = dayjs(lukketDato)
            const forskjellIDager = dayjs().diff(lagretDato, 'day')

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
            variant="warning"
            closeButton={true}
            onClose={() => {
                setAlertLukket(true)
                localStorage.setItem('demo-warning-lukket', dayjs().toString())
            }}
        >
            Dette er en demoside og inneholder ikke dine personlige data.
        </Alert>
    )
}

export default DemoWarning
