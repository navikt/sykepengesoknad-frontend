import { Alert, BodyLong, Radio, RadioGroup } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'

import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { PaskeferieInfo } from '../../hjelpetekster/paaskeferie/paskeferie-info'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { cn } from '../../../utils/tw-utils'
import { YrkesskadeInfo } from '../../hjelpetekster/yrkesskade-info'
import { useJaNeiKeyboardNavigation } from '../../../utils/keyboard-navigation'
import { Inntektsbulletpoints } from '../inntektsbulletpoints'
import { Yrkesskadebulletpoints } from '../yrkesskade-bulletpoints'
import { InntektsopplysningerErKonfidensielleInfo } from '../inntektsopplysninger-er-konfidensielle-info'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const JaNeiStor = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        clearErrors,
        watch,
        getValues,
    } = useFormContext()
    const { valgtSoknad } = useSoknadMedDetaljer()

    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }

    useJaNeiKeyboardNavigation(sporsmal)
    if (!valgtSoknad) return null

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

    const error = errors[sporsmal.id] !== undefined

    function radioClassName(value: 'JA' | 'NEI', mt = false) {
        return cn(
            'focus-within:shadow-focus mb-2 block w-full [&>label]:rounded [&>label]:border-2 [&>label]:border-border-default [&>label]:px-4 [&>label]:py-4 text-text-default [&>label]:hover:bg-surface-action-subtle-hover md:mb-0 md:w-1/2',
            {
                '[&>label]:bg-surface-action-subtle [&>label]:border-border-selected': watchJaNei === value,
                'mt-4': mt,
                '[&>label]:border-b-border-danger [&>label]:border-border-danger text-text-danger': error,
            },
        )
    }

    const skalHaInntektsbulletpoints =
        sporsmal.tag === 'ANDRE_INNTEKTSKILDER_V2' && valgtSoknad.inntektskilderDataFraInntektskomponenten

    function sporsmalstekst() {
        if (skalHaInntektsbulletpoints) {
            return 'Har du andre inntektskilder enn nevnt over?'
        }
        return sporsmal.sporsmalstekst
    }

    return (
        <>
            <div>
                {skalHaInntektsbulletpoints && <Inntektsbulletpoints soknad={valgtSoknad} />}
                {sporsmal.tag === 'YRKESSKADE_V2' && <Yrkesskadebulletpoints sporsmal={sporsmal} />}

                <Controller
                    name={sporsmal.id}
                    rules={{ validate: (value) => valider(value), required: feilmelding.global }}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmalstekst()}
                            data-cy="ja-nei-stor"
                            className="w-full"
                            key={sporsmal.id}
                            error={fieldState.error && feilmelding.lokal}
                            style={
                                {
                                    '--ac-radio-checkbox-border': error
                                        ? 'var(--a-border-danger)'
                                        : 'var(--a-border-default)',
                                    '--ac-radio-checkbox-action-hover-bg': 'white',
                                } as React.CSSProperties
                            }
                        >
                            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} key="ja-nei-stor-guidepanel" />

                            <EkspanderbarHjelp sporsmal={sporsmal} key="ja-nei-stor-hjelp" />

                            <div
                                key="ja-nei-stor-style"
                                style={
                                    {
                                        '--a-shadow-focus': '0 0 0 0',
                                    } as React.CSSProperties
                                }
                            >
                                <Radio id={`${field.name}_0`} value="JA" className={radioClassName('JA')}>
                                    Ja
                                </Radio>
                                <Radio id={`${field.name}_1`} value="NEI" className={radioClassName('NEI', true)}>
                                    Nei
                                </Radio>
                            </div>
                        </RadioGroup>
                    )}
                />

                {sporsmal.tag === 'ANDRE_INNTEKTSKILDER_V2' && <InntektsopplysningerErKonfidensielleInfo />}

                {sporsmal?.tag === 'UTLANDSOPPHOLD_SOKT_SYKEPENGER' && watchJaNei && (
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

                <YrkesskadeInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
            </div>

            <div aria-live="assertive">
                <AnimateOnMount
                    mounted={watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal}
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <>
                        <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />

                        {valgtSoknad?.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING &&
                            sporsmal.tag === 'FERIE_V2' &&
                            watchJaNei === 'JA' && (
                                <Alert data-cy="feriekorrigeringvarsel" className="mt-8" variant="info">
                                    Du kan dra på ferie mens du er sykmeldt, men du får ikke utbetalt sykepenger når du
                                    har ferie.
                                </Alert>
                            )}

                        <PaskeferieInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
                    </>
                </AnimateOnMount>
            </div>
        </>
    )
}

export default JaNeiStor
