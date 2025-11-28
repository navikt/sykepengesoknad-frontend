import { BodyLong, ExpansionCard, Heading, Label } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekstMedHtml } from '../../utils/html-react-parser-utils'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../umami/umami'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'

const OmReisetilskudd = () => {
    const [open, setOpen] = useState<boolean>(false)

    const tittel = tekst('tilskudd.start.om-reisetilskudd')
    return (
        <ExpansionCard open={open} data-cy="om-reisetilskudd" aria-label={tittel} className="mb-4">
            <ExpansionCard.Header
                onClick={() => {
                    logEvent(open ? 'accordion lukket' : 'accordion åpnet', {
                        component: tittel,
                    })
                    setOpen(!open)
                }}
            >
                <Heading size="small" level="2" className="flex h-full items-center">
                    {tittel}
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Label as="h3" spacing>
                    {tekst('tilskudd.start.hva-dekker')}
                </Label>
                <BodyLong spacing>{tekstMedHtml(tekst('tilskudd.start.hva-dekker-tekst'))}</BodyLong>

                <Label as="h3" spacing>
                    {tekst('tilskudd.start.forste-16')}
                </Label>
                <BodyLong spacing>{tekst('tilskudd.start.forste-16-tekst')}</BodyLong>

                <Label as="h3" spacing>
                    {tekst('tilskudd.start.legg-ved')}
                </Label>
                <BodyLong spacing>{tekst('tilskudd.start.legg-ved-tekst')}</BodyLong>

                <BodyLong spacing>
                    <LenkeMedIkon
                        href="https://nav.no/reisetilskudd"
                        text={tekst('tilskudd.start.les-mer-reisetilskudd')}
                    />
                    .
                </BodyLong>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default OmReisetilskudd
