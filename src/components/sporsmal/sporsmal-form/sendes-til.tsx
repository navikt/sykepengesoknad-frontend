import { FormSummary, List } from '@navikt/ds-react'
import React from 'react'

import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { Soknad } from '../../../types/types'
import useMottakerSoknad from '../../../hooks/useMottakerSoknad'

export default function SendesTil({ soknad }: { soknad: Soknad }) {
    const { data: mottaker } = useMottakerSoknad(soknad.id)
    if (!soknad.arbeidsgiver) return null

    let sendTil: string[]
    switch (mottaker) {
        case RSMottaker.ARBEIDSGIVER:
            sendTil = [soknad.arbeidsgiver.navn]
            break
        case RSMottaker.NAV:
            sendTil = ['NAV']
            break
        case RSMottaker.ARBEIDSGIVER_OG_NAV:
            sendTil = ['NAV', soknad.arbeidsgiver.navn]
            break
        default:
            sendTil = []
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>Søknaden sendes til</FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {sendTil.map((mottaker, index) => {
                        return <List.Item key={index}>{mottaker} </List.Item>
                    })}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    )
}
