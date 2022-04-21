import './endre-soknad-modal.less'

import { Button, Checkbox, CheckboxGroup, Label, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useHistory } from 'react-router'

import useFetch from '../../data/rest/use-fetch'
import { FetchState, hasData } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { urlTilSoknad } from '../../pages/soknad/soknad-link'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Soknad } from '../../types/types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

const Endreknapp = () => {
    const { valgtSoknad, soknader, setSoknader, setFeilmeldingTekst } = useAppStore()
    const korrigerSoknad = useFetch<RSSoknad>()
    const history = useHistory()
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)

    const [ korrigerer, setKorrigerer ] = useState<boolean>(false)
    const endreKnappTekst = tekst('kvittering.knapp.endre')
    const [ error, setError ] = useState<string>('')
    const { register, getValues } = useFormContext()

    const boxClicked = () => {
        const surveyValues = getValues('survey')
        if (!surveyValues || surveyValues.length === 0) setError('')
    }
    const korriger = () => {
        if (korrigerer) return
        setKorrigerer(true)

        korrigerSoknad.fetch(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${valgtSoknad!.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {

            if (hasData(fetchState) && fetchState.httpCode >= 200 && fetchState.httpCode < 400) {
                const soknad = new Soknad(fetchState.data)
                if (!soknader.find(sok => sok.id === soknad.id)) {
                    soknader.push(soknad)
                    setSoknader(soknader)
                }
                setAapen(false)
                history.push(urlTilSoknad(soknad))
                setFeilmeldingTekst('')
            } else {
                logger.error('Feil ved opprettelse av UTKAST_TIL_KORRIGERING', fetchState)
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'))
            }
            setKorrigerer(false)
        })
    }
    const endreSøknadSurvey = 'Endre søknad survey'

    return (
        <>
            <Button variant="secondary" loading={korrigerer} onClick={() => {
                logEvent('knapp klikket', {
                    'tekst': endreKnappTekst,
                })
                setAapen(true)
            }}>
                {endreKnappTekst}
            </Button>
            <Modal className="modal__endre_popup" onClose={() => {

                setAapen(false)
                logEvent('popup lukket', {
                    'component': endreSøknadSurvey,
                    'soknadstype': valgtSoknad?.soknadstype,
                })
            }}
            open={aapen}
            >
                <Modal.Content>
                    <Label size="medium" className="tittel" spacing>
                        {tekst('endre.popup.survey')}
                    </Label>
                    <CheckboxGroup
                        size="medium"
                        error={error}
                        legend={tekst('endre.popup.sporsmal')}
                        description={tekst('endre.popup.survey.anonymt')}
                        className={'popup-survey'}>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('endre.popup.survey.alternativ1')}>
                            {tekst('endre.popup.survey.alternativ1')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('endre.popup.survey.alternativ2')}>
                            {tekst('endre.popup.survey.alternativ2')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('endre.popup.survey.alternativ3')}>
                            {tekst('endre.popup.survey.alternativ3')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('endre.popup.survey.alternativ4')}>
                            {tekst('endre.popup.survey.alternativ4')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('endre.popup.survey.alternativ5')}>
                            {tekst('endre.popup.survey.alternativ5')}
                        </Checkbox>
                    </CheckboxGroup>

                    <Button size="small" variant="primary" className="midtstilt-knapp" onClick={
                        (e) => {
                            const surveyValues = getValues('survey')
                            if (!surveyValues || surveyValues.length === 0) {
                                setError(tekst('soknad.feilmelding.checkbox.lokal'))
                                return
                            }
                            e.preventDefault()
                            logEvent('knapp klikket', {
                                'tekst': tekst('endre.popup.bekreft'),
                                'soknadstype': valgtSoknad?.soknadstype,
                                'component': endreSøknadSurvey,
                                'endre survey': surveyValues
                            })
                            korriger()

                        }
                    }>
                        {tekst('endre.popup.bekreft')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

const EndreknappMedForm = () => {
    const methods = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        shouldUnregister: true,
    })
    return (
        <FormProvider {...methods}>
            <Endreknapp />
        </FormProvider>
    )
}
export default EndreknappMedForm
