import { Accordion, Alert, BodyLong, BodyShort, Heading, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'

const OmSykepenger = () => {
    const [open1, setOpen1] = useState<boolean>(false)
    const [open2, setOpen2] = useState<boolean>(false)
    const [open3, setOpen3] = useState<boolean>(false)

    return (
        <Accordion>
            <Accordion.Item open={open1} className="om_sykepenger">
                <Accordion.Header onClick={() => setOpen1(!open1)}>
                    <Heading size="small" level="2">
                        {tekst('om.sykepenger.tittel')}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong spacing>{tekst('om.sykepenger.tekst2')}</BodyLong>
                    <Label as="h3">{tekst('om.sykepenger.hvorfor')}</Label>
                    <BodyLong spacing>{tekst('om.sykepenger.tekst3')}</BodyLong>

                    <Accordion>
                        <Accordion.Item open={open2}>
                            <Accordion.Header onClick={() => setOpen2(!open2)}>
                                {tekst('om.sykepenger.arbeidstakere.tittel')}
                            </Accordion.Header>
                            <Accordion.Content>
                                <BodyLong spacing>{tekst('om.sykepenger.arbeidstakere.tekst1')}</BodyLong>
                                <BodyLong spacing>{tekst('om.sykepenger.arbeidstakere.tekst2')}</BodyLong>
                                <Alert variant="info">{tekst('om.sykepenger.arbeidstakere.alertstripe')}</Alert>
                            </Accordion.Content>
                        </Accordion.Item>

                        <Accordion.Item open={open3}>
                            <Accordion.Header onClick={() => setOpen3(!open3)}>
                                {tekst('om.sykepenger.selvstendige.tittel')}
                            </Accordion.Header>
                            <Accordion.Content>
                                <BodyLong spacing>{parser(tekst('om.sykepenger.selvstendige.tekst1'))}</BodyLong>
                                <BodyLong spacing>{tekst('om.sykepenger.selvstendige.tekst2')}</BodyLong>
                                <BodyLong spacing>{tekst('om.sykepenger.selvstendige.tekst3')}</BodyLong>
                                <Label as="h3">{tekst('om.sykepenger.selvstendige.husk')}</Label>
                                <BodyLong spacing>{parser(tekst('om.sykepenger.selvstendige.tekst4'))}</BodyLong>
                                <Alert variant="info">{parser(tekst('om.sykepenger.selvstendige.alertstripe'))}</Alert>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>

                    <Label as="h3">{tekst('om.sykepenger.tittel2')}</Label>
                    <Link href={tekst('om.sykepenger.lenke1.url')} target="_blank" rel="noopener">
                        <BodyShort>{tekst('om.sykepenger.lenke1')}</BodyShort>
                    </Link>

                    <Link href={tekst('om.sykepenger.lenke2.url')} target="_blank" rel="noopener">
                        <BodyShort>{tekst('om.sykepenger.lenke2')}</BodyShort>
                    </Link>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default OmSykepenger
