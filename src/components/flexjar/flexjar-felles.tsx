import React, { useEffect, useRef, useState } from 'react'
import { Button, Heading, Label, Skeleton, Textarea } from '@navikt/ds-react'
import { FaceSmileIcon } from '@navikt/aksel-icons'

import UseFlexjarFeedback from '../../hooks/useFlexjarFeedback'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

interface FlexjarFellesProps<T> {
    feedbackId: string
    children: React.ReactNode
    activeState: T | null
    setActiveState: (s: T | null) => void
    thanksFeedback: boolean
    setThanksFeedback: (b: boolean) => void
    getPlaceholder: () => string
    textRequired?: boolean
    flexjarsporsmal: string
}

export function FlexjarFelles<T>({
    feedbackId,
    getPlaceholder,
    activeState,
    setActiveState,
    thanksFeedback,
    setThanksFeedback,
    children,
    textRequired,
    flexjarsporsmal,
}: FlexjarFellesProps<T>) {
    const [textValue, setTextValue] = useState('')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const textAreaRef = useRef(null)
    const { mutate: giFeedback } = UseFlexjarFeedback()
    const { valgtSoknad, sporsmal } = useSoknadMedDetaljer()

    useEffect(() => {
        textValue && errorMsg && setErrorMsg(null)
    }, [textValue, errorMsg])

    useEffect(() => {
        setErrorMsg(null)
    }, [activeState])

    const fetchFeedback = async (): Promise<void> => {
        if (activeState === null) {
            return
        }

        const body = {
            feedback: textValue,
            feedbackId: feedbackId,
            svar: activeState,
            app: 'sykepengesoknad-frontend',
            soknadstype: valgtSoknad?.soknadstype,
            sporsmal: sporsmal?.tag,
        }

        giFeedback(body)
    }

    const handleSend = async () => {
        if (textRequired && textValue === '') {
            setErrorMsg('Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.')
            return
        }
        await fetchFeedback()
        setErrorMsg(null)

        setActiveState(null)
        setTextValue('')
        setThanksFeedback(true)
    }

    return (
        <section>
            <div className="w:full mt-16 md:w-3/4">
                <div className="mt-1 rounded-xl bg-surface-subtle p-6">
                    <Label as={valgtSoknad ? 'h3' : Skeleton}>{flexjarsporsmal}</Label>
                    <Label className="mb-4" as={valgtSoknad ? 'p' : Skeleton}>
                        Tilbakemeldingen er anonym
                    </Label>
                    {children}
                    {activeState !== null && (
                        <form className="mt-6 flex w-full flex-col gap-4">
                            <Textarea
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
                                description="Ikke skriv inn navn eller andre personopplysninger. Svaret ditt blir brukt til å forbedre søknaden og vil ikke påvirke eller saksbehandle søknaden din."
                            />
                            <Button
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
