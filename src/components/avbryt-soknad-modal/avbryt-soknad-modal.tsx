import './avbryt-soknad-modal.less'

import { Button, Checkbox, CheckboxGroup, Label,Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { avbrytSoknad } from './avbryt-soknad'

const AvbrytSoknadModal = () => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)
    const [ error, setError ] = useState<string>('')
    const { stegId } = useParams<RouteParams>()
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore()
    const { register, getValues } = useFormContext()
    const history = useHistory()

    const boxClicked = () => {
        const surveyValues = getValues('survey')
        if (!surveyValues || surveyValues.length === 0 ) setError('')
    }
    return (

        <div>
            <Button size="small" variant="tertiary" className="avbryt_rødknapp"
                onClick={
                    (e) => {
                        logEvent('popup åpnet', {
                            'component': tekst('avbryt.popup.tittel'),
                            'soknadstype': valgtSoknad?.soknadstype,
                            'steg': stegId
                        })
                        setAapen(true)
                        e.preventDefault()
                    }}>
                {tekst('avbryt.popup.tittel')}
            </Button>
            <Modal className="modal__avbryt_popup" onClose={() => {

                setAapen(false)
                logEvent('popup lukket', {
                    'component': tekst('avbryt.popup.tittel'),
                    'soknadstype': valgtSoknad?.soknadstype,
                    'steg': stegId
                })
            }}
            open={aapen}
            >
                <Modal.Content>
                    <Label size="medium" className="tittel" spacing>
                        {tekst('avbryt.popup.survey')}
                    </Label>
                    <CheckboxGroup
                        size="medium"
                        error={error}
                        legend={tekst('avbryt.popup.sporsmal')}
                        description={tekst('avbryt.popup.survey.anonymt')}
                        className={'popup-survey'}>
                        <Checkbox {...register('survey')}
                            onClick={ boxClicked }
                            value={tekst('avbryt.popup.survey.alternativ1')}>
                            {tekst('avbryt.popup.survey.alternativ1')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('avbryt.popup.survey.alternativ2')}>
                            {tekst('avbryt.popup.survey.alternativ2')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('avbryt.popup.survey.alternativ3')}>
                            {tekst('avbryt.popup.survey.alternativ3')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('avbryt.popup.survey.alternativ4')}>
                            {tekst('avbryt.popup.survey.alternativ4')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('avbryt.popup.survey.alternativ5')}>
                            {tekst('avbryt.popup.survey.alternativ5')}
                        </Checkbox>
                        <Checkbox {...register('survey')}
                            onClick={boxClicked}
                            value={tekst('avbryt.popup.survey.alternativ6')}>
                            {tekst('avbryt.popup.survey.alternativ6')}
                        </Checkbox>
                    </CheckboxGroup>

                    <Button size="small" variant="primary" className="midtstilt-knapp" onClick={
                        (e) => {
                            const surveyValues = getValues('survey')
                            if( !surveyValues || surveyValues.length === 0 ) {
                                setError(tekst('soknad.feilmelding.checkbox.lokal'))
                                return
                            }
                            e.preventDefault()
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.bekreft'),
                                'soknadstype': valgtSoknad?.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId,
                                'avbrutt survey': surveyValues
                            })
                            avbrytSoknad({
                                valgtSoknad: valgtSoknad!,
                                setSoknader: setSoknader,
                                soknader: soknader,
                                setValgtSoknad: setValgtSoknad,
                                history: history,
                                setFeilmeldingTekst: setFeilmeldingTekst
                            })

                        }
                    }>
                        {tekst('avbryt.popup.bekreft')}
                    </Button>

                    <Button size="small" variant="tertiary" className="midtstilt-knapp"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.angre'),
                                'soknadstype': valgtSoknad?.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId
                            })
                        }}>
                        {tekst('avbryt.popup.angre')}
                    </Button>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default AvbrytSoknadModal
