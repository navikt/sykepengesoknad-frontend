import { Button, Skeleton } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ArrowLeftIcon } from '@navikt/aksel-icons'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'
import { hentSporsmal } from '../../../utils/soknad-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../../amplitude/amplitude'
import { SEPARATOR } from '../../../utils/constants'
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'

const Knapperad = ({ poster }: { poster: boolean }) => {
    const { valgtSoknad: soknad, sporsmal, stegNo, soknadId } = useSoknadMedDetaljer()
    const testperson = useTestpersonQuery()
    const router = useRouter()

    const oppholdUtland = soknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const aktivtSteg = oppholdUtland ? stegNo : stegNo - 1

    const { getValues } = useFormContext()
    const skalSkjuleKnapperad = () => {
        if (!soknad || !sporsmal) return false
        if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sporsmal.tag === 'ARBEIDSGIVER') {
            const formValues = getValues()

            const arbiedsgiverId = hentSporsmal(soknad, 'ARBEIDSGIVER')!.id
            const ferieId = hentSporsmal(soknad, 'FERIE')!.id

            const harFerie = formValues[ferieId] === 'JA'
            const harArbeidsgiver = formValues[arbiedsgiverId] === 'JA'

            if (harArbeidsgiver && harFerie) {
                return true
            }
        }

        return false
    }
    if (skalSkjuleKnapperad()) return null

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
        return tekst('sykepengesoknad.ga-videre')
    }

    return (
        <div className="my-8 border-t border-gray-400" data-cy="knapperad">
            <div className="flex w-full justify-between">
                {aktivtSteg > 0 && (
                    <Button
                        variant="secondary"
                        className="mb-12 mt-6 inline-flex"
                        onClick={(e) => {
                            e.preventDefault()
                            if (!soknad) return // Check if soknad exists

                            logEvent('navigere', {
                                lenketekst: tekst('soknad.tilbakeknapp'),
                                fra: soknad.sporsmal[stegNo - 1].tag,
                                til: soknad.sporsmal[stegNo - 2].tag,
                                soknadstype: soknad?.soknadstype,
                                stegId: `${stegNo}`,
                            })

                            const url = `/soknader/${soknadId}${SEPARATOR}${stegNo - 1}${testperson.query()}`

                            router.push(url)
                        }}
                        icon={<ArrowLeftIcon aria-hidden />}
                    >
                        Tilbake
                    </Button>
                )}
                <Button
                    as={soknad ? 'button' : Skeleton}
                    variant="primary"
                    type="submit"
                    loading={poster}
                    className="mb-12 mt-6 inline-flex"
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
