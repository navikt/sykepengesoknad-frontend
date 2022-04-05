import './sporsmal-form.less'

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
import env from '../../../utils/environment'
import fetcher from '../../../utils/fetcher'
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
    const {
        soknader, setSoknader, setValgtSoknad, valgtSoknad,
        mottaker, setTop, setMottaker, setFeilState
    } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const [ erSiste, setErSiste ] = useState<boolean>(false)
    const [ poster, setPoster ] = useState<boolean>(false)
    const [ endringUtenEndringAapen, setEndringUtenEndringAapen ] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const history = useHistory()
    const spmIndex = parseInt(stegId) - 1
    const methods = useForm({
        mode: 'onBlur',
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
        function erSiste() {
            const snartSlutt = sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL
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

    const sendOppdaterSporsmal = async() => {
        let soknad = valgtSoknad

        const res = await fetcher(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${soknad!.id}/sporsmal/${sporsmal.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(sporsmalToRS(sporsmal)),
            headers: { 'Content-Type': 'application/json' }
        })

        try {
            let data: any = {}
            try {
                data = await res.json()
                // eslint-disable-next-line no-empty
            } finally {

            }

            const httpCode = res.status
            if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse = data

                if (rsOppdaterSporsmalResponse.mutertSoknad) {
                    soknad = new Soknad(rsOppdaterSporsmalResponse.mutertSoknad)
                } else {
                    const spm = rsOppdaterSporsmalResponse.oppdatertSporsmal
                    erSiste ?
                        soknad!.sporsmal[spmIndex + 1] = new Sporsmal(spm, undefined as any, true) :
                        soknad!.sporsmal[spmIndex] = new Sporsmal(spm, undefined as any, true)
                }
                soknader[soknader.findIndex(sok => sok.id === soknad!.id)] = soknad as any
                setSoknader(soknader)
                setValgtSoknad(soknad)
            } else if (httpCode === 400 && data !== null && typeof data === 'object' && data.reason === 'FEIL_STATUS_FOR_OPPDATER_SPORSMAL') {
                logger.warn('FEIL_STATUS_FOR_OPPDATER_SPORSMAL, gir bruker mulighet for å refreshe siden for å resette state')
                restFeilet = true
                setFeilState(true)

            } else if (httpCode === 400 && data !== null && typeof data === 'object' && data.reason === 'SPORSMAL_FINNES_IKKE_I_SOKNAD') {
                logger.warn('SPORSMAL_FINNES_IKKE_I_SOKNAD, gir bruker mulighet for å refreshe siden for å resette state')
                restFeilet = true
                setFeilState(true)
            } else {
                if (redirectTilLoginHvis401(res)) {
                    return
                }
                logger.error(`Feil ved kall OPPDATER_SPORSMAL, uhåndtert http kode ${httpCode}`, res)
                restFeilet = true
            }
        } catch (e) {
            logger.error('Feil ved kall OPPDATER_SPORSMAL med exception', e)
            restFeilet = true
        }
    }

    const hentMottaker = () => {
        rsMottakerResponseFetch.fetch(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${valgtSoknad!.id}/finnMottaker`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSMottakerResponse>) => {
            if (hasData(fetchState)) {
                setMottaker(fetchState.data.mottaker)
            } else {
                logger.error('Klarte ikke hente MOTTAKER av søknad', fetchState)
            }
        })
    }

    const sendSoknad = async() => {
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
        const res = await fetcher(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${valgtSoknad.id}/send`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        try {
            const httpCode = res.status
            if (redirectTilLoginHvis401(res)) {
                return
            } else if ([ 200, 201, 203, 206 ].includes(httpCode)) {
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

                history.push(pathUtenSteg(history.location.pathname).replace('soknader', 'kvittering'))
                valgtSoknad.status = RSSoknadstatus.SENDT
                setValgtSoknad(valgtSoknad)
                soknader[soknader.findIndex(sok => sok.id === valgtSoknad.id)] = valgtSoknad
                if (valgtSoknad.korrigerer !== null) {
                    soknader.find(sok => sok.id === valgtSoknad.korrigerer)!.status = RSSoknadstatus.KORRIGERT
                }
                setSoknader(soknader)
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

    const onSubmit = async(data: any) => {
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
                logEvent('skjema fullført', { soknadstype: valgtSoknad!.soknadstype })
            } else {
                await sendOppdaterSporsmal()
                logEvent(
                    'Spørsmål svart',
                    {
                        soknadstype: valgtSoknad!.soknadstype,
                        sporsmalstag: sporsmal.tag,
                        svar: hentSvar(sporsmal)
                    }
                )
            }

            if (restFeilet) {
                methods.setError(
                    'syfosoknad',
                    { type: 'rest-feilet', message: 'Beklager, det oppstod en feil' }
                )
                sporsmal = valgtSoknad!.sporsmal[spmIndex]
            } else {
                methods.clearErrors()
                setTop(0)
                if (!erSiste) {
                    history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (spmIndex + 2))
                }
            }
        } finally {
            setPoster(false)
        }
    }

    return (<>
        <EndringUtenEndringModal
            aapen={endringUtenEndringAapen}
            setAapen={setEndringUtenEndringAapen}
        />

        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}
                onSubmitCapture={preSubmit}
                noValidate={true}   // Ikke native validation
                className={'sporsmal__form ' + nesteSporsmal?.tag?.toLowerCase()}>

                <BjornOverSporsmalstekst sporsmal={sporsmal} />

                <SporsmalSwitch sporsmal={sporsmal} />

                <Vis hvis={erSiste && !erUtlandssoknad}
                    render={() =>
                        <>
                            <Oppsummering ekspandert={false} />
                            <Opplysninger ekspandert={false} steg={sporsmal.tag} visPersonvern={false} />
                            <CheckboxPanel sporsmal={nesteSporsmal} />
                            <SendesTil />
                        </>
                    }
                />

                <Vis hvis={erSiste && erUtlandssoknad}
                    render={() =>
                        <>
                            <Oppsummering ekspandert={false} />
                            <CheckboxPanel sporsmal={sporsmal} />
                        </>
                    }
                />

                <Vis hvis={
                    (valgtSoknad!.soknadstype === RSSoknadstype.REISETILSKUDD
                            && sporsmal.svartype !== RSSvartype.KVITTERING)
                        || valgtSoknad!.soknadstype !== RSSoknadstype.REISETILSKUDD
                } render={() =>
                    <FeilOppsummering sporsmal={sporsmal} />
                } />

                <InfotekstOverSubmit sporsmal={sporsmal} />

                <Vis hvis={skalViseKnapperad(valgtSoknad!, sporsmal, methods.getValues())}
                    render={() => <Knapperad poster={poster} />}
                />
            </form>
        </FormProvider>
    </>
    )
}

export default SporsmalForm
