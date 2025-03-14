import React from 'react'
import { useFormContext } from 'react-hook-form'
import { BodyShort, Button } from '@navikt/ds-react'
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons'

import { Sporsmal } from '../../../types/types'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { useOppdaterSporsmal } from '../../../hooks/useOppdaterSporsmal'
import { useLeggTilUndersporsmal } from '../../../hooks/useLeggTilUndersporsmal'
import { useSlettUndersporsmal } from '../../../hooks/useSlettUndersporsmal'
import { settSvar } from '../sett-svar'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { useGruppeAvUndersporsmalTastaturNavigasjon } from '../../../utils/tastatur-navigasjon'

interface GruppeAvUndersporsmalProps {
    sporsmal: Sporsmal
    sporsmalIndex: number
    erSisteSporsmal: boolean
}

const GruppeAvUndersporsmal = ({ sporsmal, sporsmalIndex, erSisteSporsmal }: GruppeAvUndersporsmalProps) => {
    const { valgtSoknad, spmIndex } = useSoknadMedDetaljer()
    const { getValues, trigger } = useFormContext()

    const { mutate: oppdaterSporsmal, isPending: oppdatererSporsmal } = useOppdaterSporsmal()
    const { mutate: leggTilNyttUndersporsmal, isPending: leggerTil } = useLeggTilUndersporsmal()
    const { mutate: slettundersporsmal, isPending: sletter } = useSlettUndersporsmal()

    const erMedlemskap = sporsmal.tag.includes('MEDLEMSKAP')
    const kanSlette = erMedlemskap && (sporsmalIndex > 0 || !erSisteSporsmal)
    const kanLeggeTil = erMedlemskap && erSisteSporsmal
    useGruppeAvUndersporsmalTastaturNavigasjon(sporsmal)
    const leggTil = async () => {
        if (oppdatererSporsmal || leggerTil) {
            return
        }

        const formValidert = await trigger()
        if (!formValidert) {
            return
        }

        const hovedSpm = settSvar(valgtSoknad!.sporsmal[spmIndex], getValues())

        oppdaterSporsmal({
            sporsmal: hovedSpm,
            soknad: valgtSoknad!,
            spmIndex: spmIndex,
            onSuccess: () => {
                leggTilNyttUndersporsmal({
                    soknadId: valgtSoknad!.id,
                    sporsmalId: hovedSpm.id,
                })
            },
        })
    }

    const slett = () => {
        if (!sletter) {
            slettundersporsmal({
                soknadId: valgtSoknad!.id,
                sporsmalId: valgtSoknad!.sporsmal[spmIndex].id,
                undersporsmalId: sporsmal.id,
            })
        }
    }

    return (
        <div className={!erSisteSporsmal && erMedlemskap ? 'mb-8 border-b border-dashed border-gray-400' : ''}>
            {sporsmal.sporsmalstekst && <BodyShort>{sporsmal.sporsmalstekst}</BodyShort>}
            <EkspanderbarHjelp sporsmal={sporsmal} />
            <UndersporsmalListe oversporsmal={sporsmal} />

            {kanSlette && (
                <Button
                    size="small"
                    icon={<TrashIcon aria-hidden={true} />}
                    variant="danger"
                    className="my-4 flex"
                    type="button"
                    onClick={slett}
                    loading={sletter}
                >
                    Slett
                </Button>
            )}

            {kanLeggeTil && (
                <Button
                    icon={<PlusIcon aria-hidden={true} />}
                    type="button"
                    size="small"
                    variant="tertiary"
                    className="my-8 flex"
                    onClick={leggTil}
                    loading={oppdatererSporsmal || leggerTil}
                >
                    {sporsmal.tag === 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE'
                        ? 'Legg til arbeid i utlandet'
                        : 'Legg til nytt opphold'}
                </Button>
            )}
        </div>
    )
}

export default GruppeAvUndersporsmal
