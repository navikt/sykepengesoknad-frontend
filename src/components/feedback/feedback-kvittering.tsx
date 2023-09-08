import { Button, Heading, Label, Skeleton, Textarea } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaceSmileIcon } from '@navikt/aksel-icons'

import { Soknad } from '../../types/types'
import UseFlexjarFeedback from '../../hooks/useFlexjarFeedback'
import { cn } from '../../utils/tw-utils'

import { FillProps, glad, lei, noytral, sinna, veldigGlad } from './emojies'

type Feedbacktype = 1 | 2 | 3 | 4 | 5

interface FeedbackButtonProps {
    feedbacktype: Feedbacktype
    soknad: Soknad | undefined
    activeState: Feedbacktype | null
    setThanksFeedback: (b: boolean) => void
    setActiveState: (s: Feedbacktype | null) => void
}

export const FeedbackKvittering = ({ soknad }: { soknad: Soknad | undefined }) => {
    const [textValue, setTextValue] = useState('')
    const [activeState, setActiveState] = useState<Feedbacktype | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const textAreaRef = useRef(null)
    const { mutate: giFeedback } = UseFlexjarFeedback()

    useEffect(() => {
        textValue && errorMsg && setErrorMsg(null)
    }, [textValue, errorMsg])

    useEffect(() => {
        activeState && textAreaRef.current && (textAreaRef.current as any).focus()
        setErrorMsg(null)
    }, [activeState])

    const fetchFeedback = async (): Promise<void> => {
        if (activeState === null) {
            return
        }

        const body = {
            feedback: textValue,
            feedbackId: 'sykepengesoknad-sporsmal',
            svar: activeState,
            app: 'sykepengesoknad-frontend',
        }

        await giFeedback(body)
    }

    const handleSend = async () => {
        await fetchFeedback()
        setErrorMsg(null)

        setActiveState(null)
        setTextValue('')
        setThanksFeedback(true)
    }

    const feedbackButtonProps = {
        soknad,
        activeState,
        setThanksFeedback,
        setActiveState,
    }

    return (
        <section aria-label="Tilbakemelding på søknaden">
            <div className="w:full mt-16 md:w-3/4" data-cy="feedback-wrapper">
                <div className="mt-1 rounded-xl bg-surface-subtle p-6">
                    <Label as={soknad ? 'p' : Skeleton}>Hvordan opplevde du denne søknaden?</Label>
                    <Label className="mb-4" as={soknad ? 'p' : Skeleton}>
                        Tilbakemeldingen er anonym
                    </Label>
                    <div className="flex w-full justify-center gap-4">
                        <FeedbackButton feedbacktype={1} {...feedbackButtonProps}></FeedbackButton>
                        <FeedbackButton feedbacktype={2} {...feedbackButtonProps}></FeedbackButton>
                        <FeedbackButton feedbacktype={3} {...feedbackButtonProps}></FeedbackButton>
                        <FeedbackButton feedbacktype={4} {...feedbackButtonProps}></FeedbackButton>
                        <FeedbackButton feedbacktype={5} {...feedbackButtonProps}></FeedbackButton>
                    </div>
                    {activeState !== null && (
                        <form className="mt-6 flex w-full flex-col gap-4">
                            <Textarea
                                data-cy="feedback-textarea"
                                ref={textAreaRef}
                                error={errorMsg}
                                label="Fortell oss om din opplevelse (valgfritt)"
                                onKeyDown={async (e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        await handleSend()
                                    }
                                }}
                                value={textValue}
                                onChange={(e) => {
                                    setThanksFeedback(false)
                                    setTextValue(e.target.value)
                                }}
                                maxLength={600}
                                minRows={3}
                                description="Ikke skriv inn navn eller andre personopplysninger. Svaret ditt blir brukt til å forbedre søknaden og vil ikke påvirke eller saksbehandle søknaden din."
                            />
                            <Button
                                data-cy="send-feedback"
                                className="mr-auto"
                                size="small"
                                variant="secondary-neutral"
                                onClick={async (e) => {
                                    e.preventDefault()
                                    await handleSend()
                                }}
                            >
                                Send tilbakemelding
                            </Button>
                        </form>
                    )}
                </div>
                <div aria-live="polite">
                    {thanksFeedback && (
                        <div className="mt-2 rounded-xl bg-green-50 p-6">
                            <Heading size="small" as="p" className="flex items-center">
                                Takk for tilbakemeldingen din! <FaceSmileIcon></FaceSmileIcon>
                            </Heading>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

interface FeedbackConfig {
    emoji: (fp: FillProps) => React.JSX.Element
    text: string
    color: string
    hoverColor: string
}

const feedbackConfigs: Record<number, FeedbackConfig> = {
    1: {
        emoji: sinna,
        text: 'Veldig dårlig',
        color: 'var(--a-red-100)',
        hoverColor: 'hover:text-red-500',
    },
    2: {
        emoji: lei,
        text: 'Dårlig',
        color: 'var(--a-orange-100)',
        hoverColor: 'hover:text-orange-500',
    },
    3: {
        emoji: noytral,
        text: 'Nøytral',
        color: 'var(--a-blue-100)',
        hoverColor: 'hover:text-blue-500',
    },
    4: {
        emoji: glad,
        text: 'Bra',
        color: 'var(--a-green-100)',
        hoverColor: 'hover:text-green-400',
    },
    5: {
        emoji: veldigGlad,
        text: 'Veldig bra',
        color: 'var(--a-green-200)',
        hoverColor: 'hover:text-green-700',
    },
}

const FeedbackButton = (props: FeedbackButtonProps) => {
    const feedback = feedbackConfigs[props.feedbacktype]
    const isActive = props.activeState === props.feedbacktype

    const handleOnClick = () => {
        props.setThanksFeedback(false)
        if (isActive) {
            props.setActiveState(null)
        } else {
            props.setActiveState(props.feedbacktype)
        }
    }

    return (
        <button
            type={'button'}
            className={cn(
                'rounded-xl flex flex-col items-center py-2 gap-y-2 text-gray-900 w-[78px] h-[128px] hover:bg-gray-100',
                feedback.hoverColor,
                {
                    [`${feedback.hoverColor.split(':')[1]} bg-gray-100`]: isActive,
                },
            )}
            onClick={handleOnClick}
        >
            <feedback.emoji fill={isActive ? feedback.color : undefined} />
            <Label className="cursor-pointer">{feedback.text}</Label>
        </button>
    )
}
