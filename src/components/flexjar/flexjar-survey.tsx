import React, { useState } from 'react'
import { Button } from '@navikt/ds-react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

interface FlexjarSurveyProps {
    tittel: string
    flexjarSporsmal: string
    svarAlternativer: string[]
    onSubmit: () => void
}

export const FlexjarSurvey = ({ tittel, flexjarSporsmal, svarAlternativer, onSubmit }: FlexjarSurveyProps) => {
    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const { valgtSoknad } = useSoknadMedDetaljer()
    const feedbackId = 'sykepengesoknad-sporsmal'
    const fritekstPakrevd = activeState === 'Annet'

    const getPlaceholder = (): string => {
        if (!activeState && typeof activeState != 'string') {
            throw new Error('Ugyldig tilbakemeldingstype')
        }
        return 'Er det noe du vil trekke frem?'
    }

    const feedbackButtonProps = {
        valgtSoknad,
        activeState,
        setThanksFeedback,
        setActiveState,
        erModal: true,
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
                getPlaceholder={() => getPlaceholder().valueOf() + (fritekstPakrevd ? '' : ' (valgfritt)')}
                feedbackProps={{
                    soknadstype: valgtSoknad?.soknadstype.toString(),
                }}
                textRequired={fritekstPakrevd}
                flexjartittel={tittel}
                flexjarsporsmal={flexjarSporsmal}
                sekundaerEffekt={() => onSubmit()}
            >
                <div className="flex flex-col w-full gap-3">{alternativer}</div>
            </FlexjarFelles>
            <Button
                variant="tertiary"
                className="px-6 mt-8"
                onClick={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
            >
                Jeg vil ikke gi tilbakemelding
            </Button>
        </>
    )
}
