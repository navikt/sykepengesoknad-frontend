import { BodyShort, Button, ReadMore } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { ReceiptIcon } from '@navikt/aksel-icons'

import fetchMedRequestId, { AuthenticationError } from '../../../utils/fetch'
import {
    customTruncet,
    formaterFilstørrelse,
    formattertFiltyper,
    maxFilstørrelse,
    tillatteFiltyper,
} from '../../../utils/fil-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { Kvittering } from '../../../types/types'

const maks = formaterFilstørrelse(maxFilstørrelse)

export interface DragAndDropProps {
    valgtFil?: File
    setValgtFil: (arg0?: File) => void
    valgtKvittering?: Kvittering
}

const DragAndDrop = ({ valgtFil, setValgtFil, valgtKvittering }: DragAndDropProps) => {
    const {
        formState: { errors },
        register,
    } = useFormContext()
    const [formErDisabled, setFormErDisabled] = useState<boolean>(false)

    const hentKvittering = useCallback(async () => {
        const fetchResult = await fetchMedRequestId(
            `/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/kvittering/${valgtKvittering!.blobId}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            },
        )
        fetchResult.response.blob().then((blob) => {
            setValgtFil(blob as any)
        })
    }, [setValgtFil, valgtKvittering])

    useEffect(() => {
        if (valgtKvittering?.blobId) {
            setFormErDisabled(true)
            hentKvittering().catch((e) => {
                if (!(e instanceof AuthenticationError)) {
                    logger.warn(e)
                }
                return
            })
        } else {
            setFormErDisabled(false)
        }

        return () => {
            setValgtFil(undefined)
        }
    }, [setValgtFil, valgtKvittering, hentKvittering])

    const onDropCallback = useCallback(
        (filer: File[]) => {
            filer.forEach((fil: File) => {
                setValgtFil(fil)
            })
        },
        // eslint-disable-next-line
        [],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropCallback,
        multiple: false,
    })

    return (
        <div className="mt-2">
            <Vis
                hvis={valgtFil}
                render={() => (
                    <ReadMore className={'mb-4'} header={customTruncet(valgtFil?.name || 'Kvittering.png', 20)}>
                        {valgtFil ? <img alt="" src={URL.createObjectURL(valgtFil)} /> : null}
                    </ReadMore>
                )}
            />

            <Vis
                hvis={!formErDisabled}
                render={() => (
                    <>
                        <div data-cy="filopplasteren" {...getRootProps()}>
                            <input
                                {...getInputProps()}
                                accept={tillatteFiltyper}
                                id="ddfil"
                                type="file"
                                {...register('fil_input', {
                                    validate: {
                                        fil_valgt: () => {
                                            if (!valgtFil) {
                                                return tekst('opplasting_modal.filopplasting.feilmelding')
                                            }
                                        },
                                        fil_type: () => {
                                            if (valgtFil && !tillatteFiltyper.split(',').includes(valgtFil.type)) {
                                                return getLedetekst(tekst('drag_and_drop.filtype'), {
                                                    '%FILNAVN%': valgtFil.name,
                                                    '%TILLATTEFILTYPER%': formattertFiltyper,
                                                })
                                            }
                                        },
                                        fil_storrelse: () => {
                                            if (valgtFil && valgtFil.size > maxFilstørrelse) {
                                                return getLedetekst(tekst('drag_and_drop.maks'), {
                                                    '%FILNAVN%': valgtFil.name,
                                                    '%MAKSSTOR%': maks,
                                                })
                                            }
                                        },
                                    },
                                })}
                            />
                            <Button
                                className="w-full p-6"
                                variant="secondary"
                                aria-hidden
                                icon={<ReceiptIcon aria-hidden />}
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                {isDragActive
                                    ? tekst('drag_and_drop.dragtekst.aktiv')
                                    : valgtFil
                                    ? tekst('drag_and_drop.dragtekst.endre')
                                    : tekst('drag_and_drop.dragtekst')}
                            </Button>
                        </div>

                        <div role="alert" aria-live="assertive">
                            <Vis
                                hvis={errors.fil_input}
                                render={() => (
                                    <BodyShort
                                        as="span"
                                        className="mt-2 flex gap-2 font-bold text-surface-danger before:content-['•']"
                                        data-cy="feil-lokal"
                                    >
                                        <>{errors.fil_input?.message}</>
                                    </BodyShort>
                                )}
                            />
                        </div>
                    </>
                )}
            />
        </div>
    )
}

export default DragAndDrop
