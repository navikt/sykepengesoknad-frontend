import { Alert } from '@navikt/ds-react'
import React from 'react'

import { isOpplaering } from '../../utils/environment'

import styles from './LabsWarning.module.css'

export const LabsWarning = () => {
    if (!isOpplaering()) {
        return null
    }

    return (
        <Alert className={styles.limit} variant={'warning'}>
            Dette er en demoside og inneholder ikke dine personlige data.
        </Alert>
    )
}
