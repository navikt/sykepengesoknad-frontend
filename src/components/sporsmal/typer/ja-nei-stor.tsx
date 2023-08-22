import { Alert, BodyLong, BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/router'
import { InformationIcon } from '@navikt/aksel-icons'

import { TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
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
import { cn } from '../../../utils/tw-utils'
import { YrkesskadeInfo } from '../../hjelpetekster/yrkesskade-info'
import { useJaNeiKeyboardNavigation } from '../../../utils/keyboard-navigation'
import { Inntektsbulletpoints } from '../inntektsbulletpoints'
import { Yrkesskadebulletpoints } from '../yrkesskade-bulletpoints'

const JaNeiStor = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        clearErrors,
        watch,
        getValues,
    } = useFormContext()
    const router = useRouter()
    const { id } = router.query as { id: string }

    const { data: valgtSoknad } = useSoknad(id)

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
            'focus-within:shadow-focus mb-2 block w-full rounded border-2  border-border-default px-4 py-1 text-text-default hover:bg-surface-action-subtle-hover md:mb-0 md:w-1/2',
            {
                'bg-surface-action-subtle border-border-selected': watchJaNei === value,
                'mt-4': mt,
                'border-b-border-danger border-border-danger text-text-danger': error,
            },
        )
    }

    const skalHaInntektsbulletpoints =
        sporsmal.tag === TagTyper.ANDRE_INNTEKTSKILDER_V2 && valgtSoknad.inntektskilderDataFraInntektskomponenten

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

                <Yrkesskadebulletpoints sporsmal={sporsmal} />
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

                            {sporsmal.tag === TagTyper.ANDRE_INNTEKTSKILDER_V2 && (
                                <div className="mt-4 flex max-w-sm gap-4 rounded-lg py-6">
                                    <InformationIcon
                                        title="informasjon"
                                        className="flex-shrink-0 rounded-full bg-gray-200 p-2 text-sm font-bold"
                                        height={37}
                                        width={37}
                                    />
                                    <BodyShort size="small">
                                        Informasjon om andre inntektskilder blir behandlet konfidensielt, og blir ikke
                                        delt med arbeidsgiver
                                    </BodyShort>
                                </div>
                            )}
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
                                <Alert data-cy="feriekorrigeringvarsel" className="mt-8" variant="info">
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
