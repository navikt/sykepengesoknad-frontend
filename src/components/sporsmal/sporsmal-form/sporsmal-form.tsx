import { logger } from '@navikt/next-logger'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../../types/types'
import { SEPARATOR } from '../../../utils/constants'
import { AuthenticationError, fetchJsonMedRequestId } from '../../../utils/fetch'
import { hentAnnonymisertSvar, logEvent } from '../../amplitude/amplitude'
import FeilOppsummering from '../../feil/feil-oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../../oppsummering/oppsummering'
import Vis from '../../vis'
import GuidepanelOverSporsmalstekst from '../guidepanel/GuidepanelOverSporsmalstekst'
import { EndringUtenEndringModal } from '../endring-uten-endring/endring-uten-endring-modal'
import { hentFormState } from '../hent-svar'
import { settSvar } from '../sett-svar'
import SporsmalSwitch from '../sporsmal-switch'
import { pathUtenSteg } from '../sporsmal-utils'
import CheckboxPanel from '../typer/checkbox-panel'
import useSoknad from '../../../hooks/useSoknad'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { harLikeSvar } from '../endring-uten-endring/har-like-svar'
import { useSendSoknad } from '../../../hooks/useSendSoknad'
import { RouteParams } from '../../../app'
import VaerKlarOverAt from '../../vaer-klar-over-at/vaer-klar-over-at'

import Knapperad from './knapperad'
import SendesTil from './sendes-til'
import skalViseKnapperad from './skal-vise-knapperad'

export interface SpmProps {
    sporsmal: Sporsmal
}

const SporsmalForm = () => {
    const { id, stegId } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { mutate: sendSoknadMutation, isLoading: senderSoknad, error: sendError } = useSendSoknad()
    const { data: korrigerer } = useSoknad(valgtSoknad?.korrigerer, valgtSoknad?.korrigerer !== undefined)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()

    const { setMottaker, setFeilState } = useAppStore()

    const [erSiste, setErSiste] = useState<boolean>(false)
    const [poster, setPoster] = useState<boolean>(false)
    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(false)
    const spmIndex = parseInt(stegId!) - 1
    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })
    const erUtlandssoknad = valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    let restFeilet = false
    let sporsmal = valgtSoknad!.sporsmal[spmIndex]
    const nesteSporsmal = valgtSoknad!.sporsmal[spmIndex + 1]

    useEffect(() => {
        methods.reset(hentFormState(sporsmal), { keepValues: false })

        const sisteSide = erSisteSpm()
        setErSiste(sisteSide)

        if (sisteSide) {
            hentMottaker().catch((e: Error) => logger.error(e))
        }
        // eslint-disable-next-line
    }, [sporsmal])

    useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            methods.reset(hentFormState(sporsmal), { keepValues: false })
        }
        // eslint-disable-next-line
    }, [methods.formState.isSubmitSuccessful])

    const erSisteSpm = () => {
        const snartSlutt = sporsmal.svartype === RSSvartype.CHECKBOX_PANEL
        if (erUtlandssoknad) {
            return sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
        }
        return snartSlutt && spmIndex === valgtSoknad!.sporsmal.length - 1
    }

    const sendOppdaterSporsmal = async (): Promise<boolean> => {
        let soknad = valgtSoknad

        let data
        let fikk400 = false
        try {
            data = await fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${soknad!.id}/sporsmal/${
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
                        setFeilState(true)
                    }
                    restFeilet = true
                    defaultErrorHandler()
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
            return false
        }
        if (fikk400) {
            return false
        }
        const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse = data
        if (rsOppdaterSporsmalResponse.mutertSoknad) {
            soknad = new Soknad(rsOppdaterSporsmalResponse.mutertSoknad)
        } else {
            const oppdatertSporsmal = rsOppdaterSporsmalResponse.oppdatertSporsmal
            soknad!.sporsmal[spmIndex] = new Sporsmal(oppdatertSporsmal, undefined as any, true)
        }

        queryClient.setQueriesData(['soknad', id], soknad)
        return true
    }

    const hentMottaker = useCallback(async () => {
        let data
        try {
            data = await fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/mottaker`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
            return
        }

        setMottaker(data.mottaker)

        // eslint-disable-next-line
    }, [])

    const sendSoknad = async () => {
        if (!valgtSoknad) {
            return
        }

        if (valgtSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
            if (korrigerer && harLikeSvar(korrigerer, valgtSoknad)) {
                setEndringUtenEndringAapen(true)
                return
            }
        }
        sendSoknadMutation()
    }

    const preSubmit = () => {
        methods.clearErrors('syfosoknad')
    }

    const onSubmit = async (data: any) => {
        setPoster(true)
        restFeilet = false

        try {
            settSvar(sporsmal, data)
            const oppdatertOk = await sendOppdaterSporsmal()
            if (!oppdatertOk) {
                return
            }

            if (erSiste) {
                await sendSoknad()
                logEvent('skjema fullført', {
                    soknadstype: valgtSoknad!.soknadstype,
                    skjemanavn: 'sykepengesoknad',
                })
                return
            }

            logEvent('skjema spørsmål besvart', {
                soknadstype: valgtSoknad!.soknadstype,
                skjemanavn: 'sykepengesoknad',
                spørsmål: sporsmal.tag,
                svar: hentAnnonymisertSvar(sporsmal),
            })

            if (restFeilet) {
                methods.setError('syfosoknad', {
                    type: 'rest-feilet',
                    message: 'Beklager, det oppstod en feil',
                })
                sporsmal = valgtSoknad!.sporsmal[spmIndex]
            } else {
                methods.clearErrors()
                navigate(pathUtenSteg(location.pathname) + SEPARATOR + (spmIndex + 2) + location.search)
            }
        } finally {
            setPoster(false)
        }
    }

    if (!valgtSoknad) {
        return null
    }

    return (
        <>
            <EndringUtenEndringModal aapen={endringUtenEndringAapen} setAapen={setEndringUtenEndringAapen} />
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onSubmitCapture={preSubmit}
                    noValidate={true} // Ikke native validation
                    className={'sporsmal__form ' + nesteSporsmal?.tag?.toLowerCase()}
                >
                    <GuidepanelOverSporsmalstekst sporsmal={sporsmal} />

                    <Vis hvis={!erSiste} render={() => <SporsmalSwitch sporsmal={sporsmal} />} />
                    <Vis
                        hvis={erSiste && !erUtlandssoknad}
                        render={() => (
                            <>
                                <VaerKlarOverAt soknad={valgtSoknad} />
                                <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                                <Opplysninger ekspandert={false} steg={sporsmal.tag} />
                                <CheckboxPanel sporsmal={sporsmal} />
                                <SendesTil soknad={valgtSoknad} />
                            </>
                        )}
                    />

                    <Vis
                        hvis={erSiste && erUtlandssoknad}
                        render={() => (
                            <>
                                <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                                <CheckboxPanel sporsmal={sporsmal} />
                            </>
                        )}
                    />

                    <Vis
                        hvis={
                            (valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD &&
                                sporsmal.svartype !== RSSvartype.KVITTERING) ||
                            valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD
                        }
                        render={() => (
                            <FeilOppsummering valgtSoknad={valgtSoknad} sporsmal={sporsmal} sendError={sendError} />
                        )}
                    />
                    <Vis
                        hvis={skalViseKnapperad(valgtSoknad, sporsmal, methods.getValues())}
                        render={() => <Knapperad soknad={valgtSoknad} poster={poster || senderSoknad} />}
                    />
                </form>
            </FormProvider>
        </>
    )
}

export default SporsmalForm
