import { Page } from '@navikt/ds-react'
import React, { useEffect } from 'react'

function NotFound() {
    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.pathname = '/syk/sykepengesoknad'
        }
    }, [])

    return (
        <Page>
            <Page.Block width="xl">
                <div>Fant ikke siden</div>
            </Page.Block>
        </Page>
    )
}

export default NotFound
