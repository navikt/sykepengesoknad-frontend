import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'
import AlertStripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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
import VisBlock from '../../vis-block'
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
            <form key="opplasting_form">
                <Systemtittel className="opplasting-header">
                    {kvitteringHeader}
                </Systemtittel>

                <VisBlock hvis={formErDisabled}
                    render={() => {
                        return (
                            <AlertStripe type="info">
                                <Normaltekst>{tekst('opplasting_modal.endre-utlegg.hjelpetekst')}</Normaltekst>
                            </AlertStripe>
                        )
                    }}
                />
                <div className="skjemakolonner">
                    <div className="skjemaelement">
                        <label htmlFor="transportmiddel" className="skjemaelement__label">
                            {tekst('opplasting_modal.type-utgift.label')}
                        </label>
                        <select
                            disabled={formErDisabled}
                            ref={methods.register({
                                required: tekst('opplasting_modal.transportmiddel.feilmelding')
                            })}
                            className={
                                'skjemaelement__input input--fullbredde kvittering-element' +
                                (methods.errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
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
                                <VisBlock hvis={methods.errors['transportmiddel']}
                                    render={() => <>{tekst('opplasting_modal.transportmiddel.feilmelding')}</>}
                                />
                            </Normaltekst>
                        </div>
                    </div>

                    <div className="skjemaelement">
                        <label htmlFor="belop_input" className="skjemaelement__label">
                            <Element tag="strong">{tekst('opplasting_modal.tittel')}</Element>
                        </label>
                        <input
                            disabled={formErDisabled}
                            ref={methods.register({
                                required: tekst('opplasting_modal.belop.feilmelding'),
                                min: { value: 0, message: 'Beløp kan ikke være negativt' },
                                max: { value: 10000, message: 'Beløp kan ikke være større enn 10 000' },
                                validate: (val) => {
                                    const belop = val.split('.')
                                    if (belop[1]?.length > 2) {
                                        methods.setValue('belop_input', belop[0] + '.' + belop[1].substring(0, 2))
                                    }
                                    return true
                                }
                            })}
                            type="number"
                            id="belop_input"
                            name="belop_input"
                            inputMode={'decimal'}
                            defaultValue={valgtKvittering?.belop ? (valgtKvittering.belop / 100) : ''}
                            className={
                                'skjemaelement__input input--s periode-element' +
                                (methods.errors['belop_input'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            step={0.01}
                            autoComplete="off"
                        />
                        <span className="enhet">kr</span>

                        <div role="alert" aria-live="assertive">
                            <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                <VisBlock hvis={methods.errors['belop_input']}
                                    render={() => <>{methods.errors['belop_input']?.message}</>}
                                />
                            </Normaltekst>
                        </div>
                    </div>
                </div>

                <DragAndDrop />

                <VisBlock hvis={feilmeldingTekst}
                    render={() => {
                        return (
                            <Alertstripe type="advarsel">
                                <Normaltekst>{feilmeldingTekst}</Normaltekst>
                            </Alertstripe>
                        )
                    }}
                />

                <div className="knapperad">
                    <Knapp htmlType="button" className="lagre-kvittering" onClick={() => setOpenModal(false)}>
                        {tekst('opplasting_modal.tilbake')}
                    </Knapp>

                    <VisBlock hvis={!formErDisabled}
                        render={() => {
                            return (
                                <Knapp type="hoved" htmlType="button" className="lagre-kvittering" onClick={onSubmit} spinner={laster}>
                                    {tekst('opplasting_modal.bekreft')}
                                </Knapp>
                            )
                        }}
                    />

                    <VisBlock hvis={formErDisabled}
                        render={() => <Slettknapp sporsmal={sporsmal} kvittering={valgtKvittering!} />}
                    />
                </div>
            </form>
        </FormProvider>
    )
}

export default OpplastingForm
