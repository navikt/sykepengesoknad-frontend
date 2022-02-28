import './avbryt-soknad-modal.less'

import { BodyLong, Button, Checkbox, CheckboxGroup, Label,Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { avbrytSoknad } from './avbryt-soknad'

const AvbrytSoknadModal = () => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { stegId } = useParams<RouteParams>()
    const { valgtSoknad, soknader, setSoknader, setValgtSoknad, setFeilmeldingTekst } = useAppStore()
    const history = useHistory()


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
                    <BodyLong spacing size={'medium'} className={'tiitel'}>
                        <Label>{tekst('avbryt.popup.survey')}</Label>
                    </BodyLong>

                    <CheckboxGroup
                        size="medium"
                        legend={tekst('avbryt.popup.sporsmal')}
                        description={tekst('avbryt.popup.survey.anonymt')}
                        className={'popup-survey'}>
                        <Checkbox value="alt1">{tekst('avbryt.popup.survey.alternativ1')}</Checkbox>
                        <Checkbox value="alt2">{tekst('avbryt.popup.survey.alternativ2')}</Checkbox>
                        <Checkbox value="alt3">{tekst('avbryt.popup.survey.alternativ3')}</Checkbox>
                        <Checkbox value="alt4">{tekst('avbryt.popup.survey.alternativ4')}</Checkbox>
                        <Checkbox value="alt5">{tekst('avbryt.popup.survey.alternativ5')}</Checkbox>
                        <Checkbox value="alt6">{tekst('avbryt.popup.survey.alternativ6')}</Checkbox>
                    </CheckboxGroup>

                    <Button size="small" variant="primary" className="midtstilt-knapp" onClick={
                        () => {
                            logEvent('knapp klikket', {
                                'tekst': tekst('avbryt.popup.bekreft'),
                                'soknadstype': valgtSoknad?.soknadstype,
                                'component': tekst('avbryt.popup.tittel'),
                                'steg': stegId
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
