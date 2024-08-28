import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { Button, Link } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { logEvent } from '../../amplitude/amplitude'
import { tekst } from '../../../utils/tekster'
import { SEPARATOR } from '../../../utils/constants'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'

export const Tilbake = ({ variant }: { variant: 'liten' | 'stor' }) => {
    const { valgtSoknad, stegNo, soknadId } = useSoknadMedDetaljer()
    const testperson = useTestpersonQuery()
    const router = useRouter()

    const tilbakeLenke = `/soknader/${soknadId}${SEPARATOR}${stegNo - 1}${testperson.query()}`

    const klikkTilbake = (e: React.MouseEvent, lenketekst: string) => {
        e.preventDefault()
        if (!valgtSoknad) return
        logEvent('navigere', {
            lenketekst: lenketekst,
            fra: valgtSoknad.sporsmal[stegNo - 1].tag,
            til: valgtSoknad.sporsmal[stegNo - 2].tag,
            soknadstype: valgtSoknad.soknadstype,
            stegId: `${stegNo}`,
        })
        router.push(tilbakeLenke)
    }

    if (variant === 'stor') {
        return (
            <Button
                variant="secondary"
                type="button"
                className="mb-12 mt-6 inline-flex"
                onClick={(e) => klikkTilbake(e, tekst('soknad.tilbakeknapp'))}
                icon={<ArrowLeftIcon aria-hidden />}
            >
                Tilbake
            </Button>
        )
    }

    return (
        <Link href={tilbakeLenke} onClick={(e) => klikkTilbake(e, tekst('soknad.forrige_steg'))}>
            <ArrowLeftIcon aria-hidden />
            Forrige steg
        </Link>
    )
}
