import { Alert, BodyLong, BodyShort, Button, FileObject, ReadMore, Select, TextField } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'

import { RSSvar } from '../../../types/rs-types/rs-svar'
import { Kvittering, Soknad, UtgiftTyper } from '../../../types/types'
import { AuthenticationError, fetchJsonMedRequestId } from '../../../utils/fetch'
import { formaterFilstørrelse, formattertFiltyper, maxFilstørrelse, tillatteFiltyper } from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import FilOpplaster from '../fil-opplaster/fil-opplaster'

import OpplastingTekster from './opplasting-tekster'

interface OpplastetKvittering {
    id: string
}

export interface OpplastingFromProps {
    valgtSoknad?: Soknad
    setOpenModal: (arg0: boolean) => void
    openModal: boolean
}

const OpplastingForm = ({ valgtSoknad, setOpenModal, openModal }: OpplastingFromProps) => {
    const { stegId } = useSoknadMedDetaljer()

    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    const [laster, setLaster] = useState<boolean>(false)
    const [feilmelding, setFeilmelding] = useState<string>()

    const [valgtFil, setValgtFil] = useState<FileObject[]>([])

    const MAX_FILE_SIZE_IN_MEGA_BYTES = 10

    const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MEGA_BYTES * 1024 * 1024

    const methods = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })

    useEffect(() => {
        methods.reset()
        methods.clearErrors()
        setValgtFil([])
    }, [openModal, methods])

    if (!valgtSoknad) return null

    const maks = formaterFilstørrelse(maxFilstørrelse)
    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1
    const sporsmal = valgtSoknad.sporsmal[spmIndex]

    const onSubmit = async () => {
        try {
            setLaster(true)
            setFeilmelding(undefined)

            const valid = await methods.trigger()

            if (valgtFil.length < 1) {
                methods.setError('fil_input', {
                    type: 'manual',
                    message: tekst('opplasting_modal.filopplasting.feilmelding'),
                })
                return
            }

            if (valgtFil !== undefined && !tillatteFiltyper.split(',').includes(valgtFil[0].file.type)) {
                methods.setError('fil_input', {
                    type: 'manual',
                    message: getLedetekst(tekst('drag_and_drop.filtype'), {
                        '%FILNAVN%': valgtFil[0].file.name,
                        '%TILLATTEFILTYPER%': formattertFiltyper,
                    }),
                })
                return
            }

            if (valgtFil.length > 1) {
                methods.setError('fil_input', {
                    type: 'manual',
                    message: 'Du kan ikke laste opp mer enn en fil',
                })
                return
            }

            if (valgtFil.length > 0 && valgtFil[0].file.size > MAX_FILE_SIZE_IN_BYTES) {
                methods.setError('fil_input', {
                    type: 'manual',
                    message: getLedetekst(tekst('drag_and_drop.maks'), {
                        '%FILNAVN%': valgtFil[0].file.name,
                        '%MAKSSTOR%': maks,
                    }),
                })
                return
            }

            if (!valid) return

            const opplastingResponse: OpplastetKvittering = await lastOppKvittering()
            if (!opplastingResponse) return

            await lagreSvar(opplastingResponse)

            await queryClient.invalidateQueries({
                queryKey: ['soknad', valgtSoknad.id],
            })

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
        requestData.append('file', valgtFil[0].file as Blob)

        // TODO: Gjør om til mutation
        return await fetchJsonMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/opplasting`,
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

        // TODO: Gjør om til mutation
        return await fetchJsonMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad.id}/sporsmal/${
                sporsmal.id
            }/svar${testpersonQuery.query()}`,
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
            <form key="opplasting_form" data-cy="opplasting-form">
                <BodyShort>
                    {getLedetekst(tekst('opplasting_modal.filtyper'), {
                        '%FILTYPER%': formattertFiltyper,
                    })}
                    <br />
                    {getLedetekst(tekst('opplasting_modal.maksfilstr'), {
                        '%MAKSFILSTR%': maks,
                    })}
                </BodyShort>

                <ReadMore className="mt-4" header={OpplastingTekster['soknad.info.kvitteringer-PDF-tittel']}>
                    <BodyLong>{OpplastingTekster['soknad.info.kvitteringer-PDF-tekst']}</BodyLong>
                </ReadMore>

                <Select
                    className="mt-4"
                    label={tekst('opplasting_modal.type-utgift.label')}
                    {...methods.register('transportmiddel', {
                        required: tekst('opplasting_modal.transportmiddel.feilmelding'),
                    })}
                    id="transportmiddel"
                    name="transportmiddel"
                    error={methods.formState.errors['transportmiddel']?.message?.toString()}
                >
                    <option value="">Velg</option>
                    {Object.entries(UtgiftTyper).map((keyval) => (
                        <option value={keyval[0]} id={keyval[0]} key={keyval[0]}>
                            {keyval[1]}
                        </option>
                    ))}
                </Select>

                <Controller
                    name="belop_input"
                    control={methods.control}
                    rules={{
                        validate: (val) => {
                            if (!val) return 'Du må skrive inn beløp'
                            if (val < 0) return 'Beløp kan ikke være negativt'
                            if (val > 1000000) return 'Beløp kan ikke være større enn 1 000 000'
                            return true
                        },
                    }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <TextField
                            className="mt-4"
                            label={tekst('opplasting_modal.tittel')}
                            description={tekst('soknad.undertekst.OFFENTLIG_TRANSPORT_BELOP')}
                            type="number"
                            inputMode="decimal"
                            step={0.01}
                            autoComplete="off"
                            name="belop_input"
                            error={methods.formState.errors['belop_input']?.message?.toString()}
                            value={value}
                            onChange={(e) => {
                                const val = e.target.value?.toString()
                                if (!val) {
                                    onChange('')
                                } else {
                                    const valNum = Number(val.replace(',', '.').replace(/ /g, ''))
                                    const valRound = Math.round(valNum * 100) / 100
                                    onChange(valRound)
                                }
                            }}
                            onBlur={onBlur}
                            ref={ref}
                        />
                    )}
                />

                <div className="mt-4">
                    <FilOpplaster valgtFil={valgtFil} setValgtFil={setValgtFil} />
                </div>
                {feilmelding && (
                    <Alert variant="warning" className="mt-8">
                        <BodyShort>{feilmelding}</BodyShort>
                    </Alert>
                )}

                <div className="mt-8 flex gap-4">
                    <Button variant="primary" type="button" onClick={onSubmit} loading={laster}>
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
