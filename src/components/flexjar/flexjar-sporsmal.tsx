import React, { useEffect, useState } from 'react'

import { Soknad, Sporsmal } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

enum Feedbacktype {
    'JA' = 'JA',
    'NEI' = 'NEI',
    'FORBEDRING' = 'FORBEDRING',
}

interface FlexjarSporsmalProps {
    soknad: Soknad | undefined
    sporsmal: Sporsmal | undefined
    steg: number
}

export const FlexjarSporsmal = ({ soknad, sporsmal, steg }: FlexjarSporsmalProps) => {
    const [textValue, setTextValue] = useState('')
    const [activeState, setActiveState] = useState<Feedbacktype | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)

    useEffect(() => {
        textValue && errorMsg && setErrorMsg(null)
    }, [textValue, errorMsg])

    useEffect(() => {
        setActiveState(null)
        setTextValue('')
        setThanksFeedback(false)
    }, [steg])

    useEffect(() => {
        setErrorMsg(null)
    }, [activeState])

    if (steg <= 1 && soknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return null
    }

    if (sporsmal?.tag === 'TIL_SLUTT' || sporsmal?.tag === 'VAER_KLAR_OVER_AT') {
        return null
    }

    const getPlaceholder = (): string => {
        switch (activeState) {
            case Feedbacktype.JA:
                return 'Er det noe du vil trekke frem? (valgfritt)'
            case Feedbacktype.NEI:
                return 'Hva er utfordringen din med dette spørsmålet?'
            case Feedbacktype.FORBEDRING:
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

    return (
        <FlexjarFelles
            feedbackId="sykepengesoknad-sporsmal"
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={getPlaceholder}
            app="sykepengesoknad-frontend"
            feedbackProps={{
                soknadstype: soknad?.soknadstype.toString(),
                sporsmal: sporsmal?.tag.toString(),
            }}
            textRequired={activeState === Feedbacktype.FORBEDRING || activeState === Feedbacktype.NEI}
            flexjartittel="Hjelp oss med å gjøre søknaden bedre"
            flexjarsporsmal="Opplever du at du har nok informasjon til å svare på dette spørsmålet?"
        >
            <div className="flex w-full gap-2">
                <FeedbackButton feedbacktype={Feedbacktype.JA} {...feedbackButtonProps}>
                    Ja
                </FeedbackButton>
                <FeedbackButton feedbacktype={Feedbacktype.NEI} {...feedbackButtonProps}>
                    Nei
                </FeedbackButton>
                <FeedbackButton feedbacktype={Feedbacktype.FORBEDRING} {...feedbackButtonProps}>
                    Foreslå forbedring
                </FeedbackButton>
            </div>
        </FlexjarFelles>
    )
}
