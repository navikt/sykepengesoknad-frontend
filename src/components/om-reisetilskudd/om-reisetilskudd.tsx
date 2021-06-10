import './om-reisetilskudd.less'

import parser from 'html-react-parser'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const OmReisetilskudd = () => {

    return (
        <Ekspanderbartpanel apen={true} className="om-reisetilskudd" tittel={
            <Undertittel>{tekst('tilskudd.start.om-reisetilskudd')}</Undertittel>
        }>

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
                <Lenke href="https://nav.no/reisetilskudd" target="blank" rel="noopener">
                    {tekst('tilskudd.start.les-mer-reisetilskudd')}
                </Lenke>.
            </Normaltekst>

        </Ekspanderbartpanel>
    )
}

export default OmReisetilskudd
