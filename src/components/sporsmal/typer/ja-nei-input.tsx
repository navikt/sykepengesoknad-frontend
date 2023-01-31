import { BodyLong, RadioGroup, Radio } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import PaskeHjelpetekst from '../bendiksen/paske-hjelpetekst'
import Bjorn from '../bjorn/bjorn'
import BjornUnderSporsmalstekst from '../bjorn/bjorn-under-sporsmalstekst'
import SporsmalBjorn from '../bjorn/sporsmal-bjorn'
import { EkspanderbarHjelp } from '../ekspanderbar-hjelp/ekspanderbar-hjelp'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const JaNeiInput = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        clearErrors,
        watch,
        getValues,
    } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }

    const visAvgittAvBjorn = () => {
        const undersporsmal = sporsmal.undersporsmal.find((uspm) => uspm.tag === TagTyper.EGENMELDINGER_NAR)
        if (undersporsmal) {
            return undersporsmal.svarliste.svar.some((svaret) => svaret.avgittAv === 'TIDLIGERE_SOKNAD')
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
            <div className={'inputPanelGruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                <Controller
                    name={sporsmal.id}
                    rules={{ validate: (value) => valider(value), required: feilmelding.global }}
                    render={({ field }) => (
                        <RadioGroup {...field} legend={sporsmal.sporsmalstekst} className="radioGruppe-jaNei">
                            <BjornUnderSporsmalstekst sporsmal={sporsmal} />

                            <PaskeHjelpetekst sporsmal={sporsmal} />

                            <EkspanderbarHjelp sporsmal={sporsmal} />
                            <Radio
                                id={field.name + '_' + '0'}
                                value="JA"
                                className={'radio-input' + (watchJaNei === 'JA' ? ' radio-checked' : '')}
                            >
                                Ja
                            </Radio>
                            <Radio
                                id={field.name + '_' + '1'}
                                value="NEI"
                                className={'radio-input' + (watchJaNei === 'NEI' ? ' radio-checked' : '')}
                            >
                                Nei
                            </Radio>
                        </RadioGroup>
                    )}
                />

                <Vis
                    hvis={sporsmal?.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER && watchJaNei}
                    render={() => (
                        <BodyLong spacing className="utland_infotekst">
                            {parser(
                                getLedetekst(
                                    tekst(
                                        ('soknad.infotekst.utlandsopphold_sokt_sykepenger.' +
                                            watchJaNei?.toLowerCase()) as any,
                                    ),
                                    { '%URL%': utlandssoknadUrl },
                                ),
                            )}
                        </BodyLong>
                    )}
                />
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive">
                <AnimateOnMount
                    mounted={watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal}
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />
                </AnimateOnMount>
            </div>

            <Vis
                hvis={visAvgittAvBjorn()}
                render={() => <Bjorn className="press" nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding" />}
            />

            <SporsmalBjorn sporsmal={sporsmal} />
        </>
    )
}

export default JaNeiInput
