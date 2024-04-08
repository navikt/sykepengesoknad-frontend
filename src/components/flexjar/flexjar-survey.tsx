import React, { useState } from 'react'
import { Button } from '@navikt/ds-react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../amplitude/amplitude'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

interface FlexjarSurveyProps {
    tittel?: string
    surveySporsmal: string
    svarAlternativer: string[]
    onSubmit: () => void
    feedbackId: string
}

export const FlexjarSurvey = ({
    tittel,
    surveySporsmal,
    svarAlternativer,
    onSubmit,
    feedbackId,
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
