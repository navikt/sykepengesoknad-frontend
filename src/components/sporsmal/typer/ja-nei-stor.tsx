import { Alert, BodyLong, Radio, RadioGroup, Button, Label } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/router'
import { PlusIcon } from '@navikt/aksel-icons'
import { logger } from '@navikt/next-logger'

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
import { cn } from '../../../utils/tw-utils'
import { YrkesskadeInfo } from '../../hjelpetekster/yrkesskade-info'
import { useJaNeiKeyboardNavigation } from '../../../utils/keyboard-navigation'
import { Inntektsbulletpoints } from '../inntektsbulletpoints'
import { Yrkesskadebulletpoints } from '../yrkesskade-bulletpoints'
import { fetchJsonMedRequestId, AuthenticationError } from '../../../utils/fetch'
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal'
import { settSvar } from '../sett-svar'
import { useLeggTilArbeid } from '../../../hooks/useLeggTilArbeid'

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
    const { mutate: leggTilNyttUndersporsmal } = useLeggTilArbeid()

    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }

    const tagsMedKnapp: Set<TagTyper> = new Set([
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS,
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE,
        TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE,
    ])

    const undersporsmalMedLeggTilKnapp = tagsMedKnapp.has(sporsmal.tag)
    const sendOppdaterSporsmal = async (): Promise<boolean> => {
        let fikk400 = false
        try {
            await fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/sporsmal/${
                    sporsmal.id
                }`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify(sporsmalToRS(sporsmal)),
                    headers: { 'Content-Type': 'application/json' },
                },
                (response, requestId, defaultErrorHandler) => {
                    if (response.status === 400) {
                        fikk400 = true
                        router.push('/feil-state')
                    }
                    defaultErrorHandler()
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
            return false
        }
        return !fikk400
    }
    const leggTilArbeid = async (e: any) => {
        e.preventDefault()
        settSvar(sporsmal, getValues())
        await sendOppdaterSporsmal()
        leggTilNyttUndersporsmal({
            soknadId: valgtSoknad!.id,
            sporsmalId: sporsmal.id,
        })
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
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmalstekst()}
                            data-cy="ja-nei-stor"
                            className="w-full"
                            key={sporsmal.id}
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
                        <Vis
                            hvis={undersporsmalMedLeggTilKnapp}
                            render={() => (
                                <Label as="h2" className="mt-8">
                                    {sporsmal.tag === TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE
                                        ? 'Hvor og når har du utført arbeid i utlandet?'
                                        : 'Hvor og når har du oppholdt deg i utlandet?'}
                                </Label>
                            )}
                        />
                        <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />

                        {undersporsmalMedLeggTilKnapp && (
                            <Button
                                icon={<PlusIcon />}
                                size="small"
                                variant="tertiary"
                                className="mt-8"
                                onClick={leggTilArbeid}
                            >
                                Legg til ny arbeidsgiver
                            </Button>
                        )}

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
