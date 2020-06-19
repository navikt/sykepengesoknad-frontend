import dayjs from 'dayjs'
import { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

enum Mottaker {
    NAV = 'NAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
}

const KvitteringStatus = () => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, setFeilmeldingTekst, ettersend } = useAppStore()
    const [ tilArbNavn, setTilArbNavn ] = useState<string>()
    const [ tilOrg, setTilOrg ] = useState<string>()
    const [ tilNavDato, setTilNavDato ] = useState<string>()
    const [ tilArbDato, setTilArbDato ] = useState<string>()

    useEffect(() => {
        opprettDatoer()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (ettersend?.type === 'nav') {
            ettersendNav()
        }
        else if(ettersend?.type === 'arbeidsgiver'){
            ettersendArbeidsgiver()
        }
        // eslint-disable-next-line
    }, [ ettersend ])

    const opprettDatoer = () => {
        const sendtTilNav = valgtSoknad?.sendtTilNAVDato
        if (sendtTilNav) {
            const datoNav = dayjs(sendtTilNav).format('dddd D. MMM, kl hh:mm')
            setTilNavDato(datoNav.charAt(0).toUpperCase() + datoNav.slice(1))
        }

        const sendtTilArb = valgtSoknad?.sendtTilArbeidsgiverDato
        if (sendtTilArb) {
            const datoArb = dayjs(sendtTilArb).format('dddd D. MMM, kl hh:mm')
            setTilArbDato(datoArb.charAt(0).toUpperCase() + datoArb.slice(1))
            setTilArbNavn(valgtSoknad?.arbeidsgiver?.navn ? valgtSoknad?.arbeidsgiver?.navn : Mottaker.ARBEIDSGIVER)
            setTilOrg(valgtSoknad?.arbeidsgiver?.orgnummer ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})` : '')
        }
    }

    const oppdaterSoknad = () => {
        setValgtSoknad(valgtSoknad)
        soknader[soknader.findIndex(sok => sok.id === valgtSoknad!.id)] = valgtSoknad as any
        setSoknader(soknader)
        setFeilmeldingTekst('')
        opprettDatoer()
    }

    const ettersendNav = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilNav`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            if (res.ok) {
                valgtSoknad!.sendtTilNAVDato = ettersend?.dato
                oppdaterSoknad()
            } else {
                logger.error('Feil ved ettersending til NAV', res)
                setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
            }
        })
    }

    const ettersendArbeidsgiver = () => {
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilArbeidsgiver`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            if (res.ok) {
                valgtSoknad!.sendtTilArbeidsgiverDato = ettersend?.dato
                oppdaterSoknad()
            } else {
                logger.error('Feil ved ettersending til ARBEIDSGIVER', res)
                setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
            }
        })
    }

    return (
        <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato || valgtSoknad!.sendtTilNAVDato}>
            <AlertStripeSuksess>
                <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato}>
                    <Undertittel tag="h2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {tilArbNavn}
                        <br /> {tilOrg}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('kvittering.mottatt')}: {tilArbDato}
                    </Normaltekst>
                </Vis>
                <Vis hvis={valgtSoknad!.sendtTilNAVDato}>
                    <Undertittel tag="h2">
                        {tekst('kvittering.soknaden-er-sendt-til')} {Mottaker.NAV}
                    </Undertittel>
                    <Normaltekst>
                        {tekst('kvittering.mottatt')}: {tilNavDato}
                    </Normaltekst>
                </Vis>
            </AlertStripeSuksess>
        </Vis>
    )
}

export default KvitteringStatus
