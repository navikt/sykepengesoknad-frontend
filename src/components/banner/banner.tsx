import { Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { UseSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

export const Banner = () => {
    const { valgtSoknad } = UseSoknadMedDetaljer()

    const tittel = () => {
        if (valgtSoknad) {
            if (valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return tekst('sykepengesoknad-utland.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
                return tekst('reisetilskuddsoknad.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) {
                return tekst('gradert-reisetilskuddsoknad.tittel')
            }
        }
        return tekst('sykepengesoknad.sidetittel')
    }
    if (!valgtSoknad) return <Header overskrift={tittel()} underoverskrift="placeholder tekst" skeleton={true} />

    function underoverskrift() {
        if (valgtSoknad && valgtSoknad.fom && valgtSoknad.tom) {
            return tilLesbarPeriodeMedArstall(valgtSoknad.fom, valgtSoknad.tom)
        }
    }

    return <Header overskrift={tittel()} underoverskrift={underoverskrift()} />
}

export const Header = ({
    overskrift,
    underoverskrift,
    skeleton,
}: {
    overskrift: string
    underoverskrift?: string
    skeleton?: boolean
}) => {
    return (
        <header className="m-auto mt-4 flex items-center justify-between py-4">
            <Heading as={skeleton ? Skeleton : Heading} size="large" level="1" className="inline md:mr-2">
                {overskrift}
                {underoverskrift && (
                    <Heading as={skeleton ? Skeleton : 'span'} size="small" className="mt-2 block">
                        {underoverskrift}
                    </Heading>
                )}
            </Heading>
            <Person />
        </header>
    )
}
