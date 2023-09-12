import { Label } from '@navikt/ds-react'
import React, { useState } from 'react'

import { cn } from '../../utils/tw-utils'

import { FillProps, glad, lei, noytral, sinna, veldigGlad } from './emojies'
import { FlexjarFelles } from './flexjar-felles'

type Feedbacktype = 1 | 2 | 3 | 4 | 5

export const FlexjarKvittering = () => {
    const [activeState, setActiveState] = useState<Feedbacktype | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)

    const feedbackButtonProps = {
        activeState,
        setThanksFeedback,
        setActiveState,
    }
    return (
        <FlexjarFelles
            feedbackId="sykepengesoknad-kvittering"
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={() => 'Fortell oss om din opplevelse (valgfritt)'}
        >
            <div className="flex w-full gap-2">
                <div className="flex w-full justify-center gap-4">
                    <EmojiButton
                        feedback={1}
                        Emoji={sinna}
                        text="Veldig dårlig"
                        color="var(--a-red-100)"
                        hoverColor="hover:text-red-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedback={2}
                        Emoji={lei}
                        text="Dårlig"
                        color="var(--a-orange-100)"
                        hoverColor="hover:text-orange-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedback={3}
                        Emoji={noytral}
                        text="Nøytral"
                        color="var(--a-blue-100)"
                        hoverColor="hover:text-blue-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedback={4}
                        Emoji={glad}
                        text="bra"
                        color="var(--a-green-100)"
                        hoverColor="hover:text-green-400"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedback={5}
                        Emoji={veldigGlad}
                        text="Veldig bra"
                        color="var(--a-green-200)"
                        hoverColor="hover:text-green-700"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                </div>
            </div>
        </FlexjarFelles>
    )
}

interface EmojiButtonProps {
    feedback: Feedbacktype
    Emoji: (fp: FillProps) => React.JSX.Element
    text: string
    color: string
    hoverColor: string
    activeState: Feedbacktype | null
    setThanksFeedback: (b: boolean) => void
    setActiveState: (s: Feedbacktype | null) => void
}

const EmojiButton = (props: EmojiButtonProps) => {
    const isActive = props.activeState === props.feedback

    const handleOnClick = () => {
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
            <Label className="cursor-pointer">{props.text}</Label>
        </button>
    )
}
