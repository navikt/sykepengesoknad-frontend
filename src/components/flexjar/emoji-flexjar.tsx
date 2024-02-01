import React from 'react'

import { glad, lei, noytral, sinna, veldigGlad } from './emojies'
import { FlexjarFelles } from './flexjar-felles'
import { EmojiButton } from './emoji-button'

interface EmojiFlexjarProps {
    feedbackId: string
    activeState: string | number | null
    setActiveState: (s: string | number | null) => void
    thanksFeedback: boolean
    setThanksFeedback: (b: boolean) => void
    getPlaceholder: () => string
    textRequired?: boolean
    flexjarsporsmal: string
    flexjartittel: string
    app: string
    feedbackProps: Record<string, string | undefined | boolean>
}

export const EmojiFlexjar = ({
    feedbackId,
    getPlaceholder,
    activeState,
    setActiveState,
    thanksFeedback,
    setThanksFeedback,
    flexjartittel,
    flexjarsporsmal,
    app,
    feedbackProps,
}: EmojiFlexjarProps) => {
    const feedbackButtonProps = {
        activeState,
        setThanksFeedback,
        setActiveState,
    }
    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={getPlaceholder}
            flexjarsporsmal={flexjarsporsmal}
            flexjartittel={flexjartittel}
            app={app}
            feedbackProps={feedbackProps}
        >
            <div className="flex w-full gap-2">
                <div className="flex w-full justify-center gap-4">
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={1}
                        Emoji={sinna}
                        text="Veldig dårlig"
                        color="var(--a-red-100)"
                        hoverColor="hover:text-red-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={2}
                        Emoji={lei}
                        text="Dårlig"
                        color="var(--a-orange-100)"
                        hoverColor="hover:text-orange-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={3}
                        Emoji={noytral}
                        text="Nøytral"
                        color="var(--a-blue-100)"
                        hoverColor="hover:text-blue-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={4}
                        Emoji={glad}
                        text="Bra"
                        color="var(--a-green-100)"
                        hoverColor="hover:text-green-400"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
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
