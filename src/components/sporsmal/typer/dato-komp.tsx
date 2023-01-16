//import { Datepicker } from '@navikt/ds-datepicker'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Fieldset, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato-utils'
import validerDato from '../../../utils/sporsmal/valider-dato'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { getValues } = useFormContext()
    
    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        defaultMonth: new Date(sporsmal.max || new Date()),
    })
    return (
        <div className="dato-komp" data-cy="dato-komp">
            <FeilLokal sporsmal={sporsmal}/>

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
            
            {/* fjernes før pr: */}
            {/* http://localhost:8080/syk/sykepengesoknad/soknader/5b769c04-e171-47c9-b79b-23ab8fce331e/3 */}

            <div>
                <Controller

                    name={sporsmal.id}
                    rules={{
                        validate: () => {
                        const detteFeilet = validerDato(sporsmal, getValues())
                        if (detteFeilet !== true) {
                            //div?.classList.add('skjemaelement__input--harFeil')
                            return detteFeilet
                        }
                        // div?.classList.remove('skjemaelement__input--harFeil')
                        return true

                        },
                    }}
                    render={({ field }) => (
                        <div>
                            <div className="min-h-96">
                                <UNSAFE_DatePicker
                                    {...datepickerProps}
                                    {...(sporsmal.min && { fromDate: new Date(sporsmal.min) })}
                                    {...(sporsmal.max && { toDate: new Date(sporsmal.max) })}                   
                                    dropdownCaption={true}
                                    showWeekNumber={true}
                                    disableWeekends={true}
                                    locale="nb"
                                    id={sporsmal.id}
                                    onSelect={field.onChange}
                                    selected={field.value}
        
                                >
                                    <UNSAFE_DatePicker.Input {...inputProps}                         
                                    label={sporsmal.sporsmalstekst}
                                    />
                                </UNSAFE_DatePicker>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default DatoInput
