import { BodyShort, Link, Skeleton } from '@navikt/ds-react'
import React from 'react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { TagTyper } from '../../../types/enums'
import useSoknad from '../../../hooks/useSoknad'
import { SEPARATOR } from '../../../utils/constants'
import { logEvent } from '../../amplitude/amplitude'
import { tekst } from '../../../utils/tekster'
import { Soknad } from '../../../types/types'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { UseSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { UseTestpersonQuery } from '../../../hooks/useTestpersonQuery'

const TilbakeKnapp = () => {
    const { valgtSoknad: soknad, stegNo, soknadId } = UseSoknadMedDetaljer()
    const testperson = UseTestpersonQuery()
    if (stegNo == 1 || !soknad) {
        return <div></div> //Tom div pga flex justify-between på parent
    }

    return (
        <NextLink legacyBehavior passHref href={`/soknader/${soknadId}${SEPARATOR}${stegNo - 1}${testperson.query()}`}>
            <Link
                className="cursor-pointer"
                onClick={() => {
                    if (!soknad) return
                    logEvent('navigere', {
                        lenketekst: tekst('soknad.tilbakeknapp'),
                        fra: soknad.sporsmal[stegNo - 1].tag,
                        til: soknad.sporsmal[stegNo - 2].tag,
                        soknadstype: soknad?.soknadstype,
                        stegId: `${stegNo}`,
                    })
                }}
            >
                <ArrowLeftIcon />
                <BodyShort as="span">{tekst('soknad.tilbakeknapp')}</BodyShort>
            </Link>
        </NextLink>
    )
}

const Fremdriftsbar = () => {
    const { valgtSoknad, stegNo } = UseSoknadMedDetaljer()

    const oppholdUtland = valgtSoknad?.soknadstype == RSSoknadstype.OPPHOLD_UTLAND

    const aktivtSteg = oppholdUtland ? stegNo : stegNo - 1
    if (valgtSoknad && aktivtSteg == 0) return null

    if (aktivtSteg == 0) {
        // ingen progressbar på første side
        return null
    }

    const antallSporsmål = valgtSoknad?.sporsmal.filter((s) => s.tag !== TagTyper.VAER_KLAR_OVER_AT).length || 9
    const antallSteg = oppholdUtland ? antallSporsmål + 1 : antallSporsmål

    const bredde = valgtSoknad ? (100 / antallSteg) * aktivtSteg : 0

    const valueText = `${aktivtSteg} av ${antallSteg} steg`

    return (
        <div
            className="my-4 md:my-6"
            role="progressbar"
            aria-valuenow={aktivtSteg}
            aria-valuemin={1}
            aria-valuemax={antallSteg}
            aria-valuetext={valueText}
            aria-label="Søknadssteg"
        >
            <div className="relative mx-auto mt-4">
                <div className="h-3 rounded-lg bg-gray-200" />
                <div
                    className="-mt-3 h-3 rounded-lg bg-gray-900"
                    style={{
                        width: `${bredde}%`,
                    }}
                />
            </div>
            <div className="mt-4 flex justify-between">
                <TilbakeKnapp />
                <BodyShort as={valgtSoknad ? 'span' : Skeleton}>{valueText}</BodyShort>
            </div>
        </div>
    )
}

export default Fremdriftsbar
