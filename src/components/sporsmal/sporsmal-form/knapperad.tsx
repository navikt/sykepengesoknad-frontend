import { Button, Skeleton } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tekst } from '../../../utils/tekster'
import AvbrytSoknadModal from '../../avbryt-soknad-modal/avbryt-soknad-modal'
import AvsluttOgFortsettSenere from '../../avslutt-og-fortsett-senere/avslutt-og-fortsett-senere'
import Vis from '../../vis'
import { TagTyper } from '../../../types/enums'
import { hentSporsmal } from '../../../utils/soknad-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { SlikBehandlerNavPersonopplysningene } from '../../soknad-intro/slik-behandler-nav-personopplysningene'

const Knapperad = ({ poster }: { poster: boolean }) => {
    const { erUtenlandssoknad, valgtSoknad: soknad, stegNo, sporsmal, spmIndex } = useSoknadMedDetaljer()

    const { getValues } = useFormContext()
    const skalSkjuleKnapperad = () => {
        if (!soknad || !sporsmal) return false
        if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sporsmal.tag === TagTyper.ARBEIDSGIVER) {
            const formValues = getValues()

            const arbiedsgiverId = hentSporsmal(soknad, TagTyper.ARBEIDSGIVER)!.id
            const ferieId = hentSporsmal(soknad, TagTyper.FERIE)!.id

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
        const REDUSER_FOR_OPPHOLD_UTLAND_OG_ARBEIDSTAKER =
            soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND ||
            soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE ||
            soknad.soknadstype === RSSoknadstype.REISETILSKUDD
                ? 1
                : 2
        const erSisteSteg = spmIndex === soknad.sporsmal.length - REDUSER_FOR_OPPHOLD_UTLAND_OG_ARBEIDSTAKER

        if (erSisteSteg) {
            if (soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING) {
                return tekst('sykepengesoknad.send.endringene')
            }
            return tekst('sykepengesoknad.send')
        }
        return tekst('sykepengesoknad.ga-videre')
    }

    return (
        <div className="my-8" data-cy="knapperad">
            <Button
                as={soknad ? 'button' : Skeleton}
                variant="primary"
                type="submit"
                loading={poster}
                className="mb-12 mt-6 inline-flex"
            >
                {knappetekst()}
            </Button>

            <AvsluttOgFortsettSenere />
            <AvbrytSoknadModal />
            <Vis
                hvis={stegNo === 1 && !erUtenlandssoknad}
                render={() => (
                    <>
                        <hr className="my-4" />
                        <SlikBehandlerNavPersonopplysningene />
                    </>
                )}
            />
        </div>
    )
}

export default Knapperad
