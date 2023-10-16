import { Label, BodyLong, List } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import VaerKlarOverAtTekster from '../vaer-klar-over-at-tekster'
import Oppsummering from '../../oppsummering/oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import useSoknad from '../../../hooks/useSoknad'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    const kulepunkterTekster = Object.values(VaerKlarOverAtTekster)
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    useEffect(() => {
        setValue(sporsmal.id, kulepunkterTekster)
    }, [kulepunkterTekster, setValue, sporsmal.id])

    return (
        <>
            <div className="mt-4 rounded-md border border-gray-600 p-4">
                <Label as="h2" className="mb-4">
                    {sporsmal.sporsmalstekst}
                </Label>
                <List as="ul">
                    {kulepunkterTekster.map((tekst, index) => (
                        <List.Item key={tekst + index}>{parserWithReplace(tekst)}</List.Item>
                    ))}
                </List>
            </div>
            {sporsmal.undertekst && <BodyLong as="div">{parserWithReplace(sporsmal.undertekst)}</BodyLong>}
            <Oppsummering ekspandert={false} sporsmal={valgtSoknad!.sporsmal} />
            <Opplysninger ekspandert={false} />
            <UndersporsmalListe oversporsmal={sporsmal} />
        </>
    )
}

export default Kulepunkter
