import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { TagTyper } from '../../../types/enums'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../../types/types'
import { SEPARATOR } from '../../../utils/constants'
import { hentAnnonymisertSvar, logEvent } from '../../amplitude/amplitude'
import FeilOppsummering from '../../feil/feil-oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../../oppsummering/oppsummering'
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
import { UseTestpersonQuery } from '../../../hooks/useTestpersonQuery'
import { useOppdaterSporsmal } from '../../../hooks/useOppdaterSporsmal'
import { FeilStateView } from '../../feil/refresh-hvis-feil-state'
import { UseSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { SkeletonSporsmal } from '../skeleton-sporsmal'

import Knapperad from './knapperad'
import SendesTil from './sendes-til'

export interface SpmProps {
    sporsmal: Sporsmal
}

const SporsmalForm = () => {
    const router = useRouter()
    const { erUtenlandssoknad, valgtSoknad, sporsmal, spmIndex } = UseSoknadMedDetaljer()
    const testpersonQuery = UseTestpersonQuery()

    const erSisteSpm = () => {
        const snartSlutt =
            sporsmal?.svartype === RSSvartype.IKKE_RELEVANT || sporsmal?.svartype === RSSvartype.CHECKBOX_PANEL
        if (erUtenlandssoknad) {
            return sporsmal?.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
        }
        return snartSlutt && spmIndex + 2 === valgtSoknad?.sporsmal?.length
    }

    const { mutate: sendSoknadMutation, isLoading: senderSoknad, error: sendError } = useSendSoknad(valgtSoknad)

    const {
        mutate: oppdaterSporsmalMutation,
        isLoading: oppdatererSporsmal,
        error: oppdaterError,
    } = useOppdaterSporsmal({
        soknad: valgtSoknad,
        spmIndex: erSisteSpm() ? spmIndex + 1 : spmIndex,
    })

    const { data: korrigerer } = useSoknad(valgtSoknad?.korrigerer, valgtSoknad?.korrigerer !== undefined)

    const erSiste = erSisteSpm()
    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(false)
    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })
    const nesteSporsmal = valgtSoknad?.sporsmal[spmIndex + 1]

    useEffect(() => {
        methods.reset(hentFormState(sporsmal), { keepValues: false })
        // Resetter formen når spørsmålet endrer seg
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sporsmal])

    useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            methods.reset(hentFormState(sporsmal), { keepValues: false })
        }
        // resetter formen når den har blitt submittet
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [methods.formState.isSubmitSuccessful])

    const sendSoknad = () => {
        if (valgtSoknad?.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
            if (korrigerer && harLikeSvar(korrigerer, valgtSoknad)) {
                setEndringUtenEndringAapen(true)
                return
            }
        }
        sendSoknadMutation()
    }

    const onSubmit = (data: Record<string, any>) => {
        if (oppdatererSporsmal || senderSoknad)
            return Promise.reject(new Error('Spørsmål oppdateres eller søknad sendes allerede'))
        if ((!nesteSporsmal && !erUtenlandssoknad) || !sporsmal) {
            return Promise.reject(new Error('Spørsmål skal være lastet for at vi kan submitte'))
        }

        return new Promise<void>(async (resolve) => {
            const oppdatertSporsmalMedSvar = () => {
                if (erSiste && !erUtenlandssoknad && nesteSporsmal) {
                    return settSvar(nesteSporsmal, data)
                }
                return settSvar(sporsmal, data)
            }

            const onSuccessLogic = async (isLast: boolean) => {
                if (isLast) {
                    logEvent('skjema fullført', {
                        soknadstype: valgtSoknad?.soknadstype,
                        skjemanavn: 'sykepengesoknad',
                    })
                    sendSoknad()
                } else {
                    logEvent('skjema spørsmål besvart', {
                        soknadstype: valgtSoknad?.soknadstype,
                        skjemanavn: 'sykepengesoknad',
                        spørsmål: sporsmal.tag,
                        svar: hentAnnonymisertSvar(sporsmal),
                    })

                    methods.clearErrors()
                    await router.push(
                        pathUtenSteg(router.asPath) + SEPARATOR + (spmIndex + 2) + testpersonQuery.query(),
                    )
                    resolve() // Resolver promise her når alt ovenfor er utført
                }
            }

            oppdaterSporsmalMutation({
                sporsmal: oppdatertSporsmalMedSvar(),
                onSuccess: () => onSuccessLogic(erSiste),
            })
        })
    }

    return (
        <>
            <EndringUtenEndringModal aapen={endringUtenEndringAapen} setAapen={setEndringUtenEndringAapen} />

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    noValidate={true} // Ikke native validation
                >
                    <GuidepanelOverSporsmalstekst />

                    {sporsmal && <SporsmalSwitch sporsmal={sporsmal} sporsmalIndex={0} erSisteSporsmal={erSiste} />}
                    {!sporsmal && <SkeletonSporsmal />}

                    {erSiste && !erUtenlandssoknad && valgtSoknad && nesteSporsmal && (
                        <>
                            <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                            <Opplysninger ekspandert={false} />
                            <CheckboxPanel sporsmal={nesteSporsmal} />
                            <SendesTil soknad={valgtSoknad} />
                        </>
                    )}

                    {erSiste && erUtenlandssoknad && valgtSoknad && sporsmal && (
                        <>
                            <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                            <CheckboxPanel sporsmal={sporsmal} />
                        </>
                    )}

                    {(valgtSoknad?.soknadstype === RSSoknadstype.REISETILSKUDD &&
                        sporsmal?.svartype !== RSSvartype.KVITTERING) ||
                        (valgtSoknad?.soknadstype !== RSSoknadstype.REISETILSKUDD && (
                            <FeilOppsummering valgtSoknad={valgtSoknad!} sporsmal={sporsmal!} sendError={sendError} />
                        ))}

                    {oppdaterError && !oppdatererSporsmal && <FeilStateView></FeilStateView>}
                    <Knapperad poster={oppdatererSporsmal || senderSoknad} />
                </form>
            </FormProvider>
        </>
    )
}

export default SporsmalForm
