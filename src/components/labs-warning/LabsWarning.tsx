import { Alert } from '@navikt/ds-react'
import React from 'react'

import { isOpplaering } from '../../utils/environment'

export const LabsWarning = () => {
    if (!isOpplaering()) {
        return null
    }

    return <Alert variant={'warning'}>Dette er en demoside og inneholder ikke dine personlige data.</Alert>
}
