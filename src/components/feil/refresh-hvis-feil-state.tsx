import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { oversiktside } from '../soknad/soknad-link'

export function FeilView() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(oversiktside, { replace: true })
        // eslint-disable-next-line
    }, [])

    return (
        <div className={'bg-white'}>
            <div aria-live="polite">
                <Alert variant="error">
                    <Heading level="1" size="small">
                        {tekst('feilstate.tittel')}
                    </Heading>
                    <BodyShort>{tekst('feilstate.alert')}</BodyShort>
                </Alert>
            </div>
            <div className={'flex justify-center'}>
                <Button className={'mt-4'} variant="secondary" onClick={() => window.location.reload()}>
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
