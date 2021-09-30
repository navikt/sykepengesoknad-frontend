import './hvorfor-soknad-sykepenger.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import PersonvernLesMer from '../soknad-intro/personvern-les-mer'
import Vis from '../vis'

interface HvorforSoknadSykepengerProps {
    soknadstype: RSSoknadstype
}

const HvorforSoknadSykepenger = ({ soknadstype }:HvorforSoknadSykepengerProps) => {
    return (
        <Ekspanderbartpanel apen={false} className="hvorfor-soknad-sykepenger" tittel={
            <Undertittel tag={'h2'}>{tekst('hvorfor-soknad-sykepenger.overskrift')}</Undertittel>
        }>
            <Vis hvis={soknadstype === RSSoknadstype.REISETILSKUDD}
                render={() =>
                    <Normaltekst>{tekst('hvorfor-soknad-reisetilskudd')}</Normaltekst>
                }
            />

            <Vis hvis={soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD}
                render={() =>
                    <>
                        <Normaltekst>{tekst('hvorfor-soknad-gradertreisetilskudd')}</Normaltekst>
                        <Normaltekst>{tekst('hvorfor-soknad-sykepenger.jobba')}</Normaltekst>
                    </>
                }
            />

            <Vis hvis={soknadstype !== RSSoknadstype.REISETILSKUDD && soknadstype !== RSSoknadstype.GRADERT_REISETILSKUDD}
                render={() =>
                    <>
                        <Normaltekst>{tekst('hvorfor-soknad-sykepenger')}</Normaltekst>
                        <Normaltekst>{tekst('hvorfor-soknad-sykepenger.jobba')}</Normaltekst>
                    </>
                }
            />

            <PersonvernLesMer />
        </Ekspanderbartpanel>
    )
}

export default HvorforSoknadSykepenger
