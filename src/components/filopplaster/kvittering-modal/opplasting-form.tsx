import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    Heading,
    Label,
} from '@navikt/ds-react'
import dayjs from 'dayjs'
import parser from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { useAppStore } from '../../../data/stores/app-store'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSSvar } from '../../../types/rs-types/rs-svar'
import { Kvittering, Sporsmal, UtgiftTyper } from '../../../types/types'
import {
    formaterFilstørrelse,
    formattertFiltyper,
    maxFilstørrelse,
} from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { Ekspanderbar } from '../../ekspanderbar/ekspanderbar'
import Slettknapp from '../../slettknapp/slettknapp'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'
import Vis from '../../vis'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

interface OpplastetKvittering {
    id: string
}

const OpplastingForm = ({ sporsmal }: SpmProps) => {
    const {
        valgtSoknad,
        setValgtSoknad,
        valgtKvittering,
        setOpenModal,
        valgtFil,
        setFeilmeldingTekst,
    } = useAppStore()
    const [laster, setLaster] = useState<boolean>(false)
    const [kvitteringHeader, setKvitteringHeader] = useState<string>('')
    const [formErDisabled, setFormErDisabled] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1
    const maks = formaterFilstørrelse(maxFilstørrelse)

    const methods = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })

    useEffect(() => {
        if (valgtKvittering) {
            setKvitteringHeader(tekst('opplasting_modal.endre-utlegg.tittel'))
            setFormErDisabled(true)
        } else {
            setKvitteringHeader(tekst('opplasting_modal.nytt-utlegg.tittel'))
            setFormErDisabled(false)
        }
        // eslint-disable-next-line
    }, [valgtSoknad, valgtKvittering])

    const onSubmit = async () => {
        try {
            setLaster(true)
            setFeilmeldingTekst('')

            const valid = await methods.trigger()
            if (!valid) return

            const opplastingResponse: OpplastetKvittering =
                await opplastingTilBucket()
            if (!opplastingResponse) return

            const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse =
                await lagreSvarISyfosoknad(opplastingResponse)
            if (!rsOppdaterSporsmalResponse) return

            valgtSoknad!.sporsmal[spmIndex] = new Sporsmal(
                rsOppdaterSporsmalResponse.oppdatertSporsmal,
                null,
                true
            )
            setValgtSoknad(valgtSoknad)
            setOpenModal(false)
        } catch (ex) {
            setFeilmeldingTekst(
                'Det skjedde en feil i baksystemene, prøv igjen senere'
            )
        } finally {
            setLaster(false)
        }
    }

    const opplastingTilBucket = async () => {
        const requestData = new FormData()
        requestData.append('file', valgtFil as Blob)
        const bucketRes = await fetch(
            '/syk/sykepengesoknad/api/flex-bucket-uploader/api/v2/opplasting',
            {
                method: 'POST',
                body: requestData,
                credentials: 'include',
            }
        )

        if (bucketRes.ok) {
            return bucketRes.json()
        } else if (redirectTilLoginHvis401(bucketRes)) {
            return null
        } else if (bucketRes.status === 413) {
            logger.warn(
                'Feil under opplasting fordi filen du prøvde å laste opp er for stor'
            )
            setFeilmeldingTekst('Filen du prøvde å laste opp er for stor')
            return null
        } else {
            logger.warn('Feil under opplasting av kvittering')
            setFeilmeldingTekst(
                'Det skjedde en feil i baksystemene, prøv igjen senere'
            )
            return null
        }
    }

    const lagreSvarISyfosoknad = async (
        opplastingResponse: OpplastetKvittering
    ) => {
        const kvittering: Kvittering = {
            blobId: opplastingResponse.id,
            belop: methods.getValues('belop_input') * 100,
            typeUtgift: methods.getValues('transportmiddel'),
            opprettet: dayjs().toISOString(),
        }
        const svar: RSSvar = { verdi: JSON.stringify(kvittering) }

        const syfosoknadRes = await fetch(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                valgtSoknad!.id
            }/sporsmal/${sporsmal!.id}/svar`,
            {
                method: 'POST',
                body: JSON.stringify(svar),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (syfosoknadRes.ok) {
            return syfosoknadRes.json()
        } else if (redirectTilLoginHvis401(syfosoknadRes)) {
            return null
        } else {
            logger.warn('Feil under lagring av kvittering svar i syfosoknad')
            setFeilmeldingTekst(
                'Det skjedde en feil i baksystemene, prøv igjen senere'
            )
            return null
        }
    }

    if (!valgtSoknad) return null

    return (
        <FormProvider {...methods}>
            <form className="opplasting-form" key="opplasting_form">
                <Heading size="medium" className="opplasting-header">
                    {kvitteringHeader}
                </Heading>

                <Vis
                    hvis={formErDisabled}
                    render={() => (
                        <Alert variant="info">
                            <BodyShort>
                                {tekst(
                                    'opplasting_modal.endre-utlegg.hjelpetekst'
                                )}
                            </BodyShort>
                        </Alert>
                    )}
                />
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
                <div className="pdf-hjelp">
                    <Ekspanderbar
                        title={tekst('soknad.info.kvitteringer-PDF-tittel')}
                        sporsmalId={sporsmal.id}
                    >
                        <BodyLong>
                            {' '}
                            {parser(
                                tekst('soknad.info.kvitteringer-PDF-tekst')
                            )}{' '}
                        </BodyLong>
                    </Ekspanderbar>
                </div>
                <div className="skjemakolonner">
                    <div className="skjemaelement">
                        <label
                            htmlFor="transportmiddel"
                            className="skjemaelement__label"
                        >
                            {tekst('opplasting_modal.type-utgift.label')}
                        </label>
                        <select
                            disabled={formErDisabled}
                            {...methods.register('transportmiddel', {
                                required: tekst(
                                    'opplasting_modal.transportmiddel.feilmelding'
                                ),
                            })}
                            className={
                                'skjemaelement__input input--fullbredde kvittering-element' +
                                (methods.formState.errors['transportmiddel']
                                    ? ' skjemaelement__input--harFeil'
                                    : '')
                            }
                            id="transportmiddel"
                            name="transportmiddel"
                            defaultValue={valgtKvittering?.typeUtgift}
                        >
                            <option value="">Velg</option>
                            {Object.entries(UtgiftTyper).map((keyval, idx) => {
                                return (
                                    <option
                                        value={keyval[0]}
                                        id={keyval[0]}
                                        key={idx}
                                    >
                                        {keyval[1]}
                                    </option>
                                )
                            })}
                        </select>

                        <div role="alert" aria-live="assertive">
                            <BodyLong
                                as="span"
                                className="skjemaelement__feilmelding"
                            >
                                <Vis
                                    hvis={
                                        methods.formState.errors[
                                            'transportmiddel'
                                        ]
                                    }
                                    render={() => (
                                        <>
                                            {
                                                methods.formState.errors[
                                                    'transportmiddel'
                                                ]?.message
                                            }
                                        </>
                                    )}
                                />
                            </BodyLong>
                        </div>
                    </div>

                    <div className="skjemaelement">
                        <label
                            htmlFor="belop_input"
                            className="skjemaelement__label"
                        >
                            <Label as="strong">
                                {tekst('opplasting_modal.tittel')}
                            </Label>
                        </label>
                        <input
                            type="number"
                            id="belop_input"
                            {...methods.register('belop_input', {
                                required: tekst(
                                    'opplasting_modal.belop.feilmelding'
                                ),
                                min: {
                                    value: 0,
                                    message: 'Beløp kan ikke være negativt',
                                },
                                max: {
                                    value: 10000,
                                    message:
                                        'Beløp kan ikke være større enn 10 000',
                                },
                                validate: (val) => {
                                    let belop = val.toString()
                                    belop = Number(
                                        belop
                                            .replace(',', '.')
                                            .replace(/ /g, '')
                                    )
                                    belop = Math.round(belop * 100) / 100
                                    methods.setValue('belop_input', belop)
                                    return true
                                },
                            })}
                            defaultValue={
                                valgtKvittering?.belop
                                    ? valgtKvittering.belop / 100
                                    : ''
                            }
                            className={
                                'skjemaelement__input input--s periode-element' +
                                (methods.formState.errors['belop_input']
                                    ? ' skjemaelement__input--harFeil'
                                    : '')
                            }
                            inputMode="decimal"
                            step={0.01}
                            autoComplete="off"
                            disabled={formErDisabled}
                        />
                        <span className="enhet">kr</span>

                        <div role="alert" aria-live="assertive">
                            <Vis
                                hvis={
                                    methods.formState.errors['belop_input']
                                        ?.message
                                }
                                render={() => (
                                    <BodyShort
                                        as="span"
                                        className="skjemaelement__feilmelding"
                                    >
                                        {
                                            methods.formState.errors[
                                                'belop_input'
                                            ]?.message
                                        }
                                    </BodyShort>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <DragAndDrop />

                <div className="knapperad">
                    <Vis
                        hvis={!formErDisabled}
                        render={() => (
                            <Button
                                variant="primary"
                                type="button"
                                className="lagre-kvittering"
                                onClick={onSubmit}
                                loading={laster}
                            >
                                {tekst('opplasting_modal.bekreft')}
                            </Button>
                        )}
                    />

                    <Button
                        variant="secondary"
                        type="button"
                        className="lagre-kvittering"
                        onClick={() => {
                            setOpenModal(false)
                        }}
                    >
                        {tekst('opplasting_modal.tilbake')}
                    </Button>

                    <Vis
                        hvis={formErDisabled}
                        render={() => (
                            <Slettknapp
                                sporsmal={sporsmal}
                                kvittering={valgtKvittering!}
                            />
                        )}
                    />
                </div>
            </form>
        </FormProvider>
    )
}

export default OpplastingForm
