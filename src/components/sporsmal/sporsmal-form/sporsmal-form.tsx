import { logger } from '@navikt/next-logger'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

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
import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { UseTestpersonQuery } from '../../../hooks/useTestpersonQuery'

import Knapperad from './knapperad'
import SendesTil from './sendes-til'
import skalViseKnapperad from './skal-vise-knapperad'

export interface SpmProps {
    sporsmal: Sporsmal
}

export interface SpmFormProps {
    valgtSoknad: Soknad
    spmIndex: number
    sporsmal: Sporsmal
}
const SporsmalForm = ({ valgtSoknad, spmIndex, sporsmal }: SpmFormProps) => {
    const router = useRouter()
    const testpersonQuery = UseTestpersonQuery()

    const { mutate: sendSoknadMutation, isLoading: senderSoknad, error: sendError } = useSendSoknad()
    const { data: korrigerer } = useSoknad(valgtSoknad?.korrigerer, valgtSoknad?.korrigerer !== undefined)
    const queryClient = useQueryClient()

    const [mottaker, setMottaker] = useState<RSMottaker>()

    const [erSiste, setErSiste] = useState<boolean>(false)
    const [poster, setPoster] = useState<boolean>(false)
    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(false)
    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })
    const erUtlandssoknad = valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    let restFeilet = false
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
        const snartSlutt =
            sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL
        if (erUtlandssoknad) {
            return sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
        }
        return snartSlutt && spmIndex === valgtSoknad!.sporsmal.length - 2
    }

    const sendOppdaterSporsmal = async (): Promise<boolean> => {
        if (sporsmal.tag == TagTyper.KVITTERINGER) {
            // Denne oppdateres med put av svar
            return true
        }
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
                        router.push('/feil-state')
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
            const spm = rsOppdaterSporsmalResponse.oppdatertSporsmal
            erSiste
                ? (soknad!.sporsmal[spmIndex + 1] = new Sporsmal(spm, undefined as any, true))
                : (soknad!.sporsmal[spmIndex] = new Sporsmal(spm, undefined as any, true))
        }

        queryClient.setQueriesData(['soknad', soknad.id], soknad)
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
        if (poster || senderSoknad) return
        setPoster(true)
        restFeilet = false

        try {
            settSvar(sporsmal, data)
            if (erSiste) {
                if (!erUtlandssoknad) {
                    settSvar(nesteSporsmal, data)
                    sporsmal = nesteSporsmal
                }
                const oppdatertOk = await sendOppdaterSporsmal()
                if (!oppdatertOk) {
                    return
                }
                await sendSoknad()
                logEvent('skjema fullført', {
                    soknadstype: valgtSoknad!.soknadstype,
                    skjemanavn: 'sykepengesoknad',
                })

                return
            }
            await sendOppdaterSporsmal()
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
                await router.push(pathUtenSteg(router.asPath) + SEPARATOR + (spmIndex + 2) + testpersonQuery.query())
            }
        } finally {
            setPoster(false)
        }
    }

    if (!valgtSoknad) return null

    return (
        <>
            <EndringUtenEndringModal aapen={endringUtenEndringAapen} setAapen={setEndringUtenEndringAapen} />

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onSubmitCapture={preSubmit}
                    noValidate={true} // Ikke native validation
                >
                    <GuidepanelOverSporsmalstekst sporsmal={sporsmal} />

                    <SporsmalSwitch sporsmal={sporsmal} />

                    <Vis
                        hvis={erSiste && !erUtlandssoknad}
                        render={() => (
                            <>
                                <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                                <Opplysninger ekspandert={false} steg={sporsmal.tag} />
                                <CheckboxPanel sporsmal={nesteSporsmal} />
                                <SendesTil soknad={valgtSoknad} mottaker={mottaker} />
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
