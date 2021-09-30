import './soknad-med-to-deler.less'

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import React from 'react'

import { tekst } from '../../utils/tekster'
import VeilederSVG from '../soknad-intro/veileder'

const SoknadMedToDeler = () => {
    return (
        <div className={'to-deler'}>
            <Veilederpanel kompakt type="plakat" fargetema="info" svg={VeilederSVG}>
                <Undertittel tag={'h2'}>{tekst('to-deler.overskrift')}</Undertittel>
                <Normaltekst>{tekst('to-deler.avsnitt.1')}</Normaltekst>
                <Normaltekst>{tekst('to-deler.avsnitt.2')}</Normaltekst>
            </Veilederpanel>
        </div>
    )
}

export default SoknadMedToDeler
