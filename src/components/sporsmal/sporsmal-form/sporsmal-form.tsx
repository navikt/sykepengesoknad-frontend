import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../../types/types'
import { SEPARATOR } from '../../../utils/constants'
import { hentAnnonymisertSvar, logEvent } from '../../amplitude/amplitude'
import FeilOppsummering from '../../feil/feil-oppsummering'
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
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'
import { useOppdaterSporsmal } from '../../../hooks/useOppdaterSporsmal'
import { FeilStateView } from '../../feil/refresh-hvis-feil-state'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'

import Knapperad from './knapperad'
import SendesTil from './sendes-til'

export interface SpmProps {
    sporsmal: Sporsmal
}

const SporsmalForm = ({ sporsmal }: SpmProps) => {
    const router = useRouter()
    const testpersonQuery = useTestpersonQuery()

    const { erUtenlandssoknad, valgtSoknad, spmIndex, stegNo } = useSoknadMedDetaljer()
    const { data: korrigerer } = useSoknad(valgtSoknad?.korrigerer, valgtSoknad?.korrigerer !== undefined)
    const { mutate: sendSoknadMutation, isLoading: senderSoknad, error: sendError } = useSendSoknad()
    const {
        mutate: oppdaterSporsmalMutation,
        isLoading: oppdatererSporsmal,
        error: oppdaterError,
    } = useOppdaterSporsmal()

    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(false)
    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldUnregister: true,
        defaultValues: hentFormState(sporsmal),
    })

    const erSisteSpm = () => {
        const snartSlutt = [
            RSSvartype.IKKE_RELEVANT,
            RSSvartype.CHECKBOX_PANEL,
            RSSvartype.BEKREFTELSESPUNKTER,
        ].includes(sporsmal!.svartype)
        if (!snartSlutt) {
            return false
        }
        if (
            sporsmal!.svartype === RSSvartype.BEKREFTELSESPUNKTER ||
            sporsmal!.tag === 'BEKREFT_OPPLYSNINGER_UTLAND_INFO'
        ) {
            return valgtSoknad?.sporsmal?.length === stegNo
        }
        return valgtSoknad?.sporsmal?.length === stegNo + 1
    }

    const erSiste = erSisteSpm()
    const nesteSporsmal = valgtSoknad?.sporsmal[spmIndex + 1]

    const sendSoknad = (oppdatertSoknad: Soknad) => {
        if (oppdatertSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
            if (korrigerer && harLikeSvar(korrigerer, oppdatertSoknad)) {
                setEndringUtenEndringAapen(true)
                return
            }
        }
        sendSoknadMutation(oppdatertSoknad)
    }

    const onSubmit = (data: Record<string, any>) => {
        if (oppdatererSporsmal || senderSoknad)
            return Promise.reject(new Error('Spørsmål oppdateres eller søknad sendes allerede'))
        if (!sporsmal) {
            return Promise.reject(new Error('Spørsmål skal være lastet for at vi kan submitte'))
        }
        if (!nesteSporsmal && !erUtenlandssoknad && sporsmal.tag == 'VAER_KLAR_OVER_AT') {
            return Promise.reject(new Error('Neste spørsmål skal være lastet for at vi kan submitte'))
        }
        if (!valgtSoknad) {
            return Promise.reject(new Error('Søknad skal være lastet for at vi kan submitte'))
        }

        return new Promise<void>(async (resolve) => {
            const oppdatertSporsmalMedSvar = () => {
                if (erSiste && !erUtenlandssoknad && nesteSporsmal) {
                    return settSvar(nesteSporsmal, data)
                }
                return settSvar(sporsmal, data)
            }

            const onSuccessLogic = async (isLast: boolean, oppdatertSoknad: Soknad) => {
                if (isLast) {
                    logEvent('skjema fullført', {
                        soknadstype: oppdatertSoknad.soknadstype,
                        skjemanavn: 'sykepengesoknad',
                    })
                    sendSoknad(oppdatertSoknad)
                } else {
                    logEvent('skjema spørsmål besvart', {
                        soknadstype: oppdatertSoknad.soknadstype,
                        skjemanavn: 'sykepengesoknad',
                        spørsmål: sporsmal.tag,
                        svar: hentAnnonymisertSvar(sporsmal),
                    })

                    await router.push(
                        pathUtenSteg(router.asPath) + SEPARATOR + (spmIndex + 2) + testpersonQuery.query(),
                    )
                    resolve() // Resolver promise her når alt ovenfor er utført
                }
            }

            oppdaterSporsmalMutation({
                sporsmal: oppdatertSporsmalMedSvar(),
                onSuccess: (oppdatertSoknad) => onSuccessLogic(erSiste, oppdatertSoknad),
                soknad: valgtSoknad,
                spmIndex: erSiste ? spmIndex + 1 : spmIndex,
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

                    <SporsmalSwitch
                        sporsmal={sporsmal}
                        sporsmalIndex={0}
                        erSisteSporsmal={erSiste}
                        erHovedsporsmal={true}
                    />

                    {erSiste && !erUtenlandssoknad && valgtSoknad && nesteSporsmal && (
                        <>
                            <Oppsummering
                                ekspandert={false}
                                sporsmal={valgtSoknad.sporsmal}
                                parent="sporsmal-form-vanlig"
                            />
                            <Opplysninger ekspandert={false} />
                            {erSiste && !erUtenlandssoknad && valgtSoknad && <SendesTil soknad={valgtSoknad} />}
                            <CheckboxPanel sporsmal={nesteSporsmal} />
                        </>
                    )}

                    {erSiste && sporsmal.tag === 'BEKREFT_OPPLYSNINGER_UTLAND_INFO' && valgtSoknad && sporsmal && (
                        <>
                            <Oppsummering
                                ekspandert={false}
                                sporsmal={valgtSoknad.sporsmal}
                                parent="sporsmal-form-utland"
                            />
                            <CheckboxPanel sporsmal={sporsmal} />
                        </>
                    )}

                    {(valgtSoknad?.soknadstype === RSSoknadstype.REISETILSKUDD &&
                        sporsmal.svartype !== RSSvartype.KVITTERING) ||
                        (valgtSoknad?.soknadstype !== RSSoknadstype.REISETILSKUDD && (
                            <FeilOppsummering valgtSoknad={valgtSoknad!} sporsmal={sporsmal!} sendError={sendError} />
                        ))}

                    {oppdaterError && !oppdatererSporsmal && (
                        <FeilStateView feilmelding={oppdaterError?.status}></FeilStateView>
                    )}
                    <Knapperad poster={oppdatererSporsmal || senderSoknad} />
                </form>
            </FormProvider>
        </>
    )
}

export default SporsmalForm
