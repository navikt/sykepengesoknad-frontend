// file: src/components/flexjar/selvstending-survey.tsx
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, BodyShort, Button, Heading, Modal, Radio, RadioGroup, Textarea } from '@navikt/ds-react'
import { PaperplaneIcon } from '@navikt/aksel-icons'

import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../amplitude/amplitude'
import { useWindowSize } from '../../utils/useWindowSize'

import { UseOpprettFlexjarFeedback } from './queryhooks/useOpprettFlexjarFeedback'
import { UseOppdaterFlexjarFeedback } from './queryhooks/useOppdaterFlexjarFeedback'

const FEEDBACK_ID = 'sn-virkshomheten-din-survey'
const DIFFICULTY_OPTIONS = ['Veldig enkelt', 'Ganske enkelt', 'Litt vanskelig', 'Veldig vanskelig']

export const SelvstendingSurveyModal = ({ onSubmit, visSurvey }: { onSubmit: () => void; visSurvey: boolean }) => {
    const [thanksFeedback, setThanksFeedback] = useState(false)
    const [valgtSvaralternativ, setValgtSvaralternativ] = useState('')
    const [utfyllendeSvar, setUtfyllendeSvar] = useState('')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string | null>(null)

    const { valgtSoknad } = useSoknadMedDetaljer()
    const { mobile, width } = useWindowSize()
    const { mutate: giFeedback, data } = UseOpprettFlexjarFeedback()
    const { mutate: oppdaterFeedback } = UseOppdaterFlexjarFeedback()

    const submitFeedback = useCallback(async () => {
        const body = {
            feedback: utfyllendeSvar,
            feedbackId: FEEDBACK_ID,
            svar: valgtSvaralternativ,
        }

        if (data?.id) {
            oppdaterFeedback({
                body,
                id: data.id,
                cb: () => {
                    setThanksFeedback(true)
                    setErrorMsg(null)
                    setValidationError(null)
                },
            })
        } else {
            giFeedback(body)
        }
    }, [data?.id, giFeedback, oppdaterFeedback, utfyllendeSvar, valgtSvaralternativ])

    const handleSend = async () => {
        if (!valgtSvaralternativ) {
            setValidationError('Du må velge hvor enkelt eller vanskelig spørsmålet hadde vært å svare på.')
            return
        }

        setValidationError(null)

        logEvent('knapp klikket', {
            komponent: 'flexjar',
            feedbackId: FEEDBACK_ID,
            svar: valgtSvaralternativ,
            tekst: utfyllendeSvar,
        })
        await submitFeedback()
    }

    const handleClose = () => {
        logEvent('knapp klikket', {
            tekst: 'Jeg vil ikke gi tilbakemelding',
            soknadstype: valgtSoknad?.soknadstype,
            component: FEEDBACK_ID,
        })
        onSubmit()
    }

    const handleDifficultyChange = (value: string) => {
        setValgtSvaralternativ(value)
        setValidationError(null)
    }

    const modalStyle =
        mobile && width
            ? {
                  width: Math.max(width - 16, 128),
                  margin: 'mx-auto',
              }
            : undefined

    // Initialize feedback on mount
    useEffect(() => {
        submitFeedback().catch(console.error)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Modal
            width={modalStyle?.width}
            className={modalStyle?.margin}
            open={visSurvey}
            aria-labelledby="modal-heading"
            onClose={handleClose}
        >
            {!thanksFeedback ? (
                <>
                    <Modal.Header className="bg-bg-subtle">
                        <Heading level="1" size="medium" id="modal-heading" spacing>
                            Hjelp oss å gjøre søknaden bedre!
                        </Heading>
                    </Modal.Header>

                    <div className="flex flex-row-reverse flex-wrap gap-4 p-6 pt-4">
                        <div className="border-b-text-action">
                            <BodyShort className="mb-8">
                                Vi jobber med å forbedre søknaden og vil gjerne høre hva du synes om dette spørsmålet:
                            </BodyShort>

                            <BodyShort className="bg-blue-50 p-4 rounded-lg font-bold">
                                Har du jobbet noe i løpet av de siste fire ukene før du ble sykmeldt?
                            </BodyShort>

                            <form className="mt-10 w-full">
                                <RadioGroup
                                    className="mt-8 mb-8"
                                    legend="Hvis du hadde fått dette spørsmålet, hvor enkelt eller vanskelig hadde det vært å svare på?"
                                    onChange={handleDifficultyChange}
                                    value={valgtSvaralternativ}
                                    error={validationError}
                                >
                                    {DIFFICULTY_OPTIONS.map((option) => (
                                        <Radio value={option} key={option}>
                                            {option}
                                        </Radio>
                                    ))}
                                </RadioGroup>

                                <Textarea
                                    error={errorMsg}
                                    label="Vil du forklare hvorfor? (valgfritt)"
                                    description="Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger."
                                    value={utfyllendeSvar}
                                    onChange={(e) => {
                                        setErrorMsg(null)
                                        setUtfyllendeSvar(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.ctrlKey) {
                                            e.preventDefault()
                                            handleSend()
                                        }
                                    }}
                                    maxLength={600}
                                    minRows={2}
                                />

                                <Alert variant="warning" className="mt-4">
                                    Tilbakemeldingen din er anonym og vil ikke knyttes til søknaden din. Den brukes kun
                                    for å gjøre nettsidene bedre
                                </Alert>

                                <Button
                                    className="mr-auto mt-6"
                                    size="medium"
                                    variant="secondary"
                                    iconPosition="right"
                                    icon={<PaperplaneIcon fontSize="1.5rem" />}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSend()
                                    }}
                                >
                                    Send tilbakemelding
                                </Button>
                            </form>
                        </div>
                    </div>

                    <Modal.Footer>
                        <Button variant="tertiary" size="small" className="px-6 mt-8" onClick={handleClose}>
                            Jeg vil ikke gi tilbakemelding
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header className="bg-surface-success-subtle">
                        <Heading level="1" size="medium" id="modal-heading" spacing>
                            Takk for tilbakemeldingen!
                        </Heading>
                    </Modal.Header>
                    <Modal.Footer className="bg-surface-success-subtle">
                        <Button variant="tertiary" size="small" onClick={handleClose}>
                            Lukk vindu
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    )
}
