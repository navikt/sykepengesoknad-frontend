import React from 'react'

import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import Arbeidstaker from './arbeidstaker'
import KvitteringVidere from './innhold/kvittering-videre'

const Kvittering = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    if (!valgtSoknad) return null

    const arbeidstakerKvittering =
        valgtSoknad.arbeidssituasjon === RSArbeidssituasjon.ARBEIDSTAKER &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD

    return (
        <div>
            {arbeidstakerKvittering ? <Arbeidstaker /> : <KvitteringVidere />}
            <Oppsummering />

            {valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND &&
                valgtSoknad.soknadstype !== RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING && (
                    <Opplysninger ekspandert={false} steg="kvittering" />
                )}
        </div>
    )
}

export default Kvittering
