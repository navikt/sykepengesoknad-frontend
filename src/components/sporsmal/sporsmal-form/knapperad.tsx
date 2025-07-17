import React, { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button, Skeleton } from '@navikt/ds-react'
import { ArrowRightIcon } from '@navikt/aksel-icons'

import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { hentSporsmal } from '../../../utils/soknad-utils'
import { tekst } from '../../../utils/tekster'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'
import { Tilbake } from '../tilbake-knapp/tilbake'
import { Soknad } from '../../../types/types'
import { landlisteUtenforEøs, landlisteEøs } from '../../sporsmal/landliste'

// bør bruke denne: src/components/sporsmal/landliste.ts
const euEosLand = landlisteEøs

const erLandIEuEos = (land: string) => {
    return euEosLand.includes(land.trim())
}

const soknadOmÅBeholdeSykepengerUtenforEUEøsSpecialCase = () => {
    return (
        <div className="my-8 border-t border-gray-400" data-cy="knapperad">
            <div className="mt-4">
                <AvbrytSoknadModal euEøsSpecialCase={true} />
            </div>
        </div>
    )
}

const Knapperad = ({ poster, setVisFlexjar }: { poster: boolean; setVisFlexjar: (value: boolean) => void }) => {
    const { valgtSoknad: soknad, sporsmal, stegNo } = useSoknadMedDetaljer()

    const { getValues } = useFormContext()
    const oppholdUtland = soknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const aktivtSteg = oppholdUtland ? stegNo : stegNo - 1

    const { valgtSoknad } = useSoknadMedDetaljer()

    const { control } = useFormContext()

    const landSporsmalId = hentSporsmal(valgtSoknad!, 'LAND')?.id || ''

    const hvilkenLandVerdi: string[] = useWatch({
        control,
        name: landSporsmalId,
    })

    const alleLandIEuEos = hvilkenLandVerdi?.every((land) => erLandIEuEos(land)) && hvilkenLandVerdi.length > 0

    // du kunne skjult knapeprat her
    const skalSkjuleKnapperad = () => {
        if (!soknad || !sporsmal) return false
        if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sporsmal.tag === 'ARBEIDSGIVER') {
            const formValues = getValues()
            const arbeidsgiverId = hentSporsmal(soknad, 'ARBEIDSGIVER')!.id
            const ferieId = hentSporsmal(soknad, 'FERIE')!.id
            return formValues[ferieId] === 'JA' && formValues[arbeidsgiverId] === 'JA'
        }
        return false
    }

    if (skalSkjuleKnapperad()) return null

    if (soknad && soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && stegNo === 1 && alleLandIEuEos) {
        return soknadOmÅBeholdeSykepengerUtenforEUEøsSpecialCase()
    }

    const knappetekst = () => {
        if (!soknad) return tekst('sykepengesoknad.ga-videre')

        const erTagBekreftelse = (tag: string) =>
            tag.includes('BEKREFT_OPPLYSNINGER') || ['TIL_SLUTT', 'VAER_KLAR_OVER_AT'].includes(tag)

        const erSisteSteg = sporsmal && erTagBekreftelse(sporsmal.tag)
        if (erSisteSteg) {
            if (soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
                return tekst('sykepengesoknad.send.endringene')
            }
            return tekst('sykepengesoknad.send')
        }
        const erForsteSteg = sporsmal && sporsmal.tag === 'ANSVARSERKLARING'
        if (erForsteSteg) {
            return tekst('sykepengesoknad.start')
        }
        return tekst('sykepengesoknad.ga-videre')
    }

    function skalViseTilbakeKnapp() {
        return oppholdUtland ? aktivtSteg > 1 : aktivtSteg > 0
    }

    return (
        <div className="my-8 border-t border-gray-400" data-cy="knapperad">
            <div className="flex w-full justify-between">
                {skalViseTilbakeKnapp() && <Tilbake variant="stor" />}
                <Button
                    as={soknad ? 'button' : Skeleton}
                    variant="primary"
                    type="submit"
                    loading={poster}
                    className="mb-12 mt-6 inline-flex"
                    iconPosition="right"
                    icon={knappetekst() !== tekst('sykepengesoknad.send') && <ArrowRightIcon aria-hidden />}
                    onClick={() => {
                        if (soknad) {
                            const formValues = getValues()
                            const varigEndring = hentSporsmal(soknad, 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET')?.id
                            if (varigEndring && formValues[varigEndring]) {
                                setVisFlexjar(true)
                            }
                        }
                    }}
                >
                    {knappetekst()}
                </Button>
            </div>
            <AvsluttOgFortsettSenere />
            <AvbrytSoknadModal />
        </div>
    )
}

export default Knapperad
