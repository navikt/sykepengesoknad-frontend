import React from 'react'

import { tekst } from '../../utils/tekster'
import { Banner } from '../banner/banner'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import NyAlertGammeltDesign, { Funksjon } from '../generelle-komponenter/NyAlertGammeltDesign'

const Vedlikehold = () => {
    useUpdateBreadcrumbs(() => [], [])

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />

            <NyAlertGammeltDesign
                funksjon={Funksjon.warning}
                info="Vi gjør dessverre vedlikehold på denne siden akkurat nå. Vennligst prøv igjen om noen timer."
            />
        </>
    )
}

export default Vedlikehold
