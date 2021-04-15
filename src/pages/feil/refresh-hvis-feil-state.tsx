import './refresh-hvis-feil-state.less'

import Alertstripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { oversiktside } from '../../utils/url-utils'
import { setBodyClass } from '../../utils/utils'

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
                <Alertstripe type="feil">{tekst('feilstate.alert')}</Alertstripe>
            </div>
            <div className="knappewrapper">
                <Knapp onClick={() => window.location.reload()}>{tekst('feilstate.refresh')}</Knapp>
            </div>
        </div>
    )
}


export function RefreshHvisFeilState(props: { children: React.ReactNode }) {
    const { feilState } = useAppStore()

    if (feilState) {
        return (<FeilView />)
    }

    return (<>{props.children}</>)
}

