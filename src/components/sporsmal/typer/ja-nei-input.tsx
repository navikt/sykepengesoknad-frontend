import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { utlandssoknadUrl } from '../../../utils/url-utils'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import Bjorn from '../bjorn/bjorn'
import SporsmalBjorn from '../bjorn/sporsmal-bjorn'
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
    const { register, formState: { errors }, clearErrors, watch } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    const watchJaNei = watch(sporsmal.id)

    const visAvgittAvBjorn = () => {
        const undersporsmal = sporsmal.undersporsmal.find(uspm => uspm.tag === TagTyper.EGENMELDINGER_NAR)
        if (undersporsmal) {
            return undersporsmal.svarliste.svar.some(svaret => svaret.avgittAv === 'TIDLIGERE_SOKNAD')
        }
        return false
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
                            const OK = watchJaNei === valg.value
                            return (
                                <label className={'inputPanel radioPanel' + (OK ? ' inputPanel--checked' : '')}
                                    key={idx}>
                                    <input type="radio"
                                        id={sporsmal.id + '_' + idx}
                                        className="inputPanel__field"
                                        value={valg.value}
                                        {...register(sporsmal.id, {
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

                <Vis hvis={sporsmal?.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER && watchJaNei}
                    render={() =>
                        <Normaltekst className={'utland_infotekst'}>{
                            parser(getLedetekst(
                                tekst('soknad.infotekst.utlandsopphold_sokt_sykepenger.' + watchJaNei?.toLowerCase() as any),
                                { '%URL%': utlandssoknadUrl })
                            )}
                        </Normaltekst>
                    }
                />

            </div>

            <FeilLokal sporsmal={sporsmal} />

            <AnimateOnMount
                mounted={watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />
            </AnimateOnMount>

            <Vis hvis={visAvgittAvBjorn()}
                render={() =>
                    <Bjorn className="press" nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding" />
                }
            />

            <SporsmalBjorn sporsmal={sporsmal} />
        </>
    )
}

export default JaNeiInput
