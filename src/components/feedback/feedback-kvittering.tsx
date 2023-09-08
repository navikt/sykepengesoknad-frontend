import { Button, Heading, Label, Skeleton, Textarea } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaceSmileIcon } from '@navikt/aksel-icons'

import { Soknad } from '../../types/types'
import UseFlexjarFeedback from '../../hooks/useFlexjarFeedback'

import { glad, lei, noytral, sinna, veldigGlad } from './emojies'

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
                    <Label as={soknad ? 'p' : Skeleton} className="text-center">
                        Hvordan opplevde du denne søknaden?
                    </Label>
                    <Label className="mb-4 text-center" as={soknad ? 'p' : Skeleton}>
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
                                label="denne må fikses"
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
                                description="Ikke skriv inn navn eller andre personopplysninger. Svaret ditt blir brukt til å forbedre søknaden og vil ikke påvirke søknaden din."
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
    const emoji = () => {
        switch (props.feedbacktype) {
            case 1:
                return sinna()
            case 2:
                return lei()
            case 3:
                return noytral()
            case 4:
                return glad()
            case 5:
                return veldigGlad()
        }
    }
    return (
        <div className="text-gray-900 hover:text-blue-500">
            <button>{emoji()}</button>
        </div>
    )
}
