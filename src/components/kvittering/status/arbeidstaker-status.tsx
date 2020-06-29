import dayjs from 'dayjs'
import { Element, Undertekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Avkrysset from '../../oppsummering/utdrag/avkrysset'
import Vis from '../../vis'
import { Mottaker } from './kvittering-status'


const ArbeidstakerStatus = () => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, ettersend, setFeilmeldingTekst } = useAppStore()
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

    const oppdaterSoknad = () => {
        setValgtSoknad(valgtSoknad)
        soknader[soknader.findIndex(sok => sok.id === valgtSoknad!.id)] = valgtSoknad as any
        setSoknader(soknader)
        setFeilmeldingTekst('')
        opprettDatoer()
    }

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

    return <div className="sendt-inner">
        <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato}>
            <Element tag="h2" className="sendt-tittel">
                {tekst('kvittering.sendt-til')}
            </Element>
            <Avkrysset tekst={tilArbNavn + ' ' + tilOrg} />
            <Undertekst>{tilArbDato}</Undertekst>
        </Vis>
        <Vis hvis={valgtSoknad!.sendtTilNAVDato}>
            <Avkrysset tekst={Mottaker.NAV} />
            <Undertekst>{tilNavDato}</Undertekst>
        </Vis>
    </div>
}

export default ArbeidstakerStatus
