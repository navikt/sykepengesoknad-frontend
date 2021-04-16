import dayjs from 'dayjs'
import { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import VisBlock from '../../vis-block'

export enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const { valgtSoknad } = useAppStore()
    const [ tilNavDato, setTilNavDato ] = useState<string>()

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

    }


    return (
        <VisBlock hvis={valgtSoknad!.sendtTilNAVDato}
            render={() => {
                return (
                    <AlertStripeSuksess>
                        <VisBlock hvis={valgtSoknad!.sendtTilNAVDato}
                            render={() => {
                                return <>
                                    <Undertittel tag="h2">
                                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                                    </Undertittel>
                                    <Normaltekst>
                                        {tekst('kvittering.mottatt')}: {tilNavDato}
                                    </Normaltekst>
                                </>
                            }}
                        />
                    </AlertStripeSuksess>
                )
            }}
        />
    )
}

export default KvitteringStatus
