import './slettknapp.less'

import Alertstripe from 'nav-frontend-alertstriper'
import { Fareknapp, Knapp } from 'nav-frontend-knapper'
import ModalWrapper from 'nav-frontend-modal'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { Kvittering, Sporsmal, svarverdiToKvittering } from '../../types/types'
import env from '../../utils/environment'
import fetcher from '../../utils/fetcher'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import VisBlock from '../vis-block'
import SlettIkon from './slettknapp.svg'

interface SlettknappProps {
    sporsmal: Sporsmal;
    kvittering: Kvittering;
    update?: () => void;
}

const Slettknapp = ({ sporsmal, kvittering, update }: SlettknappProps) => {
    const { valgtSoknad, setValgtSoknad, feilmeldingTekst, setFeilmeldingTekst, setOpenModal } = useAppStore()
    const [ vilSlette, setVilSlette ] = useState<boolean>(false)
    const [ sletter, setSletter ] = useState<boolean>(false)

    const slettKvittering = async() => {
        try {
            if (sletter) return
            setSletter(true)

            const idx = sporsmal!.svarliste.svar.findIndex(svar => svarverdiToKvittering(svar?.verdi).blobId === kvittering?.blobId)
            const svar = sporsmal?.svarliste.svar.find(svar => svarverdiToKvittering(svar?.verdi).blobId === kvittering?.blobId)

            const res = await fetcher(`${env.flexGatewayRoot}/syfosoknad/api/soknader/${valgtSoknad?.id}/sporsmal/${sporsmal?.id}/svar/${svar?.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (res.ok) {
                sporsmal.svarliste.svar.splice(idx, 1)
                valgtSoknad!.sporsmal[valgtSoknad!.sporsmal.findIndex(spm => spm.id === sporsmal.id)] = sporsmal
                setValgtSoknad(valgtSoknad)
                setOpenModal(false)
            } else if (redirectTilLoginHvis401(res)) {
                return null
            } else {
                logger.warn('Feil under sletting av kvittering i syfosoknad')
                setFeilmeldingTekst('Det skjedde en feil i baksystemene, prøv igjen senere')
                return null
            }
        } catch (error) {
            logger.error('Feil under sletting av kvittering', error)
        } finally {
            setSletter(false)
            setVilSlette(false)
            if (update) update()
        }
    }

    return (
        <>
            <VisBlock hvis={update}
                render={() => {
                    return (
                        <button type="button" className="slette-kvittering" aria-label={tekst('opplasting_modal.slett')}
                            onClick={() => setVilSlette(true)} title={tekst('opplasting_modal.slett')}
                        >
                            <img src={SlettIkon} alt="" />
                        </button>
                    )
                }}
            />

            <VisBlock hvis={!update}
                render={() => {
                    return (
                        <Knapp type="fare" htmlType="button" className="lagre-kvittering" onClick={() => setVilSlette(true)}>
                            {tekst('opplasting_modal.slett')}
                        </Knapp>
                    )
                }}
            />

            <ModalWrapper className="modal__teaser_popup" onRequestClose={() => setVilSlette(false)}
                contentLabel={'slett'}
                isOpen={vilSlette}
                closeButton={false}
            >
                <div className="bekreft-dialog">
                    <Normaltekst className="blokk-s">
                        {tekst('opplasting_modal.vil-slette')}
                    </Normaltekst>
                    <div className="blokk-xs">
                        <Fareknapp spinner={sletter} htmlType="button" onClick={slettKvittering}>
                            {tekst('sykepengesoknad.avbryt.ja')}
                        </Fareknapp>
                    </div>
                    <div aria-live="polite" className="blokk-xs">
                        <VisBlock hvis={feilmeldingTekst}
                            render={() => <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>}
                        />
                    </div>
                    <button className="avbrytlenke lenkeknapp" type={'button'} onClick={() => setVilSlette(false)}>
                        {tekst('sykepengesoknad.avbryt.angre')}
                    </button>
                </div>
            </ModalWrapper>
        </>
    )
}

export default Slettknapp
