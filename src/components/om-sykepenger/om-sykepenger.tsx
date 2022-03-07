import './om-sykepenger.less'

import { Alert } from '@navikt/ds-react'
import parser from 'html-react-parser'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const OmSykepenger = () => {

    return (
        <Ekspanderbartpanel apen={false} className="om_sykepenger"
            tittel={<Undertittel tag="h2">{tekst('om.sykepenger.tittel')}</Undertittel>}
        >
            <Normaltekst>{tekst('om.sykepenger.tekst2')}</Normaltekst>
            <Element tag="h3">{tekst('om.sykepenger.hvorfor')}</Element>
            <Normaltekst>{tekst('om.sykepenger.tekst3')}</Normaltekst>

            <Ekspanderbartpanel tittel={tekst('om.sykepenger.arbeidstakere.tittel')} apen={false}>
                <Normaltekst>{tekst('om.sykepenger.arbeidstakere.tekst1')}</Normaltekst>
                <Normaltekst>{tekst('om.sykepenger.arbeidstakere.tekst2')}</Normaltekst>
                <Alert variant="info">{tekst('om.sykepenger.arbeidstakere.alertstripe')}</Alert>
            </Ekspanderbartpanel>

            <Ekspanderbartpanel tittel={tekst('om.sykepenger.selvstendige.tittel')} apen={false}>
                <Normaltekst>{parser(tekst('om.sykepenger.selvstendige.tekst1'))}</Normaltekst>
                <Normaltekst>{tekst('om.sykepenger.selvstendige.tekst2')}</Normaltekst>
                <Normaltekst>{tekst('om.sykepenger.selvstendige.tekst3')}</Normaltekst>
                <Element tag="h3">{tekst('om.sykepenger.selvstendige.husk')}</Element>
                <Normaltekst>{parser(tekst('om.sykepenger.selvstendige.tekst4'))}</Normaltekst>
                <Alert variant="info">{parser(tekst('om.sykepenger.selvstendige.alertstripe'))}</Alert>
            </Ekspanderbartpanel>

            <Element tag="h3">{tekst('om.sykepenger.tittel2')}</Element>
            <Normaltekst>
                <Lenke href={tekst('om.sykepenger.lenke1.url')} target="_blank" rel="noopener">
                    {tekst('om.sykepenger.lenke1')}
                </Lenke>
            </Normaltekst>
            <Normaltekst>
                <Lenke href={tekst('om.sykepenger.lenke2.url')} target="_blank" rel="noopener">
                    {tekst('om.sykepenger.lenke2')}
                </Lenke>
            </Normaltekst>

        </Ekspanderbartpanel>
    )
}

export default OmSykepenger
