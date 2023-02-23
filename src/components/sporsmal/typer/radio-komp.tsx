import { Alert, BodyLong, BodyShort, Label, ReadMore } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router'

import { TagTyper } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { rodeUkeDagerIPerioden } from '../../../utils/helligdager-utils'
import { hentUndersporsmal } from '../../../utils/soknad-utils'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { RouteParams } from '../../../app'
import useSoknad from '../../../hooks/useSoknad'

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

    // watchTimer er lagt inn for å rendre prosent-alerten
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const watchTimer = watch(hentUndersporsmal(sporsmal!, TagTyper.HVOR_MYE_TIMER_VERDI)!.id)
    const errorTimer = errors[hentUndersporsmal(sporsmal!, TagTyper.HVOR_MYE_TIMER_VERDI)!.id]

    const feilmelding = hentFeilmelding(sporsmal)
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { validerGrad, beregnGrad } = validerArbeidsgrad(sporsmal)

    const lavereProsentHjelpTittel = tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.tittel')
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

            <Vis
                hvis={
                    watchRadio?.toLowerCase() === 'timer' &&
                    beregnGrad?.() &&
                    beregnGrad() !== Infinity &&
                    validerGrad!() == true
                }
                render={() => (
                    <Alert variant="info" style={{ marginTop: '1rem' }}>
                        <BodyShort>
                            {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {
                                '%PROSENT%': Math.floor(beregnGrad!() * 100),
                            })}
                        </BodyShort>
                    </Alert>
                )}
            />

            <Vis
                hvis={errorTimer && rodeUkeDagerIPerioden(valgtSoknad!.fom, valgtSoknad!.tom)}
                render={() => (
                    <ReadMore header={lavereProsentHjelpTittel}>
                        <BodyLong spacing>
                            {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold1')}
                        </BodyLong>
                        <BodyLong spacing>
                            {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold2')}
                        </BodyLong>
                    </ReadMore>
                )}
            />
        </>
    )
}

export default RadioKomp
