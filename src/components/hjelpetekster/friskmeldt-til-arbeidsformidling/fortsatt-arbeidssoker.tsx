import { Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../../types/types'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { flattenSporsmal } from '../../../utils/soknad-utils'

export function FortsattArbeidssoker({ sporsmal, fieldValue }: { sporsmal: Sporsmal; fieldValue: any }) {
    const { watch, getValues } = useFormContext()
    watch() // Nå abonnerer vi på alle skjemaverdiene

    const { valgtSoknad, soknader } = useSoknadMedDetaljer()
    if (
        (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_NY_JOBB' ||
            sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER') &&
        fieldValue === 'JA'
    ) {
        const nesteSoknadPeriode = () => {
            if (!valgtSoknad) {
                return null
            }
            const senereSoknaderMedSammeId = soknader
                ?.filter(
                    (s) => s.friskTilArbeidVedtakId === valgtSoknad.friskTilArbeidVedtakId && s.id !== valgtSoknad.id,
                )
                ?.filter((s) => valgtSoknad.fom! < s.fom!)
                ?.sort((a, b) => (a.fom! < b.fom! ? 1 : -1))

            if (senereSoknaderMedSammeId && senereSoknaderMedSammeId.length > 0) {
                return tilLesbarPeriodeMedArstall(senereSoknaderMedSammeId[0].fom!, senereSoknaderMedSammeId[0].tom!)
            }
            return null
        }

        const nesteSoknadPeriodeTekst = nesteSoknadPeriode()
        if (!nesteSoknadPeriodeTekst) {
            return null
        }
        return (
            <Alert variant="info" className="mt-4">
                {`Du har svart at du fortsatt vil være registrert som arbeidssøker hos Nav lenger. Da vil du være friskmeldt til arbeidsformidling i neste periode, altså ${nesteSoknadPeriodeTekst}.`}
            </Alert>
        )
    }
    if (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_NY_JOBB' && fieldValue === 'NEI') {
        const dato = () => {
            const tagForDato = flattenSporsmal(valgtSoknad?.sporsmal || []).find(
                (s) => s.tag === 'FTA_JOBBSITUASJONEN_DIN_NAR',
            )
            if (!tagForDato) {
                return null
            }
            const funnetVerdi = getValues()[tagForDato.id] as null | string
            if (funnetVerdi) {
                return tilLesbarDatoMedArstall(funnetVerdi)
            }
            return null
        }

        return <IkkeLengreArbeidssøker variant="warning" dato={dato()} />
    }
    if (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER' && fieldValue === 'NEI') {
        const dato = () => {
            const tagForDato = sporsmal.undersporsmal.find(
                (s) => s.tag === 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_AVREGISTRERT_NAR',
            )
            if (!tagForDato) {
                return null
            }
            const funnetVerdi = getValues()[tagForDato.id] as null | string
            if (funnetVerdi) {
                return tilLesbarDatoMedArstall(funnetVerdi)
            }
            return null
        }

        return <IkkeLengreArbeidssøker variant="warning" dato={dato()} />
    }
    return null
}

function IkkeLengreArbeidssøker({ variant, dato }: { variant: 'warning' | 'info'; dato: string | null }) {
    if (!dato) {
        return null
    }
    return (
        <Alert variant={variant} className="mt-4">
            <BodyLong spacing>
                Du har svart at du har begynt i ny jobb og dermed ikke vil være registrert som arbeidssøker hos Nav
                lenger.
            </BodyLong>
            <BodyLong>
                {`Det betyr at du ikke vil være friskmeldt til arbeidsformidling fra og med ${dato}. Da stanser vi sykepengene dine fra og med denne datoen, og fjerner deg fra arbeidssøkerregisteret vårt.`}
            </BodyLong>
        </Alert>
    )
}
