import './opplysninger.less'

import React from 'react'

import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import plaster from './plaster.svg'
import plasterHover from './plaster-hover.svg'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'

interface OpplysningerProps {
    ekspandert: boolean
    steg: string
}

const Opplysninger = ({ ekspandert, steg }: OpplysningerProps) => {

    const tittel = tekst('sykepengesoknad.sykmelding-utdrag.tittel')
    return (
        <Utvidbar className="ekspander"
            ikon={plaster} ikonHover={plasterHover} erApen={ekspandert}
            amplitudeProps={{ 'component': tittel, steg: steg }}
            tittel={tittel}
            ikonAltTekst=""
        >
            <div className="opplysninger">
                <SykmeldingPerioder />
                <ArbeidsgiverInfo />
                <SykmeldingDato />
                <ArbeidssituasjonInfo />
                <FravaersperioderInfo />
                <ForsikringInfo />
            </div>
        </Utvidbar>
    )
}

export default Opplysninger
