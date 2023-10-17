import { Button, Skeleton } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { cn } from '../../utils/tw-utils'
import { Soknad } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { TagTyper } from '../../types/enums'

import { FlexjarFelles } from './flexjar-felles'

enum Feedbacktype {
    'JA' = 'JA',
    'NEI' = 'NEI',
    'FORBEDRING' = 'FORBEDRING',
}

interface FeedbackButtonProps {
    children: React.ReactNode
    feedbacktype: Feedbacktype
    soknad: Soknad | undefined
    activeState: Feedbacktype | null
    setThanksFeedback: (b: boolean) => void
    setActiveState: (s: Feedbacktype | null) => void
}

export const FlexjarSporsmal = ({ soknad, steg }: { soknad: Soknad | undefined; steg: number }) => {
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

    if (
        steg ===
        soknad?.sporsmal.filter(
            (s) =>
                s.tag !== TagTyper.VAER_KLAR_OVER_AT ||
                (s.tag === TagTyper.VAER_KLAR_OVER_AT && s.undersporsmal.length > 0),
        ).length
    ) {
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
            textRequired={activeState === Feedbacktype.FORBEDRING || activeState === Feedbacktype.NEI}
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
const FeedbackButton = (props: FeedbackButtonProps) => {
    return (
        <Button
            variant="secondary-neutral"
            size="small"
            as={props.soknad ? Button : Skeleton}
            className={cn({
                'bg-surface-neutral-active text-text-on-inverted hover:bg-surface-neutral-active':
                    props.activeState === props.feedbacktype,
            })}
            onClick={() => {
                props.setThanksFeedback(false)
                if (props.activeState === props.feedbacktype) {
                    props.setActiveState(null)
                } else {
                    props.setActiveState(props.feedbacktype)
                }
            }}
        >
            {props.children}
        </Button>
    )
}
