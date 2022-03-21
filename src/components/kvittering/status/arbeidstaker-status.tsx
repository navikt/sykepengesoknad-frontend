import dayjs from 'dayjs'
import { Element, Undertekst } from 'nav-frontend-typografi'
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

    const medKopi = tekst('kvittering.med-kopi-til-nav')

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
                        <Element tag="h3" className="sendt-tittel">
                            {tekst('kvittering.sendt-til')}
                        </Element>
                        <Avkrysset tekst={`${tilArbNavn} ${tilOrg}, ${medKopi}`} />
                        <Undertekst>{tilArbDato}</Undertekst>
                    </>
                }
            />
            <Vis hvis={valgtSoknad!.sendtTilNAVDato}
                render={() =>
                    <>
                        <Avkrysset tekst={Mottaker.NAV} />
                        <Undertekst>{tilNavDato}</Undertekst>
                    </>
                }
            />
        </div>
    )
}

export default ArbeidstakerStatus
