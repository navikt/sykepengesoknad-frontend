import React, { useState } from 'react'
import { Button, Modal } from '@navikt/ds-react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../amplitude/amplitude'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

interface FlexjarSurveyProps {
    tittel?: string
    surveySporsmal: string
    svarAlternativer: string[]
    onSubmit: () => void
    feedbackId: string
    inkluderAmplitude?: boolean
}

export const FlexjarSurvey = ({
    tittel,
    surveySporsmal,
    svarAlternativer,
    onSubmit,
    feedbackId,
    inkluderAmplitude,
}: FlexjarSurveyProps) => {
    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const { valgtSoknad } = useSoknadMedDetaljer()

    const getPlaceholder = (): string => {
        if (!activeState && typeof activeState != 'string') {
            throw new Error('Ugyldig tilbakemeldingstype')
        }
        return 'Er det noe du vil trekke frem? (valgfritt)'
    }

    const feedbackButtonProps = {
        valgtSoknad,
        activeState,
        setThanksFeedback,
        setActiveState,
    }

    function amplitudeMetadata() {
        if (inkluderAmplitude) {
            const cookies = document.cookie
            const amplitudeCookie = cookies.split(';').find((cookie) => cookie.includes('amp_defaul'))
            if (amplitudeCookie) {
                const strings = amplitudeCookie.split('=')
                if (strings.length == 2) {
                    const amplitudeCookieValue = strings[1]
                    if (amplitudeCookieValue.includes('...')) {
                        const deviceId = amplitudeCookieValue.split('...')[0]
                        return {
                            amplitudeDeviceId: deviceId,
                        }
                    }
                }
            }
        }

        return {}
    }

    const alternativer = svarAlternativer.map((alternativ, index) => {
        return (
            <FeedbackButton
                key={index}
                feedbackId={feedbackId}
                tekst={alternativ}
                svar={alternativ}
                {...feedbackButtonProps}
            />
        )
    })

    return (
        <>
            <FlexjarFelles
                feedbackId={feedbackId}
                setActiveState={setActiveState}
                activeState={activeState}
                thanksFeedback={thanksFeedback}
                setThanksFeedback={setThanksFeedback}
                getPlaceholder={getPlaceholder}
                feedbackProps={{
                    soknadstype: valgtSoknad?.soknadstype.toString(),
                }}
                feedbackPropsFunction={amplitudeMetadata}
                textRequired={false}
                flexjartittel={tittel || 'Hjelp oss å gjøre denne tjenesten bedre'}
                flexjarsporsmal={surveySporsmal}
                sekundaerEffekt={() => {
                    //Timeout for å vise at tilbakemeldingen er sendt
                    setTimeout(() => {
                        onSubmit()
                    }, 1000)
                }}
                fullBredde={true}
            >
                <div className="flex flex-col w-full gap-3">{alternativer}</div>
            </FlexjarFelles>
            <Button
                variant="tertiary"
                className="px-6 mt-8"
                onClick={(e) => {
                    logEvent('knapp klikket', {
                        tekst: 'Jeg vil ikke gi tilbakemelding',
                        soknadstype: valgtSoknad?.soknadstype,
                        component: feedbackId,
                    })
                    e.preventDefault()
                    onSubmit()
                }}
            >
                Jeg vil ikke gi tilbakemelding
            </Button>
        </>
    )
}

interface FlexjarSurveyModalProps {
    tittel?: string
    modalTittel: string
    surveySporsmal: string
    svarAlternativer: string[]
    onSubmit: () => void
    feedbackId: string
    visSurvey: boolean
    inkluderAmplitude?: boolean
}

export const FlexjarSurveyModal = ({
    tittel,
    modalTittel,
    surveySporsmal,
    svarAlternativer,
    onSubmit,
    feedbackId,
    visSurvey,
    inkluderAmplitude,
}: FlexjarSurveyModalProps) => {
    return (
        <>
            <Modal
                open={visSurvey}
                header={{ heading: modalTittel }}
                onClose={() => {
                    onSubmit()
                }}
            >
                {visSurvey && (
                    <div className="flex flex-row-reverse flex-wrap gap-4 p-6 pt-4">
                        <FlexjarSurvey
                            tittel={tittel}
                            feedbackId={feedbackId}
                            inkluderAmplitude={inkluderAmplitude}
                            surveySporsmal={surveySporsmal}
                            svarAlternativer={svarAlternativer}
                            onSubmit={() => {
                                onSubmit()
                            }}
                        ></FlexjarSurvey>
                    </div>
                )}
            </Modal>
        </>
    )
}
