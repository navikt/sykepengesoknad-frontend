import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import Vis from '../vis'
import AlleAndre from './alle-andre'
import Arbeidstaker from './arbeidstaker'

const Kvittering = () => {
    const { valgtSoknad } = useAppStore()

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

    return (
        <div className="kvittering">
            <KvitteringType />

            <Oppsummering
                ekspandert={sendtForMerEnn30DagerSiden(
                    valgtSoknad?.sendtTilArbeidsgiverDato,
                    valgtSoknad?.sendtTilNAVDato
                )}
            />

            <Vis
                hvis={valgtSoknad!.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                render={() => <Opplysninger ekspandert={false} steg="kvittering" />}
            />
        </div>
    )
}

export default Kvittering
