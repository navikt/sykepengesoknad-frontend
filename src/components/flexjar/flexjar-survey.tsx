import React, { useState } from 'react'
import { Button, Checkbox, CheckboxGroup, Modal } from '@navikt/ds-react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../amplitude/amplitude'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

interface FlexjarSurveyProps {
    surveySporsmal: string
    onSubmit: () => void
    feedbackId: string
    tittel: string
    thanksFeedback: boolean
    setThanksFeedback: (b: boolean) => void
}

const FlexjarSurvey = ({
    surveySporsmal,
    onSubmit,
    feedbackId,
    tittel,
    thanksFeedback,
    setThanksFeedback,
}: FlexjarSurveyProps) => {
    const [activeState, setActiveState] = useState<string | number | null>(null)

    const { valgtSoknad } = useSoknadMedDetaljer()

    const [vanskeligeSporsmal, setVanskeligeSporsmal] = useState<string[]>([])
    const getPlaceholder = (): string => {
        if (!activeState && typeof activeState != 'string') {
            throw new Error('Ugyldig tilbakemeldingstype')
        }
        return 'Vil du foreslå en forbedring? (valgfritt)'
    }

    const feedbackButtonProps = {
        valgtSoknad,
        activeState,
        setThanksFeedback,
        setActiveState,
        color: 'var(--a-red-100)',
        hoverColor: 'hover:text-blue-500',
        width: 'w-full',
    }

    const alternativerCheck = [
        'Avviklet virksomhet',
        'Ny i arbeidslivet',
        'Varig endring i arbeidssituasjon eller virksomhet',
        'Endring i inntekt på mer enn 25%',
        'Annet',
    ]

    const lukkeKnappTekst = thanksFeedback ? 'Lukk vindu' : 'Jeg vil ikke gi tilbakemelding'

    return (
        <>
            <FlexjarFelles
                feedbackId={feedbackId}
                setActiveState={setActiveState}
                activeState={activeState}
                thanksFeedback={thanksFeedback}
                modal={true}
                instantSubmittNei={true}
                setThanksFeedback={setThanksFeedback}
                getPlaceholder={getPlaceholder}
                feedbackProps={{
                    soknadstype: valgtSoknad?.soknadstype.toString(),
                }}
                feedbackPropsProvider={() => ({
                    vanskeligeSporsmal: JSON.stringify(vanskeligeSporsmal),
                })}
                textRequired={false}
                flexjartittel={tittel || 'Hjelp oss å gjøre denne tjenesten bedre'}
                flexjarsporsmal={surveySporsmal}
                fullBredde={true}
            >
                <div className="flex w-full gap-2">
                    <FeedbackButton feedbackId={feedbackId} tekst="Ja" svar="JA" {...feedbackButtonProps} />
                    <FeedbackButton feedbackId={feedbackId} tekst="Nei" svar="NEI" {...feedbackButtonProps} />
                </div>
                {activeState == 'JA' && (
                    <CheckboxGroup
                        className="mt-8"
                        legend="Hva var vanskelig å svare på? (valgfritt)"
                        description="(Du kan huke av for flere alternativer)"
                        onChange={(e) => {
                            setVanskeligeSporsmal(e)
                        }}
                    >
                        {alternativerCheck.map((alternativ) => {
                            return (
                                <Checkbox value={alternativ} key={alternativ}>
                                    {alternativ}
                                </Checkbox>
                            )
                        })}
                    </CheckboxGroup>
                )}
            </FlexjarFelles>
            <Button
                className="m-4"
                variant="tertiary"
                onClick={(e) => {
                    logEvent('knapp klikket', {
                        tekst: lukkeKnappTekst,
                        soknadstype: valgtSoknad?.soknadstype,
                        component: feedbackId,
                    })
                    e.preventDefault()
                    onSubmit()
                }}
            >
                {lukkeKnappTekst}
            </Button>
        </>
    )
}

interface FlexjarSurveyModalProps {
    tittel?: string
    surveySporsmal: string
    onSubmit: () => void
    feedbackId: string
    visSurvey: boolean
}

export const FlexjarSurveyModal = ({ surveySporsmal, onSubmit, feedbackId, visSurvey }: FlexjarSurveyModalProps) => {
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const [harLukket, setHarLukket] = useState<boolean>(false)
    const tittel = thanksFeedback ? 'Tusen takk!' : 'Vi hører gjerne fra deg'
    return (
        <>
            <Modal
                open={visSurvey && !harLukket}
                header={{ heading: tittel ?? '', closeButton: true }}
                onClose={() => {
                    onSubmit()
                    setHarLukket(true)
                }}
            >
                {visSurvey && (
                    <>
                        <div className="flex flex-row-reverse flex-wrap gap-4 pt-0">
                            <FlexjarSurvey
                                tittel={tittel}
                                thanksFeedback={thanksFeedback}
                                setThanksFeedback={setThanksFeedback}
                                feedbackId={feedbackId}
                                surveySporsmal={surveySporsmal}
                                onSubmit={() => {
                                    onSubmit()
                                }}
                            ></FlexjarSurvey>
                        </div>
                    </>
                )}
            </Modal>
        </>
    )
}
