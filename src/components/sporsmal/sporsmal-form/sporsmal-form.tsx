import { logger } from '@navikt/next-logger'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../../types/types'
import { SEPARATOR } from '../../../utils/constants'
import fetchMedRequestId, { AuthenticationError, fetchJsonMedRequestId } from '../../../utils/fetch'
import { hentAnnonymisertSvar, useAmplitudeInstance } from '../../amplitude/amplitude'
import FeilOppsummering from '../../feil/feil-oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../../oppsummering/oppsummering'
import Vis from '../../vis'
import BjornOverSporsmalstekst from '../bjorn/bjorn-over-sporsmalstekst'
import { EndringUtenEndringModal } from '../endring-uten-endring/endring-uten-endring-modal'
import { hentFormState } from '../hent-svar'
import InfotekstOverSubmit from '../infotekst-over-submit'
import { settSvar } from '../sett-svar'
import SporsmalSwitch from '../sporsmal-switch'
import { pathUtenSteg } from '../sporsmal-utils'
import CheckboxPanel from '../typer/checkbox-panel'
import useSoknad from '../../../hooks/useSoknad'

import Knapperad from './knapperad'
import SendesTil from './sendes-til'
import skalViseKnapperad from './skal-vise-knapperad'

export interface SpmProps {
    sporsmal: Sporsmal
}

const SporsmalForm = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()

    const { setTop, setMottaker, setFeilState } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const [erSiste, setErSiste] = useState<boolean>(false)
    const [poster, setPoster] = useState<boolean>(false)
    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(true)
    const { stegId } = useParams<RouteParams>()
    const history = useHistory()
    const spmIndex = parseInt(stegId) - 1
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
        const snartSlutt =
            sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL
        if (erUtlandssoknad) {
            return sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
        }
        return snartSlutt && spmIndex === valgtSoknad!.sporsmal.length - 2
    }

    const sendOppdaterSporsmal = async () => {
        let soknad = valgtSoknad

        let data
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
                (response) => {
                    if (response.status === 400) {
                        setFeilState(true)
                    }
                    restFeilet = true
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.error(e)
            }
            return
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

        queryClient.setQueriesData(['soknad', id], soknad)
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
                logger.error(e)
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

        if (endringUtenEndringAapen) {
            return
        }

        try {
            await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad.id}/send`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                restFeilet = true
                logger.error(e)
            }
            return
        }

        if (valgtSoknad.korrigerer !== null) {
            await queryClient.invalidateQueries(['soknad', valgtSoknad.korrigerer])
        }
        await queryClient.invalidateQueries(['soknad', valgtSoknad.id])
        await queryClient.invalidateQueries(['soknader'])

        history.push(`/kvittering/${valgtSoknad.id}${window.location.search}`)
    }

    const preSubmit = () => {
        methods.clearErrors('syfosoknad')
    }

    const onSubmit = async (data: any) => {
        if (poster) return
        setPoster(true)
        restFeilet = false
        try {
            settSvar(sporsmal, data)
            if (erSiste) {
                if (!erUtlandssoknad) {
                    settSvar(nesteSporsmal, data)
                    sporsmal = nesteSporsmal
                }
                await sendOppdaterSporsmal()

                await sendSoknad()
                logEvent('skjema fullført', {
                    soknadstype: valgtSoknad!.soknadstype,
                    skjemanavn: 'sykepengesoknad',
                })
            } else {
                await sendOppdaterSporsmal()
                logEvent('skjema spørsmål besvart', {
                    soknadstype: valgtSoknad!.soknadstype,
                    skjemanavn: 'sykepengesoknad',
                    spørsmål: sporsmal.tag,
                    svar: hentAnnonymisertSvar(sporsmal),
                })
            }

            if (restFeilet) {
                methods.setError('syfosoknad', {
                    type: 'rest-feilet',
                    message: 'Beklager, det oppstod en feil',
                })
                sporsmal = valgtSoknad!.sporsmal[spmIndex]
            } else {
                methods.clearErrors()
                setTop(0)
                if (!erSiste) {
                    history.push(
                        pathUtenSteg(history.location.pathname) + SEPARATOR + (spmIndex + 2) + window.location.search,
                    )
                }
            }
        } finally {
            setPoster(false)
        }
    }

    if (!valgtSoknad) return null

    return (
        <>
            <EndringUtenEndringModal
                aapen={endringUtenEndringAapen}
                setAapen={setEndringUtenEndringAapen}
                erSiste={erSiste}
            />

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onSubmitCapture={preSubmit}
                    noValidate={true} // Ikke native validation
                    className={'sporsmal__form ' + nesteSporsmal?.tag?.toLowerCase()}
                >
                    <BjornOverSporsmalstekst sporsmal={sporsmal} />

                    <SporsmalSwitch sporsmal={sporsmal} />

                    <Vis
                        hvis={erSiste && !erUtlandssoknad}
                        render={() => (
                            <>
                                <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                                <Opplysninger ekspandert={false} steg={sporsmal.tag} />
                                <CheckboxPanel sporsmal={nesteSporsmal} />
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
                        render={() => <FeilOppsummering sporsmal={sporsmal} />}
                    />

                    <InfotekstOverSubmit soknad={valgtSoknad} sporsmal={sporsmal} />

                    <Vis
                        hvis={skalViseKnapperad(valgtSoknad, sporsmal, methods.getValues())}
                        render={() => <Knapperad soknad={valgtSoknad} poster={poster} />}
                    />
                </form>
            </FormProvider>
        </>
    )
}

export default SporsmalForm
