import './kvittering.less'

import Alertstripe from 'nav-frontend-alertstriper'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import Opplysninger from '../opplysninger/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import Vis from '../vis'
import AlleAndre from './alle-andre'
import Arbeidstaker from './arbeidstaker'

const Kvittering = () => {
    const { valgtSoknad, setValgtSoknad, soknader, sykmeldinger, valgtSykmelding, setValgtSykmelding, feilmeldingTekst } = useAppStore()
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

    const skalViseKnapperad = !(valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND)

    const KvitteringType = () => {
        if (valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
            return <AlleAndre />
        }
        switch (valgtSykmelding!.valgtArbeidssituasjon) {
            case RSArbeidssituasjon.ARBEIDSTAKER:
                return <Arbeidstaker />
            default:
                return <AlleAndre />
        }
    }

    const soknadErMottatt = false

    return (
        <div className="kvittering">
            <KvitteringType />
            <Oppsummering ekspandert={soknadErMottatt} />

            <Vis hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                <Opplysninger ekspandert={false} />
            </Vis>

            <Vis hvis={skalViseKnapperad}>
                <div className="knapperad">
                    <Endreknapp />

                    <Ettersending gjelder="nav" />

                    <Vis hvis={valgtSoknad!.arbeidsgiver !== undefined}>
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
