import './opplasting-form.less'

import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'
import AlertStripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { useAppStore } from '../../../data/stores/app-store'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSSvar } from '../../../types/rs-types/rs-svar'
import { Kvittering, Sporsmal, UtgiftTyper } from '../../../types/types'
import env from '../../../utils/environment'
import fetcher from '../../../utils/fetcher'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Slettknapp from '../../slettknapp/slettknapp'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'
import Vis from '../../vis'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

interface OpplastetKvittering {
    id: string;
}

const OpplastingForm = ({ sporsmal }: SpmProps) => {
    const {
        valgtSoknad, setValgtSoknad, valgtKvittering, setOpenModal, valgtFil, feilmeldingTekst, setFeilmeldingTekst
    } = useAppStore()
    const [ laster, setLaster ] = useState<boolean>(false)
    const [ kvitteringHeader, setKvitteringHeader ] = useState<string>('')
    const [ formErDisabled, setFormErDisabled ] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1

    const methods = useForm({
        reValidateMode: 'onChange'
    })

    const { formState: { errors }, register, getValues, setError } = useFormContext()

    useEffect(() => {
        if (valgtKvittering) {
            setKvitteringHeader(tekst('opplasting_modal.endre-utlegg.tittel'))
            setFormErDisabled(true)
        } else {
            setKvitteringHeader(tekst('opplasting_modal.nytt-utlegg.tittel'))
            setFormErDisabled(false)
        }
        // eslint-disable-next-line
    }, [ valgtSoknad, valgtKvittering ])

    const onSubmit = async() => {
        console.log('getValues(\'belop_input\')', !getValues('belop_input')) // eslint-disable-line

        if (!getValues('belop_input')) {
            setError('belop_input', { message: tekst('opplasting_modal.endre-utlegg.hjelpetekst') })
        }

        try {
            setLaster(true)
            setFeilmeldingTekst('')

            const valid = await methods.trigger()
            if (!valid) return

            const opplastingResponse: OpplastetKvittering = await opplastingTilBucket()
            if (!opplastingResponse) return

            const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse = await lagreSvarISyfosoknad(opplastingResponse)
            if (!rsOppdaterSporsmalResponse) return

            valgtSoknad!.sporsmal[spmIndex] = new Sporsmal(rsOppdaterSporsmalResponse.oppdatertSporsmal, null, true)
            setValgtSoknad(valgtSoknad)
            setOpenModal(false)
        } catch (ex) {
            setFeilmeldingTekst('Det skjedde en feil i baksystemene, prøv igjen senere')
        } finally {
            setLaster(false)
        }
    }

    const opplastingTilBucket = async() => {
        const requestData = new FormData()
        requestData.append('file', valgtFil as Blob)
        const bucketRes = await fetcher(`${env.flexGatewayRoot}/flex-bucket-uploader/opplasting`, {
            method: 'POST',
            body: requestData,
            credentials: 'include'
        })

        if (bucketRes.ok) {
            return bucketRes.json()
        } else if (redirectTilLoginHvis401(bucketRes)) {
            return null
        } else if (bucketRes.status === 413) {
            logger.warn('Feil under opplasting fordi filen du prøvde å laste opp er for stor')
            setFeilmeldingTekst('Filen du prøvde å laste opp er for stor')
            return null
        } else {
            logger.warn('Feil under opplasting av kvittering')
            setFeilmeldingTekst('Det skjedde en feil i baksystemene, prøv igjen senere')
            return null
        }
    }

    const lagreSvarISyfosoknad = async(opplastingResponse: OpplastetKvittering) => {
        const kvittering: Kvittering = {
            blobId: opplastingResponse.id,
            belop: methods.getValues('belop_input') * 100,
            typeUtgift: methods.getValues('transportmiddel'),
            opprettet: dayjs().toISOString()
        }
        const svar: RSSvar = { verdi: JSON.stringify(kvittering) }

        const syfosoknadRes = await fetcher(`${env.flexGatewayRoot}/syfosoknad/api/soknader/${valgtSoknad!.id}/sporsmal/${sporsmal!.id}/svar`, {
            method: 'POST',
            body: JSON.stringify(svar),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        if (syfosoknadRes.ok) {
            return syfosoknadRes.json()
        } else if (redirectTilLoginHvis401(syfosoknadRes)) {
            return null
        } else {
            logger.warn('Feil under lagring av kvittering svar i syfosoknad')
            setFeilmeldingTekst('Det skjedde en feil i baksystemene, prøv igjen senere')
            return null
        }
    }

    if (!valgtSoknad) return null

    return (
        <FormProvider {...methods}>
            <form className="opplasting-form" key="opplasting_form">
                <Systemtittel className="opplasting-header">
                    {kvitteringHeader}
                </Systemtittel>

                <Vis hvis={formErDisabled}
                    render={() =>
                        <AlertStripe type="info">
                            <Normaltekst>{tekst('opplasting_modal.endre-utlegg.hjelpetekst')}</Normaltekst>
                        </AlertStripe>
                    }
                />
                <div className="skjemakolonner">
                    <div className="skjemaelement">
                        <label htmlFor="transportmiddel" className="skjemaelement__label">
                            {tekst('opplasting_modal.type-utgift.label')}
                        </label>
                        <select
                            disabled={formErDisabled}
                            {...methods.register('transportmiddel', {
                                required: tekst('opplasting_modal.transportmiddel.feilmelding'),
                                validate: (val) => {
                                    methods.setValue('transportmiddel', val)
                                    console.log('val', val) // eslint-disable-line
                                    return val !== undefined
                                }
                            })}
                            className={
                                'skjemaelement__input input--fullbredde kvittering-element' +
                                (errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
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
                            <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                <Vis hvis={errors['transportmiddel']}
                                    render={() => <>{errors['transportmiddel']?.message}</>}
                                />
                            </Normaltekst>
                        </div>
                    </div>

                    <div className="skjemaelement">
                        <label htmlFor="belop_input" className="skjemaelement__label">
                            <Element tag="strong">{tekst('opplasting_modal.tittel')}</Element>
                        </label>
                        <input
                            type="number"
                            id="belop_input"
                            {...register('belop_input', {
                                required: tekst('opplasting_modal.belop.feilmelding'),
                                min: { value: 0, message: 'Beløp kan ikke være negativt' },
                                max: { value: 10000, message: 'Beløp kan ikke være større enn 10 000' },
                                validate: (val) => {
                                    const belop = Number(val.replace(',', '.').replace(/ /g, ''))
                                    methods.setValue('belop_input', belop)
                                    return true
                                }
                            })}
                            defaultValue={valgtKvittering?.belop ? (valgtKvittering.belop / 100) : ''}
                            className={
                                'skjemaelement__input input--s periode-element' +
                                (errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            inputMode="decimal"
                            step={0.01}
                            autoComplete="off"
                            disabled={formErDisabled}
                        />
                        <span className="enhet">kr</span>

                        <div role="alert" aria-live="assertive">
                            <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                <Vis hvis={errors['belop_input']}
                                    render={() => <>{tekst('opplasting_modal.belop.feilmelding')}</>}
                                />
                            </Normaltekst>
                        </div>
                    </div>
                </div>

                <DragAndDrop />

                <Vis hvis={feilmeldingTekst}
                    render={() =>
                        <Alertstripe type="advarsel">
                            <Normaltekst>{feilmeldingTekst}</Normaltekst>
                        </Alertstripe>
                    }
                />

                <div className="knapperad">
                    <Vis hvis={!formErDisabled}
                        render={() =>
                            <Knapp type="hoved" htmlType="button" className="lagre-kvittering" onClick={onSubmit}
                                spinner={laster}>
                                {tekst('opplasting_modal.bekreft')}
                            </Knapp>
                        }
                    />

                    <Knapp htmlType="button" className="lagre-kvittering" onClick={() => setOpenModal(false)}>
                        {tekst('opplasting_modal.tilbake')}
                    </Knapp>

                    <Vis hvis={formErDisabled}
                        render={() => <Slettknapp sporsmal={sporsmal} kvittering={valgtKvittering!} />}
                    />
                </div>
            </form>
        </FormProvider>
    )
}

export default OpplastingForm
