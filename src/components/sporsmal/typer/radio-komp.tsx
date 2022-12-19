import { BodyLong, Label } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchRadio = watch(sporsmal.id)
    if (watchRadio === undefined) {
        watchRadio = getValues(sporsmal.id)
    }

    const feilmelding = hentFeilmelding(sporsmal)

    return (
        <>
            <Label as="h3" className={sporsmal.undertekst ? 'skjema__sporsmal_med_undersporsmal' : 'skjema__sporsmal'}>
                {sporsmal.sporsmalstekst}
            </Label>
            <Vis
                hvis={sporsmal.undertekst && sporsmal.svartype == RSSvartype.RADIO_GRUPPE_TIMER_PROSENT}
                render={() => <BodyLong spacing> {sporsmal.undertekst}</BodyLong>}
            />

            <div className={'skjemaelement' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return (
                        <div className="radioContainer" key={idx}>
                            <input
                                type="radio"
                                id={uspm.id}
                                value={uspm.sporsmalstekst}
                                {...register(sporsmal.id, {
                                    required: feilmelding.global,
                                })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label className="skjemaelement__label" htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>
                        </div>
                    )
                })}
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    const checked = watchRadio === uspm.sporsmalstekst

                    return (
                        <div key={idx + 'under'} style={{ marginTop: '1rem' }}>
                            <div aria-live="assertive">
                                <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar={checked ? 'CHECKED' : ''} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default RadioKomp
