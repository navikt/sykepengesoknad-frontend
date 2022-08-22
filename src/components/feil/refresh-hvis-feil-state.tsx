import { Alert, Button } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { oversiktside } from '../soknad/soknad-link'

export function FeilView() {
    const history = useHistory()

    useEffect(() => {
        history.replace(oversiktside)
        setBodyClass('feil-state')
        // eslint-disable-next-line
    }, [])

    return (
        <div className="limit">
            <div aria-live="polite">
                <Alert variant="error">{tekst('feilstate.alert')}</Alert>
            </div>
            <div className="knappewrapper">
                <Button variant="secondary" onClick={() => window.location.reload()}>
                    {tekst('feilstate.refresh')}
                </Button>
            </div>
        </div>
    )
}

export function RefreshHvisFeilState(props: { children: React.ReactNode }) {
    const { feilState } = useAppStore()

    if (feilState) {
        return <FeilView />
    }

    return <>{props.children}</>
}
