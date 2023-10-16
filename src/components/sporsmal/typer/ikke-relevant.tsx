import { BodyLong, Button, Label } from '@navikt/ds-react'
import React from 'react'
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons'
import { useFormContext } from 'react-hook-form'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { TagTyper } from '../../../types/enums'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { Sporsmal } from '../../../types/types'
import { settSvar } from '../sett-svar'
import { useLeggTilUndersporsmal } from '../../../hooks/useLeggTilUndersporsmal'
import { useOppdaterSporsmal } from '../../../hooks/useOppdaterSporsmal'
import { useSlettUndersporsmal } from '../../../hooks/useSlettUndersporsmal'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

interface IkkeRelevantProps {
    sporsmal: Sporsmal
    sporsmalIndex: number
    erSisteSporsmal: boolean
}

const IkkeRelevant = ({ sporsmal, sporsmalIndex, erSisteSporsmal }: IkkeRelevantProps) => {
    const { valgtSoknad, spmIndex } = useSoknadMedDetaljer()

    const { getValues, trigger } = useFormContext()
    const { mutate: oppdaterSporsmal, isLoading: oppdatererSporsmal } = useOppdaterSporsmal()
    const { mutate: leggTilNyttUndersporsmal, isLoading: leggerTil } = useLeggTilUndersporsmal()
    const { mutate: slettundersporsmal, isLoading: sletter } = useSlettUndersporsmal()

    const skalHaUndersporsmal = [
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_GRUPPERING,
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_GRUPPERING,
        TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_GRUPPERING,
    ]

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
        if (sletter) {
            return
        }

        slettundersporsmal({
            soknadId: valgtSoknad!.id,
            sporsmalId: valgtSoknad!.sporsmal[spmIndex].id,
            undersporsmalId: sporsmal.id,
        })
    }

    if (skalHaUndersporsmal.includes(sporsmal.tag)) {
        return (
            <div
                className={!erSisteSporsmal ? 'mb-8 border-b border-dashed border-gray-400' : ''}
                aria-live="assertive"
            >
                <UndersporsmalListe oversporsmal={sporsmal} />

                {(sporsmalIndex > 0 || !erSisteSporsmal) && (
                    <Button
                        size="small"
                        icon={<TrashIcon />}
                        variant="danger"
                        className="my-4 flex"
                        type="button"
                        onClick={slett}
                        loading={sletter}
                    >
                        Slett
                    </Button>
                )}

                {erSisteSporsmal && (
                    <Button
                        icon={<PlusIcon />}
                        type="button"
                        size="small"
                        variant="tertiary"
                        className="my-8 flex"
                        onClick={leggTil}
                        loading={oppdatererSporsmal || leggerTil}
                    >
                        {sporsmal.tag === TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE
                            ? 'Legg til arbeid i utlandet'
                            : 'Legg til nytt opphold'}
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className="mt-4 rounded-md border border-gray-600 p-4">
            <Label as="h2" className="mb-4">
                {sporsmal.sporsmalstekst}
            </Label>
            {sporsmal.undertekst && <BodyLong as="div">{parserWithReplace(sporsmal.undertekst)}</BodyLong>}
        </div>
    )
}

export default IkkeRelevant
