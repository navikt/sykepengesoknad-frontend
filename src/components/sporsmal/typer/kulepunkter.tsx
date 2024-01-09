import { BodyLong, Label, List } from '@navikt/ds-react'
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
import BekreftelsespunkterGradertReisetilskuddTekster from '../bekreftelsespunkter/bekreftelsespunkter-gradert-reisetilskudd-tekster'
import { konverterLenkerTilRenTekst } from '../../../utils/utils'
import BekreftelsespunkterBehandlingsdagerTekster from '../bekreftelsespunkter/bekreftelsespunkter-behandlingsdager-tekster'
import BekreftelsespunkterArbeidsledigTekster from '../bekreftelsespunkter/bekreftelsespunkter-arbeidsledig-tekster'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    const { valgtSoknad } = useSoknadMedDetaljer()

    const kulepunkterTekster: string[] = (() => {
        switch (valgtSoknad!.soknadstype) {
            case RSSoknadstype.ARBEIDSTAKERE:
                return Object.values(BekreftelsespunkterArbeidstakereTekster)
            case RSSoknadstype.GRADERT_REISETILSKUDD:
                return Object.values(BekreftelsespunkterGradertReisetilskuddTekster)
            case RSSoknadstype.REISETILSKUDD:
                return Object.values(BekreftelsespunkterReisetilskuddTekster)
            case RSSoknadstype.BEHANDLINGSDAGER:
                return Object.values(BekreftelsespunkterBehandlingsdagerTekster)
            case RSSoknadstype.ARBEIDSLEDIG:
                return Object.values(BekreftelsespunkterArbeidsledigTekster)
            default:
                return []
        }
    })()

    useEffect(() => {
        const plainTextKulepunkter: string[] = kulepunkterTekster.map((tekst: string) =>
            konverterLenkerTilRenTekst(tekst),
        )
        setValue(sporsmal.id, plainTextKulepunkter)
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
