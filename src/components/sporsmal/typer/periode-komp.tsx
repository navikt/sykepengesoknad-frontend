import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { hentPeriode } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

interface PeriodeProps {
    index: number;
    slettPeriode: (e: any, idx: number) => void;
}

type AllProps = SpmProps & PeriodeProps;

const PeriodeKomp = ({ sporsmal, index, slettPeriode }: AllProps) => {
    const { setValue, errors } = useFormContext()
    const id = sporsmal.id + '_' + index
    const htmlfor = sporsmal.id + '_t_' + index
    const feilmelding = hentFeilmelding(sporsmal)
    Norwegian.rangeSeparator = ' - '

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        setValue(id, periode)
        // eslint-disable-next-line
    }, [ sporsmal ]);


    return (
        <li className="periode">
            <div className="periodelabel">
                <label htmlFor={htmlfor} className="fom">
                    {tekst('sykepengesoknad.periodevelger.fom')}
                </label>
                <label htmlFor={htmlfor} className="tom">
                    {tekst('sykepengesoknad.periodevelger.tom')}
                </label>
            </div>

            <Vis hvis={index > 0}>
                <button role="link" id={'btn_' + id} className="periodeknapp lenke slett"
                    onClick={(e) => slettPeriode(e, index)}>
                    {tekst('sykepengesoknad.periodevelger.slett')}
                </button>
            </Vis>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[id]?.type === 'pattern'}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
                <Vis hvis={errors[id]?.type === 'validate'}>
                    <p>Du må oppi en annen periode</p>
                </Vis>
            </Normaltekst>
        </li>
    )
}

export default PeriodeKomp
