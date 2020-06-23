import dayjs from 'dayjs'
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useFormContext } from 'react-hook-form'

import validerPeriode from '../../../utils/sporsmal/valider-periode'
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
    const { setValue, errors, getValues } = useFormContext()
    const [ datoer, settDatoer ] = useState<Date[]>([])
    const id = sporsmal.id + '_' + index
    const htmlfor = sporsmal.id + '_t_' + index
    const feilmelding = hentFeilmelding(sporsmal)
    Norwegian.rangeSeparator = ' - '

    useEffect(() => {
        const periode = hentPeriode(sporsmal, index)
        onValueUpdate(periode)
        setValue(id, periode)
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const onValueUpdate = (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
            settDatoer(selectedDates)
        }
    }

    const formater = () => {
        return datoer.map(dato => dayjs(dato).format('DD.MM.YYYY')).join('   -    ')
    }

    return (
        <li className='periode'>
            <div className='periodelabel'>
                <label htmlFor={htmlfor} className='fom'>
                    {tekst('sykepengesoknad.periodevelger.fom')}
                </label>
                <label htmlFor={htmlfor} className='tom'>
                    {tekst('sykepengesoknad.periodevelger.tom')}
                </label>
            </div>
            <Controller
                as={Flatpickr}
                rules={{
                    pattern: { value: /\d/, message: feilmelding.global },
                    validate: () => validerPeriode(sporsmal, id, getValues())
                }}
                id={id}
                name={id}
                className='skjemaelement__input input--m'
                placeholder='dd.mm.åååå - dd.mm.åååå'
                onValueUpdate={onValueUpdate}
                options={{
                    minDate: sporsmal.min!,
                    maxDate: sporsmal.max!,
                    mode: 'range',
                    enableTime: false,
                    dateFormat: 'F j, Y',
                    altInput: true,
                    altFormat: 'd.m.Y',
                    formatDate: formater,
                    locale: Norwegian,
                    allowInput: true,
                    disableMobile: true
                }}
            />

            <Vis hvis={index > 0}>
                <button role='link' id={'btn_' + id} className='periodeknapp lenke slett'
                    onClick={(e) => slettPeriode(e, index)}>
                    {tekst('sykepengesoknad.periodevelger.slett')}
                </button>
            </Vis>

            <Normaltekst tag='div' role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
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
