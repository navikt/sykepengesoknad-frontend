import { BodyShort, FileObject, UNSAFE_FileUpload, VStack } from '@navikt/ds-react'
import React, { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'

import Vis from '../../vis'
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
        <VStack gap="6" data-cy="filopplasteren">
            <UNSAFE_FileUpload.Dropzone
                accept=".png,.jpeg" // do we allow jpg as well? it's more common according to chatgpt
                // maxSizeInBytes={MAX_FILE_SIZE_IN_BYTES}
                label={tekst('drag_and_drop.label')}
                fileLimit={{ max: 1, current: valgtFil.length }} // TODO det går an å laste opp to
                multiple={false}
                onSelect={setValgtFil}
            />
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
            {/*<>{errors.fil_input?.message}</>*/}
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
        </VStack>
    )
}

export default FilOpplaster
