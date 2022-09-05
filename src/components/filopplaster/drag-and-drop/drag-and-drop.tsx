import { BodyShort, Label } from '@navikt/ds-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import { FetchError, tryFetch } from '../../../utils/fetch'
import {
    customTruncet,
    formaterFilstørrelse,
    formattertFiltyper,
    maxFilstørrelse,
    tillatteFiltyper,
} from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Utvidbar from '../../utvidbar/utvidbar'
import Vis from '../../vis'

const maks = formaterFilstørrelse(maxFilstørrelse)

const DragAndDrop = () => {
    const { valgtFil, setValgtFil, valgtKvittering } = useAppStore()
    const {
        formState: { errors },
        register,
    } = useFormContext()
    const [formErDisabled, setFormErDisabled] = useState<boolean>(false)

    const hentKvittering = useCallback(async () => {
        const fetchResult = await tryFetch(
            `/syk/sykepengesoknad/api/flex-bucket-uploader/api/v2/kvittering/${valgtKvittering!.blobId}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        fetchResult.response.blob().then((blob) => {
            setValgtFil(blob as any)
        })
    }, [setValgtFil, valgtKvittering])

    useEffect(() => {
        if (valgtKvittering?.blobId) {
            setFormErDisabled(true)
            hentKvittering().catch((e) => {
                if (e instanceof FetchError) {
                    logger.error(e.message)
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
        (filer) => {
            filer.forEach((fil: File) => {
                setValgtFil(fil)
            })
        },
        // eslint-disable-next-line
        []
    )

    const { getRootProps, getInputProps, isDragActive, rootRef } = useDropzone({
        onDrop: onDropCallback,
        multiple: false,
    })

    const settInputHarFeil = () => {
        rootRef.current?.classList.add('skjemaelement__input--harFeil')
    }

    const fjernInputHarFeil = () => {
        rootRef.current?.classList.remove('skjemaelement__input--harFeil')
    }

    return (
        <div className="ddfil__wrap">
            <label htmlFor="ddfil" className="skjemaelement__label">
                <Label as="strong">{tekst('drag_and_drop.label')}</Label>
            </label>

            <Vis
                hvis={valgtFil}
                render={() => (
                    <Utvidbar
                        erApen={formErDisabled}
                        tittel={customTruncet(valgtFil?.name || 'Kvittering.png', 20)}
                        type="intern"
                    >
                        <div className="preview">
                            {valgtFil ? <img alt="" src={URL.createObjectURL(valgtFil)} /> : null}
                        </div>
                    </Utvidbar>
                )}
            />

            <Vis
                hvis={!formErDisabled}
                render={() => (
                    <>
                        <div className="filopplasteren" {...getRootProps()}>
                            <input {...getInputProps()} id="ddfil" />
                            <input
                                type="hidden"
                                id="fil_input"
                                {...register('fil_input', {
                                    validate: {
                                        fil_valgt: () => {
                                            if (!valgtFil) {
                                                settInputHarFeil()
                                                return tekst('opplasting_modal.filopplasting.feilmelding')
                                            }
                                        },
                                        fil_type: () => {
                                            if (valgtFil && !tillatteFiltyper.includes(valgtFil.type)) {
                                                settInputHarFeil()
                                                return getLedetekst(tekst('drag_and_drop.filtype'), {
                                                    '%FILNAVN%': valgtFil.name,
                                                    '%TILLATTEFILTYPER%': formattertFiltyper,
                                                })
                                            }
                                        },
                                        fil_storrelse: () => {
                                            if (valgtFil && valgtFil.size > maxFilstørrelse) {
                                                settInputHarFeil()
                                                return getLedetekst(tekst('drag_and_drop.maks'), {
                                                    '%FILNAVN%': valgtFil.name,
                                                    '%MAKSSTOR%': maks,
                                                })
                                            }
                                        },
                                        fjern_styling_hvis_ok: () => {
                                            fjernInputHarFeil()
                                            return true
                                        },
                                    },
                                })}
                            />
                            <img
                                src="/syk/sykepengesoknad/static/binders.svg"
                                className="opplastingsikon"
                                alt="Opplastingsikon"
                            />
                            <BodyShort as="span" className="tekst">
                                {isDragActive
                                    ? tekst('drag_and_drop.dragtekst.aktiv')
                                    : valgtFil
                                    ? tekst('drag_and_drop.dragtekst.endre')
                                    : tekst('drag_and_drop.dragtekst')}
                            </BodyShort>
                        </div>

                        <div role="alert" aria-live="assertive">
                            <BodyShort as="span" className="skjemaelement__feilmelding">
                                <Vis hvis={errors.fil_input} render={() => <>{errors.fil_input?.message}</>} />
                            </BodyShort>
                        </div>
                    </>
                )}
            />
        </div>
    )
}

export default DragAndDrop
