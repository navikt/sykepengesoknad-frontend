import React from 'react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { Button, Skeleton } from '@navikt/ds-react'
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons'

import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { hentSporsmal } from '../../../utils/soknad-utils'
import { tekst } from '../../../utils/tekster'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { logEvent } from '../../amplitude/amplitude'
import { SEPARATOR } from '../../../utils/constants'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'

const Knapperad = ({ poster }: { poster: boolean }) => {
    const { valgtSoknad: soknad, sporsmal, stegNo, soknadId } = useSoknadMedDetaljer()
    const testperson = useTestpersonQuery()
    const router = useRouter()

    const { getValues } = useFormContext()
    const oppholdUtland = soknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
    const aktivtSteg = oppholdUtland ? stegNo : stegNo - 1

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

    function skalViseTilbakeKnapp() {
        return oppholdUtland ? aktivtSteg > 1 : aktivtSteg > 0
    }

    return (
        <div className="my-8 border-t border-gray-400" data-cy="knapperad">
            <div className="flex w-full justify-between">
                {skalViseTilbakeKnapp() && (
                    <Button
                        variant="secondary"
                        type="button"
                        className="mb-12 mt-6 inline-flex"
                        onClick={(e) => {
                            e.preventDefault()
                            if (!soknad) return
                            logEvent('navigere', {
                                lenketekst: tekst('soknad.tilbakeknapp'),
                                fra: soknad.sporsmal[stegNo - 1].tag,
                                til: soknad.sporsmal[stegNo - 2].tag,
                                soknadstype: soknad.soknadstype,
                                stegId: `${stegNo}`,
                            })
                            router.push(`/soknader/${soknadId}${SEPARATOR}${stegNo - 1}${testperson.query()}`)
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
                    iconPosition="right"
                    icon={knappetekst() !== tekst('sykepengesoknad.send') && <ArrowRightIcon aria-hidden />}
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
