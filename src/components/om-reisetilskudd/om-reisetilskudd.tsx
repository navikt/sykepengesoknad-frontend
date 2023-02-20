import { Accordion, BodyLong, Heading, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'

const OmReisetilskudd = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Accordion>
            <Accordion.Item open={open} className="om-reisetilskudd">
                <Accordion.Header
                    onClick={() => {
                        logEvent(open ? 'accordion lukket' : 'accordion åpnet', {
                            component: tekst('tilskudd.start.om-reisetilskudd'),
                        })
                        setOpen(!open)
                    }}
                >
                    <Heading size="small">{tekst('tilskudd.start.om-reisetilskudd')}</Heading>
                </Accordion.Header>
                <Accordion.Content>
                    <Label as="h3">{tekst('tilskudd.start.hva-dekker')}</Label>
                    <BodyLong spacing>{parser(tekst('tilskudd.start.hva-dekker-tekst'))}</BodyLong>

                    <Label as="h3">{tekst('tilskudd.start.forste-16')}</Label>
                    <BodyLong spacing>{tekst('tilskudd.start.forste-16-tekst')}</BodyLong>

                    <Label as="h3">{tekst('tilskudd.start.legg-ved')}</Label>
                    <BodyLong spacing>{tekst('tilskudd.start.legg-ved-tekst')}</BodyLong>

                    <BodyLong spacing>
                        <Link href="https://nav.no/reisetilskudd" target="_blank" rel="noopener">
                            {tekst('tilskudd.start.les-mer-reisetilskudd')}
                        </Link>
                        .
                    </BodyLong>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default OmReisetilskudd
