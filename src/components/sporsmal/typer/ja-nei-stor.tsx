import { BodyLong, RadioGroup, Radio } from '@navikt/ds-react'
import { useFormContext, Controller } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import PaskeHjelpetekst from '../bendiksen/paske-hjelpetekst'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

const JaNeiStor = ({ sporsmal }: SpmProps) => {
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
                        <RadioGroup
                            {...field}
                            legend={sporsmal.sporsmalstekst}
                            className="radioGruppe-jaNei"
                            key={sporsmal.id}
                        >
                            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

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
                            {parserWithReplace(
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
        </>
    )
}

export default JaNeiStor
