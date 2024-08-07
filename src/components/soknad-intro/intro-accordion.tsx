import { Accordion } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'

export const IntroAccordion = () => {
    return (
        <Accordion className="my-8">
            <Accordion.Item>
                <Accordion.Header>Hvordan behandler vi personopplysninger</Accordion.Header>
                <Accordion.Content>
                    <LenkeMedIkon
                        href="https://www.nav.no/sykepenger-og-personopplysninger"
                        text="Les mer om hvordan NAV behandler personopplysningene dine"
                    />
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                <Accordion.Content>
                    Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser underveis. Søknader som ikke blir
                    sendt inn lagrer vi i 4 måneder før de slettes automatisk.
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}
