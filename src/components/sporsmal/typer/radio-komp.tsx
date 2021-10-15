import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import useForceUpdate from 'use-force-update'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const { register, formState: { errors }, watch } = useFormContext()
    const watchRadio = watch(sporsmal.id)
    const feilmelding = hentFeilmelding(sporsmal)
    const forceUpdate = useForceUpdate()
    const { beregnGrad } = validerArbeidsgrad(sporsmal)

    useEffect(() => {
        // Tvangsoppdatering for å få riktig grad i advarselboksen (NB! vi vet det er stygt)
        if (watchRadio && watchRadio.toLowerCase() === 'timer') forceUpdate()
        // eslint-disable-next-line
    }, [ sporsmal ])

    return (
        <>
            <SporsmalstekstH3 sporsmal={sporsmal} />
            <Vis hvis={sporsmal.undertekst && sporsmal.svartype == RSSvartype.RADIO_GRUPPE_TIMER_PROSENT}
                render={() => <Normaltekst style={{ marginBottom: '1em' }}> {sporsmal.undertekst}</Normaltekst>} />


            <div className={
                'skjemaelement' +
                (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')
            }>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    const checked = watchRadio === uspm.sporsmalstekst

                    return (
                        <div className="radioContainer" key={idx}>
                            <input type="radio"
                                id={uspm.id}
                                value={uspm.sporsmalstekst}
                                {...register(sporsmal.id, {
                                    required: feilmelding.global
                                })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label className="skjemaelement__label" htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>

                            <div aria-live="assertive">
                                <AnimateOnMount
                                    mounted={checked}
                                    enter="undersporsmal--vis"
                                    leave="undersporsmal--skjul"
                                    start="undersporsmal"
                                >
                                    <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar={checked ? 'CHECKED' : ''} />
                                </AnimateOnMount>
                            </div>
                        </div>
                    )
                })}
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <Vis hvis={watchRadio && watchRadio.toLowerCase() === 'timer' && beregnGrad && beregnGrad()}
                render={() =>
                    <AlertStripe type="info" style={{ marginTop: '1rem' }}>
                        <Normaltekst>
                            {getLedetekst(
                                tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'),
                                { '%PROSENT%': Math.floor(beregnGrad!() * 100) }
                            )}
                        </Normaltekst>
                    </AlertStripe>
                }
            />
        </>
    )
}

export default RadioKomp
