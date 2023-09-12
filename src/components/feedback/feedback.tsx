import { Button, Heading, Label, Skeleton, Textarea } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaceSmileIcon } from '@navikt/aksel-icons'

import { cn } from '../../utils/tw-utils'
import { Soknad } from '../../types/types'
import UseFlexjarFeedback from '../../hooks/useFlexjarFeedback'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { TagTyper } from '../../types/enums'

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

export const Feedback = ({ soknad, steg }: { soknad: Soknad | undefined; steg: number }) => {
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
        setActiveState(null)
        setTextValue('')
        setThanksFeedback(false)
    }, [steg])

    useEffect(() => {
        activeState && textAreaRef.current && (textAreaRef.current as any).focus()
        setErrorMsg(null)
    }, [activeState])

    const sporsmal = soknad?.sporsmal[steg - 1]

    if (steg <= 1 && soknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return null
    }

    if (steg == soknad?.sporsmal.filter((s) => s.tag !== TagTyper.VAER_KLAR_OVER_AT).length) {
        return null
    }

    const fetchFeedback = async (): Promise<void> => {
        if (activeState === null) {
            return
        }

        const body = {
            feedback: textValue,
            feedbackId: 'sykepengesoknad-sporsmal',
            svar: activeState,
            app: 'sykepengesoknad-frontend',
            sporsmal: sporsmal?.tag,
        }

        await giFeedback(body)
    }

    const handleSend = async () => {
        if ((activeState === Feedbacktype.FORBEDRING || activeState === Feedbacktype.NEI) && textValue === '') {
            setErrorMsg('Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.')
            return
        }
        await fetchFeedback()
        setErrorMsg(null)

        setActiveState(null)
        setTextValue('')
        setThanksFeedback(true)
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
        <section aria-label="Tilbakemelding på søknaden">
            <div className="w:full mt-16 md:w-3/4" data-cy="feedback-wrapper">
                <div className="mt-1 rounded-xl bg-surface-subtle p-6">
                    <Label className="mb-6" as={soknad ? 'p' : Skeleton}>
                        Opplever du at du har nok informasjon til å svare på dette spørsmålet?
                    </Label>
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
                    {activeState !== null && (
                        <form className="mt-6 flex w-full flex-col gap-4">
                            <Textarea
                                data-cy="feedback-textarea"
                                ref={textAreaRef}
                                error={errorMsg}
                                label={getPlaceholder()}
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
                                type="button"
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
    return (
        <Button
            data-cy={'feedback-' + props.feedbacktype}
            variant="secondary-neutral"
            size="small"
            type="button"
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
