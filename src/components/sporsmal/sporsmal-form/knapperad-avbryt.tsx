import { Button } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import useSoknader from '../../../hooks/useSoknader'
import { useAvbryt } from '../../../hooks/useAvbryt'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import NyAlertGammeltDesign, { Funksjon } from '../../generelle-komponenter/NyAlertGammeltDesign'

const KnapperadAvbryt = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { data: soknader } = useSoknader()
    const { mutate: avbrytMutation, isPending: avbryter, error: avbrytError } = useAvbryt()

    if (!valgtSoknad || !soknader) return null

    return (
        <>
            <Button
                data-color="danger"
                variant="primary"
                type="button"
                loading={avbryter}
                onClick={(event) => {
                    event.preventDefault()
                    avbrytMutation({
                        valgtSoknad: valgtSoknad,
                    })
                }}
            >
                {tekst('sykepengesoknad.avbryt.simpel')}
            </Button>
            {avbrytError && <NyAlertGammeltDesign funksjon={Funksjon.danger} info={tekst('avbryt.feilet')} />}
        </>
    )
}

export default KnapperadAvbryt
