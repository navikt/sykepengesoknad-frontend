import { Alert } from '@navikt/ds-react'
import React from 'react'

const IngenData = () => {
    return (
        <div className="limit">
            <Alert variant="error">
                Vi får akkurat nå ikke hentet alle data.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </Alert>
        </div>
    )
}

export default IngenData
