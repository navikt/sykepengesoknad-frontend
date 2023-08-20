import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { TagTyper } from '../../../types/enums'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../../types/types'
import { SEPARATOR } from '../../../utils/constants'
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
import { UseTestpersonQuery } from '../../../hooks/useTestpersonQuery'
import { useOppdaterSporsmal } from '../../../hooks/useOppdaterSporsmal'
import { FeilStateView } from '../../feil/refresh-hvis-feil-state'

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
    const erUtlandssoknad = valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND

    const erSisteSpm = () => {
        const snartSlutt =
            sporsmal.svartype === RSSvartype.IKKE_RELEVANT || sporsmal.svartype === RSSvartype.CHECKBOX_PANEL
        if (erUtlandssoknad) {
            return sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
        }
        return snartSlutt && spmIndex === valgtSoknad.sporsmal.length - 2
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

    const { data: korrigerer } = useSoknad(valgtSoknad.korrigerer, valgtSoknad.korrigerer !== undefined)

    const erSiste = erSisteSpm()
    const [endringUtenEndringAapen, setEndringUtenEndringAapen] = useState<boolean>(false)
    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })
    const nesteSporsmal = valgtSoknad.sporsmal[spmIndex + 1]

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
        if (valgtSoknad.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
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

        return new Promise<void>(async (resolve) => {
            const oppdatertSporsmalMedSvar = () => {
                if (erSiste && !erUtlandssoknad) {
                    return settSvar(nesteSporsmal, data)
                }
                return settSvar(sporsmal, data)
            }

            const onSuccessLogic = async (isLast: boolean) => {
                if (isLast) {
                    logEvent('skjema fullført', {
                        soknadstype: valgtSoknad.soknadstype,
                        skjemanavn: 'sykepengesoknad',
                    })
                    sendSoknad()
                } else {
                    logEvent('skjema spørsmål besvart', {
                        soknadstype: valgtSoknad.soknadstype,
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
                    <GuidepanelOverSporsmalstekst sporsmal={sporsmal} />

                    <SporsmalSwitch sporsmal={sporsmal} sporsmalIndex={0} erSisteSporsmal={erSiste} />

                    <Vis
                        hvis={erSiste && !erUtlandssoknad}
                        render={() => (
                            <>
                                <Oppsummering ekspandert={false} sporsmal={valgtSoknad.sporsmal} />
                                <Opplysninger ekspandert={false} />
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
                        render={() => (
                            <FeilOppsummering valgtSoknad={valgtSoknad} sporsmal={sporsmal} sendError={sendError} />
                        )}
                    />

                    {oppdaterError && !oppdatererSporsmal && <FeilStateView></FeilStateView>}
                    <Vis
                        hvis={skalViseKnapperad(valgtSoknad, sporsmal, methods.getValues())}
                        render={() => <Knapperad soknad={valgtSoknad} poster={oppdatererSporsmal || senderSoknad} />}
                    />
                </form>
            </FormProvider>
        </>
    )
}

export default SporsmalForm
