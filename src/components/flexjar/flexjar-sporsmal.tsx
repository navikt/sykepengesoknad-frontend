import React, { useState } from 'react'

import { Soknad, Sporsmal } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

interface FlexjarSporsmalProps {
    soknad: Soknad | undefined
    sporsmal: Sporsmal | undefined
    steg: number
}

export const FlexjarSporsmal = ({ soknad, sporsmal, steg }: FlexjarSporsmalProps) => {
    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)

    if (steg <= 1 && soknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return null
    }

    if (sporsmal?.tag === 'TIL_SLUTT' || sporsmal?.tag === 'VAER_KLAR_OVER_AT') {
        return null
    }

    const getPlaceholder = (): string => {
        switch (activeState) {
            case 'JA':
                return 'Er det noe du vil trekke frem? (valgfritt)'
            case 'NEI':
                return 'Hva er utfordringen din med dette spørsmålet?'
            case 'FORBEDRING':
                return 'Hva kan forbedres?'
            default:
                throw Error('Ugyldig tilbakemeldingstype')
        }
    }

    const feedbackButtonProps = {
        soknad,
        activeState,
        setThanksFeedback,
        setActiveState,
    }

    const feedbackId = 'sykepengesoknad-sporsmal'
    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={getPlaceholder}
            feedbackProps={{
                soknadstype: soknad?.soknadstype.toString(),
                sporsmal: sporsmal?.tag.toString(),
            }}
            textRequired={activeState === 'FORBEDRING' || activeState === 'NEI'}
            flexjartittel="Hjelp oss med å gjøre søknaden bedre"
            flexjarsporsmal="Opplever du at du har nok informasjon til å svare på dette spørsmålet?"
        >
            <div className="flex w-full gap-2">
                <FeedbackButton feedbackId={feedbackId} tekst="Ja" svar="JA" {...feedbackButtonProps} />
                <FeedbackButton feedbackId={feedbackId} tekst="Nei" svar="NEI" {...feedbackButtonProps} />
                <FeedbackButton
                    feedbackId={feedbackId}
                    tekst="Foreslå forbedring"
                    svar="FORBEDRING"
                    {...feedbackButtonProps}
                />
            </div>
        </FlexjarFelles>
    )
}
