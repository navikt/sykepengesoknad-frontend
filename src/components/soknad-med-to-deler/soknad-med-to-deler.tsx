import './soknad-med-to-deler.less'

import { GuidePanel } from '@navikt/ds-react'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'
import VeilederSVG from '../soknad-intro/veileder'

const SoknadMedToDeler = () => {
    return (
        <div className="to-deler">
            <GuidePanel poster illustration={VeilederSVG}>
                <Undertittel tag="h2">{tekst('to-deler.overskrift')}</Undertittel>
                <Normaltekst>{tekst('to-deler.avsnitt.1')}</Normaltekst>
                <Normaltekst>{tekst('to-deler.avsnitt.2')}</Normaltekst>
            </GuidePanel>
        </div>
    )
}

export default SoknadMedToDeler
