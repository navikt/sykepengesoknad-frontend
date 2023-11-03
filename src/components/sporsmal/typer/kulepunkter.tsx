import { Label, BodyLong, List } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import BekreftelsespunkterArbeidstakereTekster from '../bekreftelsespunkter/bekreftelsespunkter-arbeidstakere-tekster'
import Oppsummering from '../../oppsummering/oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import useSoknad from '../../../hooks/useSoknad'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import BekreftelsespunkterReisetilskuddTekster from '../bekreftelsespunkter/bekreftelsespunkter-reisetilskudd-tekster'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    const kulepunkterTekster =
        valgtSoknad!.soknadstype === RSSoknadstype.ARBEIDSTAKERE
            ? Object.values(BekreftelsespunkterArbeidstakereTekster)
            : Object.values(BekreftelsespunkterReisetilskuddTekster)

    console.log('sporsmal', sporsmal) // eslint-disable-line

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
