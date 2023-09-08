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

const FeedbackButton = (props: FeedbackButtonProps) => {
    const Emoji = (fp: FillProps) => {
        switch (props.feedbacktype) {
            case 1:
                return sinna(fp)
            case 2:
                return lei(fp)
            case 3:
                return noytral(fp)
            case 4:
                return glad(fp)
            case 5:
                return veldigGlad(fp)
        }
    }
    const tekst = () => {
        switch (props.feedbacktype) {
            case 1:
                return 'Veldig dårlig'
            case 2:
                return 'Dårlig'
            case 3:
                return 'Nøytral'
            case 4:
                return 'Bra'
            case 5:
                return 'Veldig bra'
        }
    }

    const fill = () => {
        if (props.activeState === props.feedbacktype) {
            switch (props.feedbacktype) {
                case 1:
                    return 'var(--a-red-100)'
                case 2:
                    return 'var(--a-orange-100)'
                case 3:
                    return 'var(--a-blue-100)'
                case 4:
                    return 'var(--a-green-100)'
                case 5:
                    return 'var(--a-green-200)'
            }
        }
        return undefined
    }
    return (
        <button
            className={cn(
                'rounded-xl flex flex-col items-center py-2 gap-y-2 text-gray-900 w-[78px] h-[128px] hover:bg-gray-100',
                {
                    'hover:text-red-500': props.feedbacktype === 1,
                    'hover:text-orange-500': props.feedbacktype === 2,
                    'hover:text-blue-500': props.feedbacktype === 3,
                    'hover:text-green-400': props.feedbacktype === 4,
                    'hover:text-green-700': props.feedbacktype === 5,
                    'text-red-500 bg-gray-100': props.activeState === props.feedbacktype && props.feedbacktype === 1,
                    'text-orange-500 bg-gray-100': props.activeState === props.feedbacktype && props.feedbacktype === 2,
                    'text-blue-500 bg-gray-100': props.activeState === props.feedbacktype && props.feedbacktype === 3,
                    'text-green-400 bg-gray-100': props.activeState === props.feedbacktype && props.feedbacktype === 4,
                    'text-green-700 bg-gray-100': props.activeState === props.feedbacktype && props.feedbacktype === 5,
                },
            )}
            onClick={() => {
                props.setThanksFeedback(false)
                if (props.activeState === props.feedbacktype) {
                    props.setActiveState(null)
                } else {
                    props.setActiveState(props.feedbacktype)
                }
            }}
        >
            <Emoji fill={fill()} />
            <Label className="cursor-pointer">{tekst()}</Label>
        </button>
    )
}
