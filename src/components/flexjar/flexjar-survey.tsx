import React, { useState } from 'react'
import { Button } from '@navikt/ds-react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

enum AvbrytTilbakemelding {
    AGP = 'Arbeidsgiverperioden',
    FS = 'Fullføre senere',
    ANNET = 'ANNET',
}

export const FlexjarSurvey = ({ onSubmit }: { onSubmit: () => void }) => {
    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const { valgtSoknad } = useSoknadMedDetaljer()

    const getPlaceholder = (): string => {
        if (!activeState && typeof activeState != 'string') {
            throw new Error('Ugyldig tilbakemeldingstype')
        }
        return 'Er det noe du vil trekke frem? (valgfritt)'
        // switch (activeState) {
        //     case AvbrytTilbakemelding.AGP:
        //         return 'Er det noe du vil trekke frem? (valgfritt)'
        //     case AvbrytTilbakemelding.FS:
        //         return 'Er det noe du vil trekke frem? (valgfritt)'
        //     case AvbrytTilbakemelding.ANNET:
        //         return 'Hva er utfordringen din med dette spørsmålet?'
        //     default:
        //         throw new Error('Ugyldig tilbakemeldingstype')
        // }
    }

    const feedbackButtonProps = {
        valgtSoknad,
        activeState,
        setThanksFeedback,
        setActiveState,
        erModal: true,
    }

    const feedbackId = 'sykepengesoknad-sporsmal'
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
                textRequired={activeState === AvbrytTilbakemelding.ANNET}
                flexjartittel="Hjelp oss med å gjøre søknaden bedre"
                flexjarsporsmal="Hvorfor ønsker du å avbryte denne søknaden?"
                sekundaerEffekt={() => onSubmit()}
            >
                <div className="flex flex-col w-full gap-3">
                    <FeedbackButton
                        feedbackId={feedbackId}
                        tekst="Arbeidsgiveren min betaler hele sykefraværet"
                        svar={AvbrytTilbakemelding.AGP.valueOf()}
                        {...feedbackButtonProps}
                    />
                    <FeedbackButton
                        feedbackId={feedbackId}
                        tekst="Jeg skal svare på søknaden senere"
                        svar={AvbrytTilbakemelding.FS.valueOf()}
                        {...feedbackButtonProps}
                    />
                    <FeedbackButton
                        feedbackId={feedbackId}
                        tekst="Annet"
                        svar={AvbrytTilbakemelding.ANNET.valueOf()}
                        {...feedbackButtonProps}
                    />
                </div>
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
