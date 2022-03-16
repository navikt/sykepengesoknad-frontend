import './om-reisetilskudd.less'

import { Accordion, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'

const OmReisetilskudd = () => {
    const [ open, setOpen ] = useState<boolean>(false)

    return (
        <Accordion>
            <Accordion.Item open={open} className="om-reisetilskudd">
                <Accordion.Header onClick={() => setOpen(!open)}>
                    <Undertittel>{tekst('tilskudd.start.om-reisetilskudd')}</Undertittel>
                </Accordion.Header>
                <Accordion.Content>
                    <Element tag="h3">{tekst('tilskudd.start.hva-dekker')}</Element>
                    <Normaltekst>
                        {parser(tekst('tilskudd.start.hva-dekker-tekst'))}
                    </Normaltekst>

                    <Element tag="h3">{tekst('tilskudd.start.forste-16')}</Element>
                    <Normaltekst>
                        {tekst('tilskudd.start.forste-16-tekst')}
                    </Normaltekst>

                    <Element tag="h3">{tekst('tilskudd.start.legg-ved')}</Element>
                    <Normaltekst>
                        {tekst('tilskudd.start.legg-ved-tekst')}
                    </Normaltekst>

                    <Normaltekst>
                        <Link href="https://nav.no/reisetilskudd" target="_blank" rel="noopener">
                            {tekst('tilskudd.start.les-mer-reisetilskudd')}
                        </Link>.
                    </Normaltekst>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default OmReisetilskudd
