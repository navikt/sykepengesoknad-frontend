import { Label, BodyLong, List } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import BekreftelsespunkterArbeidstakereTekster from '../bekreftelsespunkter/bekreftelsespunkter-arbeidstakere-tekster'
import Oppsummering from '../../oppsummering/oppsummering'
import Opplysninger from '../../opplysninger-fra-sykmelding/opplysninger'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import BekreftelsespunkterReisetilskuddTekster from '../bekreftelsespunkter/bekreftelsespunkter-reisetilskudd-tekster'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    const { valgtSoknad } = useSoknadMedDetaljer()

    const kulepunkterTekster =
        valgtSoknad!.soknadstype === RSSoknadstype.ARBEIDSTAKERE
            ? Object.values(BekreftelsespunkterArbeidstakereTekster)
            : Object.values(BekreftelsespunkterReisetilskuddTekster)

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
