import './kvittering.less'

import Alertstripe from 'nav-frontend-alertstriper'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import Vis from '../vis'
import AlleAndre from './alle-andre'
import Arbeidstaker from './arbeidstaker'

const Kvittering = () => {
    const { valgtSoknad, setValgtSoknad, setValgtSykmelding, soknader, sykmeldinger, feilmeldingTekst } = useAppStore()
    const { id } = useParams()

    useEffect(() => {
        if (!valgtSoknad) {
            const filtrertSoknad = soknader.find(soknad => soknad.id === id)
            setValgtSoknad(filtrertSoknad)
            const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
            setValgtSykmelding(sykmelding)
        }
        // eslint-disable-next-line
    }, [])

    const erSendtTilNav = valgtSoknad?.sendtTilNAVDato !== null
    const erSendtTilArbeidsgiver = valgtSoknad?.sendtTilArbeidsgiverDato !== null

    const skalViseKnapperad = !(valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND)

    const KvitteringType = () => {
        if (valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
            return <AlleAndre />
        }
        switch (valgtSoknad!.arbeidssituasjon) {
            case RSArbeidssituasjon.ARBEIDSTAKER:
                return <Arbeidstaker />
            default:
                return <AlleAndre />
        }
    }

    return (
        <div
            className="kvittering">
            <KvitteringType />
            <Oppsummering
                ekspandert={sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)} />

            <Vis hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                <Opplysninger ekspandert={false} />
            </Vis>

            <Vis hvis={skalViseKnapperad}>
                <div className="knapperad">
                    <Vis hvis={valgtSoknad!.status !== RSSoknadstatus.KORRIGERT}>
                        <Endreknapp />
                    </Vis>

                    <Vis hvis={!erSendtTilNav}>
                        <Ettersending gjelder="nav" />
                    </Vis>

                    <Vis hvis={valgtSoknad!.arbeidsgiver !== undefined && !erSendtTilArbeidsgiver}>
                        <Ettersending gjelder="arbeidsgiver" />
                    </Vis>
                </div>
            </Vis>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst !== ''}>
                    <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                </Vis>
            </div>
        </div>
    )
}

export default Kvittering
