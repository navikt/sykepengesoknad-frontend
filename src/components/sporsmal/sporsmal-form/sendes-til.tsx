import './sendes-til.less'

import parser from 'html-react-parser'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { RSMottaker } from '../../../types/rs-types/rs-mottaker'
import { getLedetekst, tekst } from '../../../utils/tekster'

const SendesTil = () => {
    const { valgtSoknad, mottaker } = useAppStore()
    const [ nokkel, setNokkel ] = useState<string>()

    useEffect(() => {
        if (mottaker === RSMottaker.ARBEIDSGIVER) {
            setNokkel('sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker')
            valgtSoknad!.sendtTilArbeidsgiverDato = new Date()
        }
        if (mottaker === RSMottaker.NAV) {
            setNokkel('sykepengesoknad.oppsummering.nav-som-mottaker')
        }
        if (mottaker === RSMottaker.ARBEIDSGIVER_OG_NAV) {
            setNokkel('sykepengesoknad.oppsummering.nav-arbeidsgiver-som-mottaker')
        }

        // eslint-disable-next-line
    }, [mottaker]);

    if (!mottaker || !nokkel || valgtSoknad?.arbeidssituasjon !== 'ARBEIDSTAKER') {
        return null
    }


    return (
        <div className="bottom_line">
            <Normaltekst tag='div'>
                {valgtSoknad!.arbeidsgiver !== undefined
                    ? parser(getLedetekst(tekst(nokkel), {
                        '%ARBEIDSGIVER%': valgtSoknad?.arbeidsgiver.navn,
                    }))
                    : parser(tekst(nokkel))
                }
            </Normaltekst>
        </div>
    )
}

export default SendesTil
