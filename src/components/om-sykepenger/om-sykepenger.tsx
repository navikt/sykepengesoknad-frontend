import './om-sykepenger.less'

import { Accordion, Alert, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'

const OmSykepenger = () => {
    const [ open1, setOpen1 ] = useState<boolean>(false)
    const [ open2, setOpen2 ] = useState<boolean>(false)
    const [ open3, setOpen3 ] = useState<boolean>(false)

    return (
        <Accordion>
            <Accordion.Item open={open1} className="om_sykepenger">
                <Accordion.Header onClick={() => setOpen1(!open1)}>
                    <Undertittel tag="h2">{tekst('om.sykepenger.tittel')}</Undertittel>
                </Accordion.Header>
                <Accordion.Content>
                    <Normaltekst>{tekst('om.sykepenger.tekst2')}</Normaltekst>
                    <Element tag="h3">{tekst('om.sykepenger.hvorfor')}</Element>
                    <Normaltekst>{tekst('om.sykepenger.tekst3')}</Normaltekst>

                    <Accordion>
                        <Accordion.Item open={open2}>
                            <Accordion.Header onClick={() => setOpen2(!open2)}>
                                {tekst('om.sykepenger.arbeidstakere.tittel')}
                            </Accordion.Header>
                            <Accordion.Content>
                                <Normaltekst>{tekst('om.sykepenger.arbeidstakere.tekst1')}</Normaltekst>
                                <Normaltekst>{tekst('om.sykepenger.arbeidstakere.tekst2')}</Normaltekst>
                                <Alert variant="info">{tekst('om.sykepenger.arbeidstakere.alertstripe')}</Alert>
                            </Accordion.Content>
                        </Accordion.Item>

                        <Accordion.Item open={open3}>
                            <Accordion.Header onClick={() => setOpen3(!open3)}>
                                {tekst('om.sykepenger.selvstendige.tittel')}
                            </Accordion.Header>
                            <Accordion.Content>
                                <Normaltekst>{parser(tekst('om.sykepenger.selvstendige.tekst1'))}</Normaltekst>
                                <Normaltekst>{tekst('om.sykepenger.selvstendige.tekst2')}</Normaltekst>
                                <Normaltekst>{tekst('om.sykepenger.selvstendige.tekst3')}</Normaltekst>
                                <Element tag="h3">{tekst('om.sykepenger.selvstendige.husk')}</Element>
                                <Normaltekst>{parser(tekst('om.sykepenger.selvstendige.tekst4'))}</Normaltekst>
                                <Alert variant="info">{parser(tekst('om.sykepenger.selvstendige.alertstripe'))}</Alert>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>

                    <Element tag="h3">{tekst('om.sykepenger.tittel2')}</Element>
                    <Normaltekst>
                        <Link href={tekst('om.sykepenger.lenke1.url')} target="_blank" rel="noopener">
                            {tekst('om.sykepenger.lenke1')}
                        </Link>
                    </Normaltekst>
                    <Normaltekst>
                        <Link href={tekst('om.sykepenger.lenke2.url')} target="_blank" rel="noopener">
                            {tekst('om.sykepenger.lenke2')}
                        </Link>
                    </Normaltekst>

                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default OmSykepenger
