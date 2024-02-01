import React from 'react'
import { BodyShort } from '@navikt/ds-react'

import { logEvent } from '../amplitude/amplitude'
import { cn } from '../../utils/tw-utils'

import { FillProps } from './emojies'

export interface EmojiButtonProps {
    feedback: number
    Emoji: (fp: FillProps) => React.JSX.Element
    text: string
    color: string
    hoverColor: string
    activeState: number | string | null
    setThanksFeedback: (b: boolean) => void
    setActiveState: (s: number | string | null) => void
    feedbackId: string
}

export const EmojiButton = (props: EmojiButtonProps) => {
    const isActive = props.activeState === props.feedback

    const handleOnClick = () => {
        if (props.activeState) {
            logEvent('knapp klikket', {
                komponent: 'flexjar',
                feedbackId: props.feedbackId,
                tekst: props.text,
                svar: props.activeState + '',
            })
        }
        props.setThanksFeedback(false)
        if (isActive) {
            props.setActiveState(null)
        } else {
            props.setActiveState(props.feedback)
        }
    }

    return (
        <button
            type="button"
            aria-pressed={isActive}
            className={cn(
                'rounded-xl flex flex-col items-center py-2 gap-y-2 text-gray-900 w-[78px] h-[128px] hover:bg-gray-100',
                props.hoverColor,
                {
                    [`${props.hoverColor.split(':')[1]} bg-gray-100`]: isActive,
                },
            )}
            onClick={handleOnClick}
        >
            <props.Emoji fill={isActive ? props.color : undefined} />
            <BodyShort weight="semibold" className="cursor-pointer">
                {props.text}
            </BodyShort>
        </button>
    )
}
