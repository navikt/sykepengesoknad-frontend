import { BodyLong, Label, Button } from '@navikt/ds-react'
import React from 'react'
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { TagTyper } from '../../../types/enums'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { Sporsmal } from '../../../types/types'
import { settSvar } from '../sett-svar'
import { useLeggTilUndersporsmal } from '../../../hooks/useLeggTilUndersporsmal'
import { useOppdaterSporsmal } from '../../../hooks/useOppdaterSporsmal'
import useSoknad from '../../../hooks/useSoknad'
import { useSlettUndersporsmal } from '../../../hooks/useSlettUndersporsmal'

interface IkkeRelevantProps {
    sporsmal: Sporsmal
    sporsmalIndex: number
    erSisteSporsmal: boolean
}
const IkkeRelevant = ({ sporsmal, sporsmalIndex, erSisteSporsmal }: IkkeRelevantProps) => {
    const router = useRouter()
    const { id, stegId } = router.query as { id: string; stegId: string }
    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 1

    const { getValues } = useFormContext()
    const { data: valgtSoknad } = useSoknad(id)
    const { mutate: oppdaterSporsmal } = useOppdaterSporsmal({
        soknad: valgtSoknad!,
        spmIndex: spmIndex,
    })
    const { mutate: leggTilNyttUndersporsmal } = useLeggTilUndersporsmal()
    const { mutate: slettundersporsmal } = useSlettUndersporsmal()

    const skalHaUndersporsmal = [
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_GRUPPERING,
        TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_GRUPPERING,
        TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_GRUPPERING,
    ]

    const leggTil = () => {
        const hovedSpm = settSvar(valgtSoknad!.sporsmal[spmIndex], getValues())
        oppdaterSporsmal({
            sporsmal: hovedSpm,
            onSuccess: () => {
                leggTilNyttUndersporsmal({
                    soknadId: valgtSoknad!.id,
                    sporsmalId: hovedSpm.id,
                })
            },
        })
    }

    const slett = () => {
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
                {sporsmalIndex === 0 && (
                    <Label as="h2" className="mt-8">
                        {sporsmal.tag === TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE
                            ? 'Hvor og når har du utført arbeid i utlandet?'
                            : 'Hvor og når har du oppholdt deg i utlandet?'}
                    </Label>
                )}

                <UndersporsmalListe oversporsmal={sporsmal} />

                {(sporsmalIndex > 0 || !erSisteSporsmal) && (
                    <Button
                        size="small"
                        icon={<TrashIcon />}
                        variant="danger"
                        className="my-4 flex"
                        type="button"
                        onClick={slett}
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
