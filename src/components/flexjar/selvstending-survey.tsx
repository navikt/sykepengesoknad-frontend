import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, BodyShort, Button, Checkbox, CheckboxGroup, Heading, Label, Modal, Textarea } from '@navikt/ds-react'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../amplitude/amplitude'
import { useWindowSize } from '../../utils/useWindowSize'

import { FeedbackButton } from './flexjar-felles'
import { UseOpprettFlexjarFeedback } from './queryhooks/useOpprettFlexjarFeedback'
import { UseOppdaterFlexjarFeedback } from './queryhooks/useOppdaterFlexjarFeedback'

export const SelvstendingSurveyModal = ({ onSubmit, visSurvey }: { onSubmit: () => void; visSurvey: boolean }) => {
    const flexjarsporsmal = 'Var noen av spørsmålene vi stilte om virksomheten din vanskelige å svare på?'
    const feedbackId = 'sn-virkshomheten-din-survey'
    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const { valgtSoknad } = useSoknadMedDetaljer()
    const feedbackProps = useMemo(() => {
        return {}
    }, [])
    const [vanskeligeSporsmal, setVanskeligeSporsmal] = useState<string[]>([])

    const [textValue, setTextValue] = useState('')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const textAreaRef = useRef(null)
    const { mutate: giFeedback, data, reset } = UseOpprettFlexjarFeedback()
    const { mutate: oppdaterFeedback } = UseOppdaterFlexjarFeedback()
    const fetchFeedback = useCallback(
        async (knappeklikk?: () => void): Promise<boolean> => {
            if (activeState === null) {
                return false
            }

            const body = {
                feedback: textValue,
                feedbackId: feedbackId,
                svar: activeState,
                ...feedbackProps,
                vanskeligeSporsmal: JSON.stringify(vanskeligeSporsmal),
            }
            if (data?.id) {
                oppdaterFeedback({ body, id: data.id, cb: knappeklikk })
                return true
            } else {
                giFeedback(body)
                return false
            }
        },
        [activeState, data.id, feedbackProps, giFeedback, oppdaterFeedback, textValue, vanskeligeSporsmal],
    )
    useEffect(() => {
        setErrorMsg(null)
    }, [activeState])

    useEffect(() => {
        fetchFeedback().catch()
        // kan ikke bruke fetchFeedback som dependency, da blir det dobble kall
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeState])

    const feedbackPropsString = JSON.stringify(feedbackProps)
    useEffect(() => {
        setErrorMsg(null)
        setTextValue('')
        setActiveState(null)
        reset()
    }, [feedbackPropsString, setActiveState, feedbackId, reset])

    const sendTilbakemelding = 'Send tilbakemelding'

    const handleSend = async (p: () => void) => {
        logEvent('knapp klikket', {
            komponent: 'flexjar',
            feedbackId: feedbackId,
            svar: activeState + '',
            tekst: sendTilbakemelding,
        })
        const oppdatert = await fetchFeedback(p)
        if (oppdatert) {
            setErrorMsg(null)

            setActiveState(null)
            setTextValue('')
            setThanksFeedback(true)
        }
    }
    const alternativerCheck = [
        'Avviklet virksomhet',
        'Ny i arbeidslivet',
        'Varig endring i arbeidssituasjon eller virksomhet',
        'Endring i inntekt på mer enn 25%',
        'Annet',
    ]

    if (thanksFeedback) {
    }
    useEffect(() => {
        if (activeState === 'NEI') {
            setThanksFeedback(true)
        }
    }, [activeState, setThanksFeedback])
    const feedbackButtonProps = {
        valgtSoknad,
        activeState,
        setThanksFeedback,
        setActiveState,
        color: 'var(--a-red-100)',
        hoverColor: 'hover:text-blue-500',
        width: 'w-full',
    }
    const { mobile, width } = useWindowSize()

    function modalStyle() {
        if (mobile && width) {
            const number = Math.max(width - 8 * 2, 128)
            return {
                width: number,
                margin: 'mx-auto',
            }
        }
        return undefined
    }

    return (
        <Modal
            width={modalStyle()?.width}
            className={modalStyle()?.margin}
            open={visSurvey}
            aria-labelledby="modal-heading"
            onClose={() => {
                onSubmit()
            }}
        >
            {!thanksFeedback && (
                <>
                    <Modal.Header className="bg-bg-subtle">
                        <Heading level="1" size="medium" id="modal-heading" spacing>
                            Vi hører gjerne fra deg
                        </Heading>
                        <BodyShort>Svarene dine er anonyme</BodyShort>
                    </Modal.Header>

                    <div className="flex flex-row-reverse flex-wrap gap-4 p-6 pt-4">
                        <>
                            <div>
                                <div>
                                    {!thanksFeedback && (
                                        <div>
                                            <div className="border-b-text-action">
                                                <Label as="p" className="mb-8">
                                                    {flexjarsporsmal}
                                                </Label>
                                                <div className="flex w-full gap-2">
                                                    <FeedbackButton
                                                        feedbackId={feedbackId}
                                                        tekst="Ja"
                                                        svar="JA"
                                                        {...feedbackButtonProps}
                                                    />
                                                    <FeedbackButton
                                                        feedbackId={feedbackId}
                                                        tekst="Nei"
                                                        svar="NEI"
                                                        {...feedbackButtonProps}
                                                    />
                                                </div>

                                                {activeState !== null && (
                                                    <form className="mt-10 w-full border-t-border-default border-t">
                                                        {activeState == 'JA' && (
                                                            <CheckboxGroup
                                                                className="mt-8 mb-8"
                                                                legend="Hva var vanskelig å svare på? (valgfritt)"
                                                                description="(Du kan huke av for flere alternativer)"
                                                                onChange={(e) => {
                                                                    setVanskeligeSporsmal(e)
                                                                }}
                                                            >
                                                                {alternativerCheck.map((alternativ) => {
                                                                    return (
                                                                        <Checkbox value={alternativ} key={alternativ}>
                                                                            {alternativ}
                                                                        </Checkbox>
                                                                    )
                                                                })}
                                                            </CheckboxGroup>
                                                        )}
                                                        <Textarea
                                                            ref={textAreaRef}
                                                            error={errorMsg}
                                                            label="Vil du foreslå en forbedring? (valgfritt)"
                                                            description="Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger."
                                                            onKeyDown={async (e) => {
                                                                if (e.key === 'Enter' && e.ctrlKey) {
                                                                    e.preventDefault()
                                                                    await handleSend(() => reset())
                                                                }
                                                            }}
                                                            value={textValue}
                                                            onChange={(e) => {
                                                                setThanksFeedback(false)
                                                                setErrorMsg(null)
                                                                setTextValue(e.target.value)
                                                            }}
                                                            maxLength={600}
                                                            minRows={2}
                                                        />
                                                        <Alert variant="warning" className="mt-4">
                                                            Tilbakemeldingen din er anonym og vil ikke knyttes til
                                                            søknaden din. Den brukes kun for å gjøre nettsidene bedre
                                                        </Alert>
                                                        <Button
                                                            className="mr-auto mt-6"
                                                            size="medium"
                                                            variant="secondary-neutral"
                                                            onClick={async (e) => {
                                                                e.preventDefault()
                                                                await handleSend(() => reset())
                                                            }}
                                                        >
                                                            {sendTilbakemelding}
                                                        </Button>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                    <Modal.Footer>
                        <Button
                            variant="tertiary"
                            size="small"
                            className="px-6 mt-8"
                            onClick={(e) => {
                                logEvent('knapp klikket', {
                                    tekst: 'Jeg vil ikke gi tilbakemelding',
                                    soknadstype: valgtSoknad?.soknadstype,
                                    component: feedbackId,
                                })
                                e.preventDefault()
                                onSubmit()
                            }}
                        >
                            Jeg vil ikke gi tilbakemelding
                        </Button>
                    </Modal.Footer>
                </>
            )}
            {thanksFeedback && (
                <>
                    <Modal.Header className="bg-surface-success-subtle">
                        <Heading level="1" size="medium" id="modal-heading" spacing>
                            Takk for tilbakemeldingen!
                        </Heading>
                    </Modal.Header>
                    <Modal.Footer className="bg-surface-success-subtle">
                        <Button
                            variant="tertiary"
                            size="small"
                            onClick={(e) => {
                                logEvent('knapp klikket', {
                                    tekst: 'Jeg vil ikke gi tilbakemelding',
                                    soknadstype: valgtSoknad?.soknadstype,
                                    component: feedbackId,
                                })
                                e.preventDefault()
                                onSubmit()
                            }}
                        >
                            Lukk vindu
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    )
}
