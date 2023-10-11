import { Alert, Button } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import useSoknader from '../../../hooks/useSoknader'
import { useAvbryt } from '../../../hooks/useAvbryt'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const KnapperadAvbryt = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { data: soknader } = useSoknader()
    const { mutate: avbrytMutation, isLoading: avbryter, error: avbrytError } = useAvbryt()

    if (!valgtSoknad || !soknader) return null

    return (
        <>
            <Button
                variant="danger"
                type="button"
                loading={avbryter}
                onClick={(event) => {
                    event.preventDefault()
                    avbrytMutation({
                        valgtSoknad: valgtSoknad,
                    })
                }}
                data-cy="avbryt-soknad"
            >
                {tekst('sykepengesoknad.avbryt.simpel')}
            </Button>
            {avbrytError && (
                <Alert variant="error" className="mt-4">
                    {tekst('avbryt.feilet')}
                </Alert>
            )}
        </>
    )
}

export default KnapperadAvbryt
