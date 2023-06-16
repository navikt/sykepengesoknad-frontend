import { BodyShort, Link } from '@navikt/ds-react'
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

const TilbakeKnapp = ({ soknad, stegNo }: { soknad: Soknad; stegNo: number }) => {
    if (stegNo == 1) {
        return <div></div> //Tom div pga flex justify-between på parent
    }

    return (
        <NextLink legacyBehavior href={`/soknader/${soknad.id}${SEPARATOR}${stegNo - 1}${window.location.search}`}>
            <Link
                className="cursor-pointer"
                onClick={() => {
                    logEvent('navigere', {
                        lenketekst: tekst('soknad.tilbakeknapp'),
                        fra: soknad!.sporsmal[stegNo - 1].tag,
                        til: soknad!.sporsmal[stegNo - 2].tag,
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
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
    const { data: valgtSoknad } = useSoknad(id)
    if (!valgtSoknad || !stegId) return null

    const parsetSteg = parseInt(stegId)
    const oppholdUtland = valgtSoknad.soknadstype == RSSoknadstype.OPPHOLD_UTLAND
    const aktivtSteg = oppholdUtland ? parsetSteg : parsetSteg - 1
    const antallSporsmål = valgtSoknad.sporsmal.filter((s) => s.tag !== TagTyper.VAER_KLAR_OVER_AT).length
    const antallSteg = oppholdUtland ? antallSporsmål + 1 : antallSporsmål

    const bredde = (100 / antallSteg) * aktivtSteg

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
                <TilbakeKnapp soknad={valgtSoknad} stegNo={parsetSteg} />
                <BodyShort as="span">{valueText}</BodyShort>
            </div>
        </div>
    )
}

export default Fremdriftsbar
