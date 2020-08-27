import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { SvarEnums, TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { utlandssoknadUrl } from '../../../utils/url-utils'
import AnimateOnMount from '../../animate-on-mount'
import Vis from '../../vis'
import Bjorn from '../bjorn/bjorn'
import SporsmalBjorn from '../bjorn/sporsmal-bjorn'
import TagBjorn from '../bjorn/tag-bjorn'
import { hentFormState, hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import SporsmalHjelpetekst from '../sporsmal-hjelpetekst'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const jaNeiValg = [ {
    value: 'JA',
    label: 'Ja',
}, {
    value: 'NEI',
    label: 'Nei',
} ]

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const { register, setValue, errors, reset, getValues, clearErrors } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))

    useEffect(() => {
        if (sporsmal.erHovedsporsmal) {
            reset(hentFormState(sporsmal))
        } else {
            setValue(sporsmal.id, hentSvar(sporsmal))
        }
        // eslint-disable-next-line
    }, [sporsmal.id]);

    useEffect(() => {
        setLokal(hentSvar(sporsmal))
    }, [ sporsmal ])

    const visAvgittAvBjorn = () => {
        const undersporsmal = sporsmal.undersporsmal.find(uspm => uspm.tag === TagTyper.EGENMELDINGER_NAR)
        if (undersporsmal) {
            return undersporsmal.svarliste.svar.some(svaret => svaret.avgittAv === 'TIDLIGERE_SOKNAD')
        }
        return false
    }

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value)
        setLokal(value)
    }

    const valider = (value: any) => {
        if (value === 'JA' || value === 'NEI') {
            if (sporsmal.erHovedsporsmal) {
                clearErrors()
            } else {
                clearErrors(sporsmalIdListe(sporsmal.undersporsmal))
            }
            return true
        }
        return false
    }

    return (
        <>
            <div className="inputPanelGruppe inputPanelGruppe--horisontal">
                <fieldset className={'skjema__fieldset' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                    <legend className="skjema__legend">
                        <div className="medHjelpetekst">
                            <Element tag="h3" className="skjema__sporsmal">
                                {sporsmal.sporsmalstekst}
                            </Element>
                            <SporsmalHjelpetekst sporsmal={sporsmal} />
                        </div>
                    </legend>
                    <div className="inputPanelGruppe__inner">
                        {jaNeiValg.map((valg, idx) => {
                            const OK = getValues()[sporsmal.id] === valg.value
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')}
                                    key={idx}>
                                    <input type="radio"
                                        name={sporsmal.id}
                                        id={sporsmal.id + '_' + idx}
                                        className="inputPanel__field"
                                        aria-checked={OK}
                                        checked={OK}
                                        value={valg.value}
                                        onChange={() => changeValue(valg.value)}
                                        ref={register({
                                            validate: (value) => valider(value),
                                            required: feilmelding.global
                                        })}
                                    />
                                    <span className="inputPanel__label">{valg.label}</span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>
                <Vis
                    hvis={sporsmal.tag && sporsmal.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER && getValues()[sporsmal.id]}>
                    {(getValues()[sporsmal.id] === SvarEnums.JA)
                        ? <Normaltekst
                            className={'utland_infotekst'}> {parser(getLedetekst(tekst('soknad.infotekst.utlandsopphold_sokt_sykepenger.ja'), { '%URL%': utlandssoknadUrl }))} </Normaltekst>
                        : ((getValues()[sporsmal.id] === SvarEnums.NEI)
                            ? <Normaltekst tag="div"
                                className={'utland_infotekst'}> {parser(getLedetekst(tekst('soknad.infotekst.utlandsopphold_sokt_sykepenger.nei'), { '%URL%': utlandssoknadUrl }))} </Normaltekst>
                            : <></>)}

                </Vis>
            </div>

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>

            <AnimateOnMount
                mounted={lokal === sporsmal.kriterieForVisningAvUndersporsmal}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <>
                    <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={lokal} />
                    <TagBjorn sporsmal={sporsmal} className="press" />
                </>
            </AnimateOnMount>

            <Vis hvis={visAvgittAvBjorn()}>
                <Bjorn className="press" nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding" />
            </Vis>

            <SporsmalBjorn sporsmal={sporsmal} />
        </>
    )
}

export default JaNeiInput
