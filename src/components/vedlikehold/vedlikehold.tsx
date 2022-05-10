import { Alert } from '@navikt/ds-react'
import React from 'react'

import { Brodsmule } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
        sti: '/soknader',
        erKlikkbar: false,
    },
]

const Vedlikehold = () => {
    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Alert variant={'warning'}>
                    Vi gjør dessverre vedlikehold på denne siden akkurat nå.
                    Vennligst prøv igjen om noen timer.
                </Alert>
            </div>
        </>
    )
}

export default Vedlikehold
