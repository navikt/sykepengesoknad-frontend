import { Alert } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { Banner } from '../banner/banner'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'

const Vedlikehold = () => {
    useUpdateBreadcrumbs(() => [], [])

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />

            <Alert variant="warning">
                Vi gjør dessverre vedlikehold på denne siden akkurat nå. Vennligst prøv igjen om noen timer.
            </Alert>
        </>
    )
}

export default Vedlikehold
