import { Alert, BodyLong, BodyShort, Button, Heading, Label, ReadMore } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { RouteParams } from '../../../app'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSSvar } from '../../../types/rs-types/rs-svar'
import { Kvittering, Soknad, Sporsmal, UtgiftTyper } from '../../../types/types'
import { AuthenticationError, fetchJsonMedRequestId } from '../../../utils/fetch'
import { formaterFilstørrelse, formattertFiltyper, maxFilstørrelse } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

import OpplastingTekster from './opplasting-tekster'
import styles from './opplasting-form.module.css'
interface OpplastetKvittering {
    id: string
}

export interface OpplastingFromProps {
    valgtSoknad?: Soknad
    valgtKvittering?: Kvittering
    setOpenModal: (arg0: boolean) => void
    valgtFil?: File
    setValgtFil: (arg0?: File) => void
}

const OpplastingForm = ({ valgtSoknad, valgtKvittering, setOpenModal, valgtFil, setValgtFil }: OpplastingFromProps) => {
    const { stegId } = useParams<RouteParams>()
    const queryClient = useQueryClient()

    const [laster, setLaster] = useState<boolean>(false)
    const [feilmelding, setFeilmelding] = useState<string>()

    const methods = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })

    if (!valgtSoknad) return null

    const maks = formaterFilstørrelse(maxFilstørrelse)
    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1
    const sporsmal = valgtSoknad.sporsmal[spmIndex]
    const formErDisabled = valgtKvittering !== undefined

    const onSubmit = async () => {
        try {
            setLaster(true)
            setFeilmelding(undefined)

            const valid = await methods.trigger()
            if (!valid) return

            const opplastingResponse: OpplastetKvittering = await lastOppKvittering()
            if (!opplastingResponse) return

            const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse = await lagreSvar(opplastingResponse)
            if (!rsOppdaterSporsmalResponse) return

            valgtSoknad.sporsmal[spmIndex] = new Sporsmal(rsOppdaterSporsmalResponse.oppdatertSporsmal, null, true)
            queryClient.setQueriesData(['soknad', valgtSoknad!.id], valgtSoknad)

            setOpenModal(false)
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                logger.warn(e)
            }
            setFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        } finally {
            setLaster(false)
        }
    }

    const lastOppKvittering = async () => {
        const requestData = new FormData()
        requestData.append('file', valgtFil as Blob)

        return await fetchJsonMedRequestId(
            '/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/opplasting',
            {
                method: 'POST',
                body: requestData,
                credentials: 'include',
            },
            (response) => {
                if (response.status === 413) {
                    setFeilmelding('Filen du prøvde å laste opp er for stor.')
                } else {
                    setFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere.')
                }
            },
        )
    }

    const lagreSvar = async (opplastingResponse: OpplastetKvittering) => {
        const kvittering: Kvittering = {
            blobId: opplastingResponse.id,
            belop: methods.getValues('belop_input') * 100,
            typeUtgift: methods.getValues('transportmiddel'),
            opprettet: dayjs().toISOString(),
        }
        const svar: RSSvar = { verdi: JSON.stringify(kvittering) }

        return await fetchJsonMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad.id}/sporsmal/${sporsmal.id}/svar`,
            {
                method: 'POST',
                body: JSON.stringify(svar),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            },
        )
    }

    return (
        <FormProvider {...methods}>
            <form className="opplasting-form" key="opplasting_form" data-cy="opplasting-form">
                <Heading size="medium" id="opplasting-modal" className="mr-10 mt-1" spacing>
                    {tekst('opplasting_modal.nytt-utlegg.tittel')}
                </Heading>
                <BodyShort className="restriksjoner">
                    <span className="filtype">
                        {getLedetekst(tekst('opplasting_modal.filtyper'), {
                            '%FILTYPER%': formattertFiltyper,
                        })}
                    </span>
                    <span className="filstr">
                        {getLedetekst(tekst('opplasting_modal.maksfilstr'), {
                            '%MAKSFILSTR%': maks,
                        })}
                    </span>
                </BodyShort>
                <ReadMore className={styles.pdfHjelp} header={OpplastingTekster['soknad.info.kvitteringer-PDF-tittel']}>
                    <BodyLong>{OpplastingTekster['soknad.info.kvitteringer-PDF-tekst']}</BodyLong>
                </ReadMore>

                <div className="skjemakolonner">
                    <div className="skjemaelement">
                        <label htmlFor="transportmiddel" className="skjemaelement__label">
                            {tekst('opplasting_modal.type-utgift.label')}
                        </label>
                        <select
                            disabled={formErDisabled}
                            {...methods.register('transportmiddel', {
                                required: tekst('opplasting_modal.transportmiddel.feilmelding'),
                            })}
                            className={
                                'skjemaelement__input input--fullbredde kvittering-element' +
                                (methods.formState.errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            id="transportmiddel"
                            name="transportmiddel"
                            defaultValue={valgtKvittering?.typeUtgift}
                        >
                            <option value="">Velg</option>
                            {Object.entries(UtgiftTyper).map((keyval, idx) => {
                                return (
                                    <option value={keyval[0]} id={keyval[0]} key={idx}>
                                        {keyval[1]}
                                    </option>
                                )
                            })}
                        </select>

                        <div role="alert" aria-live="assertive">
                            <BodyLong as="span" className="skjemaelement__feilmelding">
                                <Vis
                                    hvis={methods.formState.errors['transportmiddel']}
                                    render={() => <>{methods.formState.errors['transportmiddel']?.message}</>}
                                />
                            </BodyLong>
                        </div>
                    </div>

                    <div className="skjemaelement">
                        <label htmlFor="belop_input" className="skjemaelement__label">
                            <Label as="strong">{tekst('opplasting_modal.tittel')}</Label>
                        </label>
                        <input
                            type="number"
                            id="belop_input"
                            {...methods.register('belop_input', {
                                required: tekst('opplasting_modal.belop.feilmelding'),
                                min: {
                                    value: 0,
                                    message: 'Beløp kan ikke være negativt',
                                },
                                max: {
                                    value: 10000,
                                    message: 'Beløp kan ikke være større enn 10 000',
                                },
                                validate: (val) => {
                                    let belop = val.toString()
                                    belop = Number(belop.replace(',', '.').replace(/ /g, ''))
                                    belop = Math.round(belop * 100) / 100
                                    methods.setValue('belop_input', belop)
                                    return true
                                },
                            })}
                            defaultValue={valgtKvittering?.belop ? valgtKvittering.belop / 100 : ''}
                            className={
                                'skjemaelement__input input--s periode-element' +
                                (methods.formState.errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            inputMode="decimal"
                            step={0.01}
                            autoComplete="off"
                            disabled={formErDisabled}
                        />
                        <span className="enhet">kr</span>

                        <div role="alert" aria-live="assertive">
                            <Vis
                                hvis={methods.formState.errors['belop_input']?.message}
                                render={() => (
                                    <BodyShort as="span" className="skjemaelement__feilmelding">
                                        <>{methods.formState.errors['belop_input']?.message}</>
                                    </BodyShort>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <DragAndDrop valgtFil={valgtFil} setValgtFil={setValgtFil} valgtKvittering={valgtKvittering} />

                <div className="knapperad" data-cy="knapperad">
                    <Vis
                        hvis={feilmelding}
                        render={() => (
                            <Alert variant="warning">
                                <BodyShort>{feilmelding}</BodyShort>
                            </Alert>
                        )}
                    />
                    <Button variant="primary" type="button" className="mr-3" onClick={onSubmit} loading={laster}>
                        {tekst('opplasting_modal.bekreft')}
                    </Button>

                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                            setOpenModal(false)
                        }}
                        data-cy="opplasting-modal-tilbake"
                    >
                        {tekst('opplasting_modal.tilbake')}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default OpplastingForm
