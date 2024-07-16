import { FormProgress } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { tekst } from '../../../utils/tekster'
import { SEPARATOR } from '../../../utils/constants'
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'
import { basePath } from '../../../utils/environment'
import { Sporsmal } from '../../../types/types'

function erBesvart(spm: Sporsmal): boolean {
    if (spm.svarliste.svar.length > 0) {
        return true
    }
    return spm.undersporsmal.some((s) => erBesvart(s))
}
const Fremdriftsbar = () => {
    const { valgtSoknad, stegNo } = useSoknadMedDetaljer()

    const oppholdUtland = valgtSoknad?.soknadstype == RSSoknadstype.OPPHOLD_UTLAND
    const router = useRouter()
    const testperson = useTestpersonQuery()

    const aktivtSteg = oppholdUtland ? stegNo : stegNo - 1
    if (valgtSoknad && aktivtSteg == 0) return null

    if (aktivtSteg == 0) {
        // ingen progressbar på første side
        return null
    }

    const antallSporsmål =
        valgtSoknad?.sporsmal.filter((s) => s.tag !== 'VAER_KLAR_OVER_AT' && s.tag !== 'TIL_SLUTT').length || 9
    const antallSteg = oppholdUtland ? antallSporsmål + 1 : antallSporsmål

    function skapSteg() {
        let harUbesvart = false
        return (
            valgtSoknad?.sporsmal
                .filter((s) => !['VAER_KLAR_OVER_AT', 'ANSVARSERKLARING'].includes(s.tag))
                .map((s) => {
                    if (!erBesvart(s)) {
                        harUbesvart = true
                    }
                    // TODO neste steg kan naviger til oppsummering hvis alt før er besvart!

                    const nokkel = s.tag.toLowerCase()

                    const tittel = tekst(`sykepengesoknad.${nokkel}.tittel` as any)

                    return { tag: s.tag, tittel, besvart: !harUbesvart }
                }) || []
        )
    }

    return (
        <FormProgress totalSteps={antallSteg} activeStep={aktivtSteg}>
            {skapSteg().map((s, i) => {
                const url = `/soknader/${valgtSoknad?.id}${SEPARATOR}${i + 2}${testperson.query()}`
                return (
                    <FormProgress.Step
                        onClick={(e) => {
                            if (s.besvart) {
                                e.preventDefault()
                                router.push(url)
                            }
                        }}
                        href={basePath() + url}
                        key={i + ' ' + s.tag}
                        completed={s.besvart}
                        interactive={s.besvart}
                    >
                        {s.tittel}
                    </FormProgress.Step>
                )
            })}
        </FormProgress>
    )
}

export default Fremdriftsbar
