import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'

interface EttersendingProps {
    gjelder: 'nav' | 'arbeidsgiver'
    setRerendrekvittering: (d: Date) => void
}

const Ettersending = ({ gjelder, setRerendrekvittering }: EttersendingProps) => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, setFeilmeldingTekst } = useAppStore()
    const [vilEttersende, setVilEttersende] = useState<boolean>(false)
    const [ettersender, setEttersender] = useState<boolean>(false)
    const knappeTekst = tekst(`kvittering.knapp.send-${gjelder}` as any)

    const hentTekst = (text: string) => {
        const tilSuffix = gjelder === 'nav' ? '-nav' : '-arbeidsgiver'
        return tekst(`${text}${tilSuffix}` as any)
    }

    const oppdaterSoknad = () => {
        setValgtSoknad(valgtSoknad)
        soknader[soknader.findIndex((sok) => sok.id === valgtSoknad!.id)] = valgtSoknad as any
        setSoknader(soknader)
        setFeilmeldingTekst('')
        setRerendrekvittering(new Date())
    }

    const ettersend = async () => {
        if (ettersender) return
        setEttersender(true)
        try {
            if (gjelder === 'nav') {
                await ettersendNav()
            } else if (gjelder === 'arbeidsgiver') {
                await ettersendArbeidsgiver()
            }
        } finally {
            setVilEttersende(false)
            setEttersender(false)
        }
    }

    const ettersendNav = async () => {
        const res = await fetch(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/ettersendTilNav`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (redirectTilLoginHvis401(res)) {
            return
        } else if (res.ok) {
            valgtSoknad!.sendtTilNAVDato = new Date()
            oppdaterSoknad()
        } else {
            logger.error('Feil ved ettersending til NAV', res)
            setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
        }
    }

    const ettersendArbeidsgiver = async () => {
        const res = await fetch(
            `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                valgtSoknad!.id
            }/ettersendTilArbeidsgiver`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        if (redirectTilLoginHvis401(res)) {
            return
        } else if (res.ok) {
            valgtSoknad!.sendtTilArbeidsgiverDato = new Date()
            oppdaterSoknad()
        } else {
            logger.error('Feil ved ettersending til ARBEIDSGIVER', res)
            setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
        }
    }

    return (
        <>
            <Button
                variant="tertiary"
                onClick={() => {
                    setVilEttersende(true)
                }}
            >
                {knappeTekst}
            </Button>

            <Modal
                onClose={() => setVilEttersende(false)}
                className="ettersending"
                open={vilEttersende}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" id="modal-tittel" spacing>
                        {knappeTekst}
                    </Heading>
                    <BodyShort>{parser(hentTekst('kvittering.info.send-til'))}</BodyShort>
                    <Button size="small" variant="primary" loading={ettersender} onClick={ettersend}>
                        {hentTekst('kvittering.knapp.bekreft.send-til')}
                    </Button>
                    <Button variant="tertiary" className="lenkeknapp" onClick={() => setVilEttersende(false)}>
                        {tekst('kvittering.knapp.angre')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Ettersending
