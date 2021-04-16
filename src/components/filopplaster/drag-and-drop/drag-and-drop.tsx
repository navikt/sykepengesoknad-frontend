import './drag-and-drop.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { customTruncet, formaterFilstørrelse } from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Utvidbar from '../../utvidbar/utvidbar'
import VisBlock from '../../vis-block'
import binders from './binders.svg'

const formattertFiltyper = env.formaterteFiltyper
const tillatteFiltyper = env.tillatteFiltyper
const maxFilstørrelse = env.maksFilstørrelse
const maks = formaterFilstørrelse(maxFilstørrelse)

const DragAndDrop = () => {
    const { valgtFil, setValgtFil, valgtKvittering } = useAppStore()
    const { errors, register } = useFormContext()
    const [ formErDisabled, setFormErDisabled ] = useState<boolean>(false)

    useEffect(() => {
        if (valgtKvittering?.blobId) {
            setFormErDisabled(true)
            fetch(`${env.flexGatewayRoot}/flex-bucket-uploader/kvittering/${valgtKvittering.blobId}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
                if (res.ok) {
                    res.blob().then((blob) => {
                        setValgtFil(blob as any)
                    })
                } else {
                    logger.warn(`Klarte ikke hente bilde fra flex-bucket-uploader, status: ${res.status}`)
                }
            })
        } else {
            setValgtFil(undefined)
            setFormErDisabled(false)
        }
    }, [ setValgtFil, valgtKvittering ])

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
                <Element tag="strong">{tekst('drag_and_drop.label')}</Element>
            </label>

            <VisBlock hvis={valgtFil}
                render={() => {
                    return (
                        <Utvidbar
                            erApen={formErDisabled}
                            tittel={customTruncet(valgtFil?.name || 'Kvittering.png', 20)}
                            type="intern"
                            fixedHeight={true}
                        >
                            <div className="preview">{
                                valgtFil
                                    ? <img alt="" src={URL.createObjectURL(valgtFil)} />
                                    : null
                            }</div>
                        </Utvidbar>
                    )
                }}
            />

            <VisBlock hvis={!formErDisabled}
                render={() => {
                    return <>
                        <div className="filopplasteren" {...getRootProps()}>
                            <input {...getInputProps()} id="ddfil" />
                            <input type="hidden"
                                id="fil_input"
                                name="fil_input"
                                ref={register({
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
                                                return getLedetekst(tekst('drag_and_drop.filtype'), { '%FILNAVN%': valgtFil.name, '%TILLATTEFILTYPER%': formattertFiltyper })
                                            }
                                        },
                                        fil_storrelse: () => {
                                            if (valgtFil && valgtFil.size > maxFilstørrelse) {
                                                settInputHarFeil()
                                                return getLedetekst(tekst('drag_and_drop.maks'), { '%FILNAVN%': valgtFil.name, '%MAKSSTOR%': maks })
                                            }
                                        },
                                        fjern_styling_hvis_ok: () => {
                                            fjernInputHarFeil()
                                            return true
                                        }
                                    }
                                })}
                            />
                            <img src={binders} className="opplastingsikon" alt="Opplastingsikon" />
                            <Normaltekst tag="span" className="tekst">
                                {isDragActive
                                    ? tekst('drag_and_drop.dragtekst.aktiv')
                                    : valgtFil
                                        ? tekst('drag_and_drop.dragtekst.endre')
                                        : tekst('drag_and_drop.dragtekst')
                                }
                            </Normaltekst>
                        </div>

                        <div role="alert" aria-live="assertive">
                            <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                <VisBlock hvis={errors.fil_input}
                                    render={() => <>{errors.fil_input?.message}</>}
                                />
                            </Normaltekst>
                        </div>

                        <Normaltekst className="restriksjoner">
                            <span className="filtype">{
                                getLedetekst(tekst('opplasting_modal.filtyper'), {
                                    '%FILTYPER%': formattertFiltyper
                                })
                            }</span>
                            <span className="filstr">{
                                getLedetekst(tekst('opplasting_modal.maksfilstr'), {
                                    '%MAKSFILSTR%': maks
                                })
                            }</span>
                        </Normaltekst>
                    </>
                }}
            />
        </div>
    )
}

export default DragAndDrop
