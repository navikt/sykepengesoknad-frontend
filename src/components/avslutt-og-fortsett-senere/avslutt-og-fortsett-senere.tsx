import { watch } from 'node:fs'

import { BodyShort, Button, Modal, Skeleton } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { minSideUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { cn } from '../../utils/tw-utils'
import { hentSporsmal, hentUndersporsmal } from '../../utils/soknad-utils'
import { landlisteUtenforEøs, landlisteEøs } from '../sporsmal/landliste'

// bør bruke denne: src/components/sporsmal/landliste.ts
const euEosLand = landlisteEøs

const erLandIEuEos = (land: string) => {
    return euEosLand.includes(land.trim())
}

const AvsluttOgFortsettSenere = () => {
    const { valgtSoknad, stegId } = useSoknadMedDetaljer()

    const [aapen, setAapen] = useState<boolean>(false)

    const { control } = useFormContext()

    const landSporsmalId = hentSporsmal(valgtSoknad!, 'LAND')?.id || ''

    const hvilkenLandVerdi: string[] = useWatch({
        control,
        name: landSporsmalId,
    })

    const alleLandIEuEos = hvilkenLandVerdi?.every((land) => erLandIEuEos(land)) && hvilkenLandVerdi.length > 0

    // denne skal bli satt til 1 om vi vil ha en unik knapp for å avslutte og fortsette senere her
    if (valgtSoknad && valgtSoknad.soknadstype === 'OPPHOLD_UTLAND' && stegId == '4') {
        // For utenlandssøknader skal ikke denne knappen vises
        return <div>Lagre søknad og fortsett senere [var her]</div>
    }

    return (
        <>
            {String(alleLandIEuEos)}
            <br />
            {JSON.stringify(hvilkenLandVerdi)}
            <br />
            {JSON.stringify(valgtSoknad)}
            <br />
            {JSON.stringify(stegId)}
            <br />
            <Button
                className={cn('block', { '-ml-5': valgtSoknad })}
                variant="tertiary"
                type="button"
                as={valgtSoknad ? Button : Skeleton}
                data-cy="avslutt-og-fortsett-senere"
                onClick={(e) => {
                    logEvent('modal åpnet', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId!,
                    })
                    setAapen(true)
                    e.preventDefault()
                }}
            >
                {tekst('avslutt.popup.tittel')}
            </Button>

            <Modal
                open={aapen}
                header={{ heading: tekst('avslutt.popup.tittel'), closeButton: true }}
                onClose={() => {
                    setAapen(false)
                    logEvent('modal lukket', {
                        component: tekst('avslutt.popup.tittel'),
                        soknadstype: valgtSoknad?.soknadstype,
                        steg: stegId!,
                    })
                }}
            >
                <Modal.Body>
                    <BodyShort spacing>{tekst('avslutt.popup.innhold')}</BodyShort>
                    <BodyShort spacing>{tekst('avslutt.popup.sporsmal')}</BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        type="button"
                        className="mr-4 mt-4"
                        onClick={() => {
                            if (valgtSoknad) {
                                logEvent('knapp klikket', {
                                    tekst: tekst('avslutt.popup.ja'),
                                    soknadstype: valgtSoknad.soknadstype,
                                    component: tekst('avslutt.popup.tittel'),
                                    steg: stegId!,
                                })
                            }
                            window.location.href = minSideUrl()
                        }}
                    >
                        {tekst('avslutt.popup.ja')}
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        className="mt-4"
                        onClick={() => {
                            setAapen(false)
                            logEvent('knapp klikket', {
                                tekst: tekst('avslutt.popup.nei'),
                                soknadstype: valgtSoknad?.soknadstype,
                                component: tekst('avslutt.popup.tittel'),
                                steg: stegId!,
                            })
                        }}
                    >
                        {tekst('avslutt.popup.nei')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AvsluttOgFortsettSenere
