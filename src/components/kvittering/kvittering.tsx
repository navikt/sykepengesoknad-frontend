import './kvittering.less'

import Alertstripe from 'nav-frontend-alertstriper'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import VisBlock from '../vis-block'
import AlleAndre from './alle-andre'
import Arbeidstaker from './arbeidstaker'

const Kvittering = () => {
    const { valgtSoknad, setValgtSoknad, setValgtSykmelding, soknader, sykmeldinger, feilmeldingTekst } = useAppStore()
    const { id } = useParams<RouteParams>()
    const [ rerendreKvittering, setRerendrekvittering ] = useState<Date>(new Date())


    useEffect(() => {
        if (!valgtSoknad) {
            const filtrertSoknad = soknader.find(soknad => soknad.id === id)
            setValgtSoknad(filtrertSoknad)
            const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
            setValgtSykmelding(sykmelding)
        }
        // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {

    }, [ rerendreKvittering ])


    const erSendtTilNav = valgtSoknad?.sendtTilNAVDato !== null
    const erSendtTilArbeidsgiver = valgtSoknad?.sendtTilArbeidsgiverDato !== null

    const skalViseKnapperad = !(valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND)

    const KvitteringType = () => {
        if (valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND || valgtSoknad!.soknadstype === RSSoknadstype.REISETILSKUDD) {
            return <AlleAndre />
        }
        switch (valgtSoknad!.arbeidssituasjon) {
            case RSArbeidssituasjon.ARBEIDSTAKER:
                return <Arbeidstaker />
            default:
                return <AlleAndre />
        }
    }

    const skalViseSendTilArbeidsgiver = valgtSoknad!.arbeidsgiver !== undefined && !erSendtTilArbeidsgiver && valgtSoknad?.soknadstype !== RSSoknadstype.REISETILSKUDD
    return (
        <div
            className="kvittering">
            <KvitteringType />
            <Oppsummering
                ekspandert={sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)} />

            <VisBlock hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <Opplysninger ekspandert={false} />}
            />

            <VisBlock hvis={skalViseKnapperad}
                render={() => {
                    return (
                        <div className="knapperad">
                            <VisBlock hvis={valgtSoknad!.status !== RSSoknadstatus.KORRIGERT}
                                render={() => <Endreknapp />}
                            />

                            <VisBlock hvis={!erSendtTilNav}
                                render={() => <Ettersending gjelder="nav" setRerendrekvittering={setRerendrekvittering} />}
                            />

                            <VisBlock hvis={skalViseSendTilArbeidsgiver}
                                render={() => {
                                    return <Ettersending gjelder="arbeidsgiver" setRerendrekvittering={setRerendrekvittering} />
                                }}
                            />
                        </div>
                    )
                }
                }
            />

            <div aria-live="polite">
                <VisBlock hvis={feilmeldingTekst !== ''}
                    render={() => <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>}
                />
            </div>
        </div>
    )
}

export default Kvittering
