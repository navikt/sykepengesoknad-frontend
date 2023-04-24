import React from 'react'
import { useParams } from 'react-router-dom'

import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import { RouteParams } from '../../app'

import Arbeidstaker from './arbeidstaker'
import AlleAndre from './alle-andre'

const Kvittering = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const KvitteringType = () => {
        if (
            valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ||
            valgtSoknad!.soknadstype === RSSoknadstype.REISETILSKUDD
        ) {
            return <AlleAndre />
        }
        switch (valgtSoknad!.arbeidssituasjon) {
            case RSArbeidssituasjon.ARBEIDSTAKER:
                return <Arbeidstaker />
            default:
                return <AlleAndre />
        }
    }

    if (!valgtSoknad) return null

    return (
        <div className="kvittering">
            <KvitteringType />

            <Oppsummering
                ekspandert={sendtForMerEnn30DagerSiden(
                    valgtSoknad.sendtTilArbeidsgiverDato,
                    valgtSoknad.sendtTilNAVDato,
                )}
                sporsmal={valgtSoknad.sporsmal}
            />

            <Vis
                hvis={valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <Opplysninger ekspandert={false} steg="kvittering" />}
            />
        </div>
    )
}

export default Kvittering
