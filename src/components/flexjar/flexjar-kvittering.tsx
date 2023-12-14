import { Label } from '@navikt/ds-react'
import React, { useState } from 'react'

import { cn } from '../../utils/tw-utils'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../amplitude/amplitude'

import { FillProps, glad, lei, noytral, sinna, veldigGlad } from './emojies'
import { FlexjarFelles } from './flexjar-felles'

export const FlexjarKvittering = () => {
    const [activeState, setActiveState] = useState<number | string | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const { valgtSoknad } = useSoknadMedDetaljer()
    const feedbackButtonProps = {
        activeState,
        setThanksFeedback,
        setActiveState,
    }
    const feedbackId = 'sykepengesoknad-kvittering'
    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={() => 'Fortell oss om din opplevelse (valgfritt)'}
            flexjarsporsmal="Hvordan opplevde du denne søknaden?"
            flexjartittel="Hjelp oss med å gjøre søknaden bedre"
            app="sykepengesoknad-frontend"
            feedbackProps={{
                soknadstype: valgtSoknad?.soknadstype.toString(),
            }}
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

interface EmojiButtonProps {
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

const EmojiButton = (props: EmojiButtonProps) => {
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
            <Label className="cursor-pointer">{props.text}</Label>
        </button>
    )
}
