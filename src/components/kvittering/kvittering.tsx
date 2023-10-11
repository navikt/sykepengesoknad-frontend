import React from 'react'

import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import Vis from '../vis'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import Arbeidstaker from './arbeidstaker'
import AlleAndre from './alle-andre'

const Kvittering = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    const arbeidstakerKvittering =
        valgtSoknad.arbeidssituasjon === RSArbeidssituasjon.ARBEIDSTAKER &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD

    return (
        <div data-cy="kvittering">
            {arbeidstakerKvittering ? <Arbeidstaker /> : <AlleAndre />}

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
