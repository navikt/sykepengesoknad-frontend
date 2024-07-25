import { BodyShort, FileObject, UNSAFE_FileUpload, VStack } from '@navikt/ds-react'
import React, { Dispatch, SetStateAction } from 'react'

// import {
//     formaterFilstørrelse,
//     maxFilstørrelse,
// } from '../../../utils/fil-utils'
// import { getLedetekst, tekst } from '../../../utils/tekster'

import Vis from '../../vis'
import { tekst } from '../../../utils/tekster'

// const maks = formaterFilstørrelse(maxFilstørrelse)

export interface FilOpplasterProps {
    valgtFil: FileObject[]
    setValgtFil: Dispatch<SetStateAction<FileObject[]>>
}

const FilOpplaster = ({ valgtFil, setValgtFil }: FilOpplasterProps) => {
    const MAX_FILE_SIZE_IN_MEGA_BYTES = 5

    const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MEGA_BYTES * 1024 * 1024



    /*

    https://youtu.be/cc_xmawJ8Kg?t=420
    what register does

    but how do I register this component? maybe sync it with a hidden file input?

    write your own onsubmit:
    https://youtu.be/cc_xmawJ8Kg?t=467

     */

    return (
        <VStack gap="6" data-cy="filopplasteren">
            <UNSAFE_FileUpload.Dropzone
                accept=".png,.jpg,.jpeg"
                maxSizeInBytes={MAX_FILE_SIZE_IN_BYTES}
                label={tekst('drag_and_drop.label')}
                fileLimit={{ max: 1, current: valgtFil.length }}
                multiple={false}
                onSelect={setValgtFil}
            />
            <div>{valgtFil.length > 0 && valgtFil[0].file.size.toString()}</div>
            <div>{MAX_FILE_SIZE_IN_BYTES}</div>
            <div>
                {valgtFil.length > 0 && valgtFil[0].file?.size > MAX_FILE_SIZE_IN_BYTES && <>the file is to large</>}
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
