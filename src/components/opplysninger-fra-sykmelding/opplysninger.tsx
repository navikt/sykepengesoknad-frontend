import React from 'react'
import { useParams } from 'react-router-dom'

import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'
import useSykmelding from '../../hooks/useSykmelding'

import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'

interface OpplysningerProps {
    ekspandert: boolean
    steg: string
}

const Opplysninger = ({ ekspandert, steg }: OpplysningerProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)

    const tittel = tekst('sykepengesoknad.sykmelding-utdrag.tittel')

    if (!valgtSoknad || !valgtSykmelding) return null

    return (
        <Utvidbar
            className="ekspander"
            ikon={'/syk/sykepengesoknad/static/plaster.svg'}
            ikonHover={'/syk/sykepengesoknad/static/plaster-hover.svg'}
            erApen={ekspandert}
            amplitudeProps={{ component: tittel, steg: steg }}
            tittel={tittel}
            ikonAltTekst=""
        >
            <div className="opplysninger">
                <SykmeldingPerioder valgtSoknad={valgtSoknad} valgtSykmelding={valgtSykmelding} />
                <ArbeidsgiverInfo valgtSoknad={valgtSoknad} />
                <SykmeldingDato valgtSykmelding={valgtSykmelding} />
                <ArbeidssituasjonInfo valgtSykmelding={valgtSykmelding} />
                <FravaersperioderInfo valgtSykmelding={valgtSykmelding} />
                <ForsikringInfo valgtSykmelding={valgtSykmelding} />
            </div>
        </Utvidbar>
    )
}

export default Opplysninger
