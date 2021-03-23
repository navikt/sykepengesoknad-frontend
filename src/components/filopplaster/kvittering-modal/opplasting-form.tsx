import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'
import AlertStripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import NavFrontendSpinner from 'nav-frontend-spinner'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { useAppStore } from '../../../data/stores/app-store'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { RSSvar } from '../../../types/rs-types/rs-svar'
import { Kvittering, Sporsmal, svarverdiToKvittering, UtgiftTyper } from '../../../types/types'
import env from '../../../utils/environment'
import fetcher from '../../../utils/fetcher'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form'
import Vis from '../../vis'
import DragAndDrop from '../drag-and-drop/drag-and-drop'

interface OpplastetKvittering {
    id: string;
}

const OpplastingForm = ({ sporsmal }: SpmProps) => {
    const {
        valgtSoknad, setValgtSoknad, valgtKvittering, setOpenModal, valgtFil
    } = useAppStore()
    const [ laster, setLaster ] = useState<boolean>(false)
    const [ typeUtgift, setTypeUtgift ] = useState<string>('')
    const [ kvitteringHeader, setKvitteringHeader ] = useState<string>('')
    const [ formErDisabled, setFormErDisabled ] = useState<boolean>(false)
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)
    const { stegId } = useParams<RouteParams>()
    const stegNum = Number(stegId)
    const spmIndex = stegNum - 1

    const methods = useForm({
        reValidateMode: 'onSubmit'
    })

    useEffect(() => {
        if (valgtKvittering) {
            setTypeUtgift(valgtKvittering?.typeUtgift)
            setKvitteringHeader(tekst('opplasting_modal.endre-utlegg.tittel'))
            setFormErDisabled(true)
        }
        else {
            setTypeUtgift('')
            setKvitteringHeader(tekst('opplasting_modal.nytt-utlegg.tittel'))
            setFormErDisabled(false)
        }
        // eslint-disable-next-line
    }, [ valgtSoknad, valgtKvittering ])

    const onSubmit = async() => {
        try {
            setLaster(true)
            setFetchFeilmelding(null)

            const valid = await methods.trigger()
            if (!valid) return

            const opplastingResponse: OpplastetKvittering = await opplastingTilBucket()
            if (!opplastingResponse) return

            const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse = await lagreSvarISyfosoknad(opplastingResponse)
            if (!rsOppdaterSporsmalResponse) return

            valgtSoknad!.sporsmal[spmIndex] = new Sporsmal(rsOppdaterSporsmalResponse.oppdatertSporsmal, null, true)
            setValgtSoknad(valgtSoknad)
            setOpenModal(false)
        } catch(ex) {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
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
        }
        else if (redirectTilLoginHvis401(bucketRes)) {
            return null
        }
        else if (bucketRes.status === 413) {
            logger.warn('Feil under opplasting fordi filen du prøvde å laste opp er for stor')
            setFetchFeilmelding('Filen du prøvde å laste opp er for stor')
            return null
        }
        else {
            logger.warn('Feil under opplasting av kvittering')
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
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
        }
        else if (redirectTilLoginHvis401(syfosoknadRes)) {
            return null
        }
        else {
            logger.warn('Feil under lagring av kvittering svar i syfosoknad')
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
            return null
        }
    }

    const slettKvittering = async() => {
        try {
            setLaster(true)
            const idx = sporsmal!.svarliste.svar.findIndex(svar => svarverdiToKvittering(svar?.verdi).blobId === valgtKvittering?.blobId)
            const svar = sporsmal?.svarliste.svar.find(svar => svarverdiToKvittering(svar?.verdi).blobId === valgtKvittering?.blobId)

            const res = await fetcher(`${env.flexGatewayRoot}/syfosoknad/api/soknader/${valgtSoknad?.id}/sporsmal/${sporsmal?.id}/svar/${svar?.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (res.ok) {
                sporsmal.svarliste.svar.splice(idx, 1)
                valgtSoknad!.sporsmal[valgtSoknad!.sporsmal.findIndex(spm => spm.id === sporsmal.id)] = sporsmal
                setValgtSoknad(valgtSoknad)
                setOpenModal(false)
            }
            else if (redirectTilLoginHvis401(res)) {
                return null
            }
            else {
                logger.warn('Feil under sletting av kvittering i syfosoknad')
                setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
                return null
            }
        } catch (error) {
            logger.error('Feil under sletting av kvittering', error)
        } finally {
            setLaster(false)
        }
    }

    const typeUtgiftOnChange = (e: any) => {
        setTypeUtgift(e.target.value)
        methods.trigger('transportmiddel')
    }

    if (!valgtSoknad) return null

    return (
        <FormProvider {...methods}>
            <form key="opplasting_form">
                <Systemtittel className="opplasting-header">
                    {kvitteringHeader}
                </Systemtittel>

                <Vis hvis={formErDisabled}>
                    <AlertStripe type="info">
                        <Normaltekst>{tekst('opplasting_modal.endre-utlegg.hjelpetekst')}</Normaltekst>
                    </AlertStripe>
                </Vis>

                <div className="skjemakolonner">
                    <div className="skjemaelement">
                        <label htmlFor="transportmiddel" className="skjemaelement__label">
                            {tekst('opplasting_modal.type-utgift.label')}
                        </label>
                        <select
                            disabled={formErDisabled}
                            ref={methods.register({ required: tekst('opplasting_modal.transportmiddel.feilmelding') })}
                            className={
                                'skjemaelement__input input--fullbredde kvittering-element' +
                                (methods.errors['transportmiddel'] ? ' skjemaelement__input--harFeil' : '')
                            }
                            id="transportmiddel"
                            name="transportmiddel"
                            onChange={typeUtgiftOnChange}
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

                        <Normaltekst tag="div" role="alert" aria-live="assertive"
                            className="skjemaelement__feilmelding">
                            <Vis hvis={methods.errors['transportmiddel']}>
                                <p>{tekst('opplasting_modal.transportmiddel.feilmelding')}</p>
                            </Vis>
                        </Normaltekst>
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
                        <Normaltekst tag="div" role="alert" aria-live="assertive"
                            className="skjemaelement__feilmelding">
                            <Vis hvis={methods.errors['belop_input']}>
                                <p>{methods.errors['belop_input']?.message}</p>
                            </Vis>
                        </Normaltekst>
                    </div>
                </div>

                <Vis hvis={typeUtgift === 'OFFENTLIG_TRANSPORT' && !formErDisabled}>
                    <Alertstripe type="info" form="inline">
                        <Normaltekst>{tekst('opplasting_modal.type-utgift.hjelpetekst')}</Normaltekst>
                    </Alertstripe>
                </Vis>

                <DragAndDrop />

                <Vis hvis={fetchFeilmelding}>
                    <Alertstripe type="advarsel">
                        <Normaltekst>{fetchFeilmelding}</Normaltekst>
                    </Alertstripe>
                </Vis>

                {laster
                    ?
                    <NavFrontendSpinner className="lagre-kvittering" />
                    :
                    <div className="knapperad">
                        <Knapp htmlType="button" className="lagre-kvittering" onClick={() => setOpenModal(false)}>
                            {tekst('opplasting_modal.tilbake')}
                        </Knapp>
                        <Vis hvis={!formErDisabled}>
                            <Knapp type="hoved" htmlType="button" className="lagre-kvittering" onClick={onSubmit}>
                                {tekst('opplasting_modal.bekreft')}
                            </Knapp>
                        </Vis>
                        <Vis hvis={formErDisabled}>
                            <Knapp type="fare" htmlType="button" className="lagre-kvittering" onClick={slettKvittering}>
                                {tekst('opplasting_modal.slett')}
                            </Knapp>
                        </Vis>
                    </div>
                }
            </form>
        </FormProvider>
    )
}

export default OpplastingForm
