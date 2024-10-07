import { BodyShort, FileObject, UNSAFE_FileUpload } from '@navikt/ds-react'
import React, { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'

import { tekst } from '../../../utils/tekster'

export interface FilOpplasterProps {
    valgtFil: FileObject[]
    setValgtFil: Dispatch<SetStateAction<FileObject[]>>
}

const FilOpplaster = ({ valgtFil, setValgtFil }: FilOpplasterProps) => {
    const {
        formState: { errors },
    } = useFormContext()

    return (
        <div data-cy="filopplasteren">
            <div className="mb-6">
                <UNSAFE_FileUpload.Dropzone
                    accept=".png,.jpeg,.jpg"
                    label={tekst('drag_and_drop.label')}
                    fileLimit={{ max: 1, current: valgtFil.length }}
                    multiple={false}
                    onSelect={setValgtFil}
                />
            </div>
            {valgtFil.map((file) => (
                <UNSAFE_FileUpload.Item
                    key={file.file.name}
                    file={file.file}
                    button={{
                        action: 'delete',
                        onClick: () => setValgtFil([]),
                    }}
                />
            ))}
            <div role="alert" aria-live="assertive">
                {errors.fil_input && (
                    <BodyShort
                        as="span"
                        className="mt-2 flex gap-2 font-bold text-surface-danger before:content-['•']"
                        data-cy="feil-lokal"
                    >
                        <>{errors.fil_input?.message}</>
                    </BodyShort>
                )}
            </div>
        </div>
    )
}

export default FilOpplaster
