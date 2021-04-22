import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { MouseEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import useForceUpdate from 'use-force-update'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../../types/types'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

export interface RadioUnderKompProps {
    selectedOption: string;
    uspm: Sporsmal;
    idx: number;
    sporsmal: Sporsmal;
    handleOptionChange: (e: MouseEvent) => void;
}

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const { register, watch, errors } = useFormContext()
    const watchRadio = watch(sporsmal.id)
    const feilmelding = hentFeilmelding(sporsmal)
    const forceUpdate = useForceUpdate()
    const { beregnGrad } = validerArbeidsgrad(sporsmal)

    useEffect(() => {
        // Tvangsoppdatering for å få riktig grad i advarselboksen (NB! vi vet det er stygt)
        if (watchRadio === 'timer') forceUpdate()
        // eslint-disable-next-line
    }, [ sporsmal ])

    return (
        <>
            <SporsmalstekstH3 sporsmal={sporsmal} />

            <div className={
                'skjemaelement' +
                (erHorisontal(sporsmal.svartype) ? ' skjemaelement--horisontal' : '') +
                (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')
            }>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    const checked = watchRadio === uspm.sporsmalstekst

                    return (
                        <div className="radioContainer" key={idx}>
                            <input type="radio"
                                id={uspm.id}
                                name={sporsmal.id}
                                value={uspm.sporsmalstekst}
                                ref={register({
                                    required: feilmelding.global
                                })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label className="skjemaelement__label" htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>

                            <AnimateOnMount
                                mounted={checked}
                                enter="undersporsmal--vis"
                                leave="undersporsmal--skjul"
                                start="undersporsmal"
                            >
                                <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar={checked ? 'CHECKED' : ''} />
                            </AnimateOnMount>
                        </div>
                    )
                })}
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <Vis hvis={watchRadio === 'timer'}
                render={() =>
                    <AlertStripe type="info" style={{ marginTop: '1rem' }}>
                        <Normaltekst>
                            {getLedetekst(
                                tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'),
                                { '%PROSENT%': beregnGrad!() ? Math.floor(beregnGrad!() * 100): 0 }
                            )}
                        </Normaltekst>
                    </AlertStripe>
                }
            />
        </>
    )
}

export default RadioKomp

export const erHorisontal = (svartype: RSSvartype) => {
    return svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT
}
