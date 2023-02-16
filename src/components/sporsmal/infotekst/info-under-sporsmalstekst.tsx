import React from 'react'
import { BodyLong } from '@navikt/ds-react'

import { TagTyper } from '../../../types/enums'
import { Ekspanderbar } from '../../ekspanderbar/ekspanderbar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

export const InfoUnderSporsmalstekst = ({ sporsmal }: SpmProps) => {
    if (sporsmal.tag == TagTyper.TILBAKE_I_ARBEID) {
        return (
            <Ekspanderbar
                title={'Hva betyr dette?'}
                className="intern"
                sporsmalId={sporsmal.id}
                amplitudeProps={{
                    component: 'tittel',
                    sporsmaltag: 'nokkel',
                }}
            >
                <BodyLong>
                    Du kan begynne å jobbe fullt igjen før sykemeldingen er slutt. Vi trenger opplysninger om du var
                    tilbake i fullt arbeid for å beregne hvor mye du skal få utbetalt i sykepenger.
                </BodyLong>
                <BodyLong style={{ marginTop: '1em' }}>
                    <span style={{ textDecoration: 'underline', fontStyle: 'italic' }}>Svar ja</span>, hvis du var fullt
                    tilbake på jobb i løpet av perioden. Dette betyr at du ikke lenger er sykmeldt fra dato du oppgir
                    under.{' '}
                </BodyLong>
                <BodyLong style={{ marginTop: '1em' }}>
                    <span style={{ textDecoration: 'underline', fontStyle: 'italic' }}>Svar nei</span>, dersom du kun
                    var delvis tilbake på jobb i denne perioden. Du vil senere i søknaden bli spurt om hvor mange timer
                    du har jobbet.
                </BodyLong>
            </Ekspanderbar>
        )
    }
    return null
}
