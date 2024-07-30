import { BodyLong, GuidePanel } from '@navikt/ds-react'
import React from 'react'

import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import Oppsummering from '../../oppsummering/oppsummering'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import SendesTil from '../sporsmal-form/sendes-til'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    return (
        <>
            <GuidePanel poster>
                Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene
                inntil 12 måneder etter innsending.
            </GuidePanel>
            {sporsmal.undertekst && <BodyLong as="div">{tekstMedHtml(sporsmal.undertekst)}</BodyLong>}
            <Oppsummering sporsmal={valgtSoknad!.sporsmal} />
            {valgtSoknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && (
                <>
                    <SendesTil soknad={valgtSoknad!} />
                </>
            )}
            <UndersporsmalListe oversporsmal={sporsmal} />
        </>
    )
}

export default Kulepunkter
