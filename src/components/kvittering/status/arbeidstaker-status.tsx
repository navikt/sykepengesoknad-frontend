import { Detail, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import Avkrysset from '../../oppsummering/utdrag/avkrysset'
import Vis from '../../vis'
import { Mottaker } from './kvittering-status'

const ArbeidstakerStatus = () => {
    const { valgtSoknad } = useAppStore()
    const [ tilArbNavn, setTilArbNavn ] = useState<string>()
    const [ tilOrg, setTilOrg ] = useState<string>()
    const [ tilNavDato, setTilNavDato ] = useState<string>()
    const [ tilArbDato, setTilArbDato ] = useState<string>()

    let medKopi = tekst('kvittering.med-kopi-til-nav')
    if (valgtSoknad!.sendtTilArbeidsgiverDato && valgtSoknad!.sendtTilNAVDato) {
        medKopi = ''
    }

    useEffect(() => {
        opprettDatoer()
        // eslint-disable-next-line
    }, [])

    const opprettDatoer = () => {
        const sendtTilNav = valgtSoknad?.sendtTilNAVDato
        if (sendtTilNav) {
            const datoNav = dayjs(sendtTilNav).format('dddd D. MMM, kl HH:mm')
            setTilNavDato(datoNav.charAt(0).toUpperCase() + datoNav.slice(1))
        }

        const sendtTilArb = valgtSoknad?.sendtTilArbeidsgiverDato
        if (sendtTilArb) {
            const datoArb = dayjs(sendtTilArb).format('dddd D. MMM, kl HH:mm')
            setTilArbDato(datoArb.charAt(0).toUpperCase() + datoArb.slice(1))
            setTilArbNavn(valgtSoknad?.arbeidsgiver?.navn ? valgtSoknad?.arbeidsgiver?.navn : Mottaker.ARBEIDSGIVER)
            setTilOrg(valgtSoknad?.arbeidsgiver?.orgnummer ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})` : '')
        }
    }

    return (
        <div className="sendt-inner">
            <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato}
                render={() =>
                    <>
                        <Label as="h3" className="sendt-tittel">
                            {tekst('kvittering.sendt-til')}
                        </Label>
                        <Avkrysset tekst={`${tilArbNavn} ${tilOrg}${medKopi}`} />
                        <Detail size="small">{tilArbDato}</Detail>
                    </>
                }
            />
            <Vis hvis={valgtSoknad!.sendtTilNAVDato}
                render={() =>
                    <>
                        <Avkrysset tekst={Mottaker.NAV} />
                        <Detail size="small">{tilNavDato}</Detail>
                    </>
                }
            />
        </div>
    )
}

export default ArbeidstakerStatus
