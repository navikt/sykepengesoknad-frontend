import { Alert, BodyLong, Radio, RadioGroup } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import React from 'react'

import { TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { PaskeferieInfo } from '../../hjelpetekster/paaskeferie/paskeferie-info'
import useSoknad from '../../../hooks/useSoknad'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RouteParams } from '../../../app'
import { cn } from '../../../utils/tw-utils'
import { YrkesskadeInfo } from '../../hjelpetekster/yrkesskade-info'
import { useJaNeiKeyboardNavigation } from '../../../utils/keyboard-navigation'

const JaNeiStor = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        clearErrors,
        watch,
        getValues,
    } = useFormContext()
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }

    useJaNeiKeyboardNavigation(sporsmal)

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

    function radioClassName(value: 'JA' | 'NEI') {
        return cn(
            'focus-within:shadow-focus mb-2 block w-full rounded border-2 border-b-border-action px-4 py-1 text-text-action hover:bg-surface-action-subtle-hover md:mb-0 md:w-[48.7%]',
            {
                'bg-surface-action-subtle': watchJaNei === value,
            },
        )
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
                            data-cy={'ja-nei-stor'}
                            className="w-full"
                            key={sporsmal.id}
                            style={
                                {
                                    '--ac-radio-checkbox-border': 'var(--a-border-action)',
                                    '--ac-radio-checkbox-action': 'var(--a-border-action)',
                                    '--ac-radio-checkbox-action-hover-bg': 'white',
                                } as React.CSSProperties
                            }
                        >
                            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

                            <EkspanderbarHjelp sporsmal={sporsmal} />

                            <div
                                style={
                                    {
                                        '--a-shadow-focus': '0 0 0 0',
                                    } as React.CSSProperties
                                }
                                className="flex w-full flex-wrap justify-between"
                            >
                                <Radio id={`${field.name}_0`} value={'JA'} className={radioClassName('JA')}>
                                    Ja
                                </Radio>
                                <Radio id={`${field.name}_1`} value={'NEI'} className={radioClassName('NEI')}>
                                    Nei
                                </Radio>
                            </div>
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

                <YrkesskadeInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive">
                <AnimateOnMount
                    mounted={watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal}
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <>
                        <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />

                        <Vis
                            hvis={
                                valgtSoknad?.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING &&
                                sporsmal.tag === TagTyper.FERIE_V2 &&
                                watchJaNei === 'JA'
                            }
                            render={() => (
                                <Alert data-cy={'feriekorrigeringvarsel'} className="mt-8" variant="info">
                                    Du kan dra på ferie mens du er sykmeldt, men du får ikke utbetalt sykepenger når du
                                    har ferie.
                                </Alert>
                            )}
                        />

                        <PaskeferieInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
                    </>
                </AnimateOnMount>
            </div>
        </>
    )
}

export default JaNeiStor
