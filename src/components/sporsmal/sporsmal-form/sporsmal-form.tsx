import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import useFetch from '../../../data/rest/use-fetch'
import { FetchState, hasData, redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSMottakerResponse } from '../../../types/rs-types/rest-response/rs-mottakerresponse'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../../types/types'
import { SEPARATOR } from '../../../utils/constants'
import fetchMedRequestId from '../../../utils/fetch'
import { logger } from '../../../utils/logger'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import FeilOppsummering from '../../feil/feil-oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../../oppsummering/oppsummering'
import Vis from '../../vis'
import BjornOverSporsmalstekst from '../bjorn/bjorn-over-sporsmalstekst'
import { EndringUtenEndringModal } from '../endring-uten-endring/endring-uten-endring-modal'
import { harLikeSvar } from '../endring-uten-endring/har-like-svar'
import { hentFormState, hentSvar } from '../hent-svar'
import InfotekstOverSubmit from '../infotekst-over-submit'
import { settSvar } from '../sett-svar'
import SporsmalSwitch from '../sporsmal-switch'
import { pathUtenSteg } from '../sporsmal-utils'
import CheckboxPanel from '../typer/checkbox-panel'
import Knapperad from './knapperad'
import SendesTil from './sendes-til'
import skalViseKnapperad from './skal-vise-knapperad'

export interface SpmProps {
    sporsmal: Sporsmal
}

const SporsmalForm = () => {
    const { soknader, setSoknader, setValgtSoknad, valgtSoknad, mottaker, setTop, setMottaker, setFeilState } =
        useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const [erSiste, setErSiste] = useState<boolean>(false)
    const [poster, setPoster] = useState<boolean>(false)
    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(false)
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
    const rsMottakerResponseFetch = useFetch<RSMottakerResponse>()

    useEffect(() => {
        methods.reset(hentFormState(sporsmal), { keepValues: false })
        // eslint-disable-next-line
    }, [sporsmal])

    useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            methods.reset(hentFormState(sporsmal), { keepValues: false })
        }
        // eslint-disable-next-line
    }, [methods.formState.isSubmitSuccessful])

    useEffect(() => {
        function erSiste() {
            const snartSlutt =
                sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL
            if (erUtlandssoknad) {
                return sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
            }
            return snartSlutt && spmIndex === valgtSoknad!.sporsmal.length - 2
        }

        const sisteSide = erSiste()
        setErSiste(sisteSide)
        if (sisteSide) hentMottaker()
        // eslint-disable-next-line
    }, [spmIndex])

    const sendOppdaterSporsmal = async () => {
        let soknad = valgtSoknad

        let response
        try {
            response = await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${soknad!.id}/sporsmal/${
                    sporsmal.id
                }`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify(sporsmalToRS(sporsmal)),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        } catch (e) {
            restFeilet = true
            return
        }

        if (redirectTilLoginHvis401(response)) {
            return
        }

        let data
        try {
            data = await response.json()
        } catch (e) {
            logger.error('Feilet ved parsing av JSON.', e)
            restFeilet = true
            return
        }

        if (!response.ok) {
            if (['FEIL_STATUS_FOR_OPPDATER_SPORSMAL', 'SPORSMAL_FINNES_IKKE_I_SOKNAD'].includes(data.reason)) {
                setFeilState(true)
            } else {
                logger.error(`Feilet ved kall OPPDATER_SPORSMAL med uhåndtert http kode ${response.status}.`, response)
            }

            restFeilet = true
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

        soknader[soknader.findIndex((sok) => sok.id === soknad!.id)] = soknad as any
        setSoknader(soknader)
        setValgtSoknad(soknad)
    }

    const hentMottaker = () => {
        rsMottakerResponseFetch.fetch(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/finnMottaker`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            },
            (fetchState: FetchState<RSMottakerResponse>) => {
                if (hasData(fetchState)) {
                    setMottaker(fetchState.data.mottaker)
                } else {
                    logger.error(`Klarte ikke hente MOTTAKER av søknad ${fetchState.httpCode}`)
                }
            }
        )
    }

    const sendSoknad = async () => {
        if (!valgtSoknad) {
            return
        }
        if (valgtSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
            const originalSoknad = soknader.find((a) => a.id == valgtSoknad.korrigerer)

            if (originalSoknad && harLikeSvar(originalSoknad, valgtSoknad)) {
                setEndringUtenEndringAapen(true)
                return
            }
        }
        const res = await fetch(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/send`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        )

        try {
            const httpCode = res.status
            if (redirectTilLoginHvis401(res)) {
                return
            } else if ([200, 201, 203, 206].includes(httpCode)) {
                if (mottaker === RSMottaker.ARBEIDSGIVER) {
                    valgtSoknad.sendtTilArbeidsgiverDato = new Date()
                }
                if (mottaker === RSMottaker.NAV) {
                    valgtSoknad.sendtTilNAVDato = new Date()
                }
                if (mottaker === RSMottaker.ARBEIDSGIVER_OG_NAV) {
                    valgtSoknad.sendtTilArbeidsgiverDato = new Date()
                    valgtSoknad.sendtTilNAVDato = new Date()
                }

                valgtSoknad.status = RSSoknadstatus.SENDT
                setValgtSoknad(valgtSoknad)
                soknader[soknader.findIndex((sok) => sok.id === valgtSoknad.id)] = valgtSoknad
                if (valgtSoknad.korrigerer !== null) {
                    soknader.find((sok) => sok.id === valgtSoknad.korrigerer)!.status = RSSoknadstatus.KORRIGERT
                }
                setSoknader(soknader)

                history.push(`/kvittering/${valgtSoknad!.id}${window.location.search}`)
            } else {
                logger.error('Feil ved sending av søknad', res)
                restFeilet = true
            }
        } catch (e) {
            logger.error('Feil ved sending av søknad', e)
            restFeilet = true
        }
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
                    svar: hentSvar(sporsmal),
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
                        pathUtenSteg(history.location.pathname) + SEPARATOR + (spmIndex + 2) + window.location.search
                    )
                }
            }
        } finally {
            setPoster(false)
        }
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
                    <BjornOverSporsmalstekst sporsmal={sporsmal} />

                    <SporsmalSwitch sporsmal={sporsmal} />

                    <Vis
                        hvis={erSiste && !erUtlandssoknad}
                        render={() => (
                            <>
                                <Oppsummering ekspandert={false} />
                                <Opplysninger ekspandert={false} steg={sporsmal.tag} />
                                <CheckboxPanel sporsmal={nesteSporsmal} />
                                <SendesTil />
                            </>
                        )}
                    />

                    <Vis
                        hvis={erSiste && erUtlandssoknad}
                        render={() => (
                            <>
                                <Oppsummering ekspandert={false} />
                                <CheckboxPanel sporsmal={sporsmal} />
                            </>
                        )}
                    />

                    <Vis
                        hvis={
                            (valgtSoknad!.soknadstype === RSSoknadstype.REISETILSKUDD &&
                                sporsmal.svartype !== RSSvartype.KVITTERING) ||
                            valgtSoknad!.soknadstype !== RSSoknadstype.REISETILSKUDD
                        }
                        render={() => <FeilOppsummering sporsmal={sporsmal} />}
                    />

                    <InfotekstOverSubmit sporsmal={sporsmal} />

                    <Vis
                        hvis={skalViseKnapperad(valgtSoknad!, sporsmal, methods.getValues())}
                        render={() => <Knapperad poster={poster} />}
                    />
                </form>
            </FormProvider>
        </>
    )
}

export default SporsmalForm
