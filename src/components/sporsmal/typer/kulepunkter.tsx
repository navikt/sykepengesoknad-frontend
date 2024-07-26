import { BodyLong, Label, List } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import BekreftelsespunkterArbeidstakereTekster from '../bekreftelsespunkter/bekreftelsespunkter-arbeidstakere-tekster'
import Oppsummering from '../../oppsummering/oppsummering'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import BekreftelsespunkterReisetilskuddTekster from '../bekreftelsespunkter/bekreftelsespunkter-reisetilskudd-tekster'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import BekreftelsespunkterGradertReisetilskuddTekster from '../bekreftelsespunkter/bekreftelsespunkter-gradert-reisetilskudd-tekster'
import { konverterLenkerTilRenTekst } from '../../../utils/utils'
import BekreftelsespunkterBehandlingsdagerTekster from '../bekreftelsespunkter/bekreftelsespunkter-behandlingsdager-tekster'
import BekreftelsespunkterArbeidsledigTekster from '../bekreftelsespunkter/bekreftelsespunkter-arbeidsledig-tekster'
import BekreftelsespunkterSelvstendigNaeringsdrivendeTekster from '../bekreftelsespunkter/bekreftelsespunkter-selvstendig-naeringsdrivende-tekster'
import BekreftelsespunkterOppholdutlandTekster from '../bekreftelsespunkter/bekreftelsespunkter-opphold-utland-tekster'
import BekreftelsespunkterAnnetArbeidsforholdTekster from '../bekreftelsespunkter/bekreftelsespunkter-annet-arbeidsforhold-tekster'
import SendesTil from '../sporsmal-form/sendes-til'

const Kulepunkter = ({ sporsmal }: SpmProps) => {
    const { setValue } = useFormContext()
    const { valgtSoknad } = useSoknadMedDetaljer()

    const bekreftelsespunkterMap: { [key in RSSoknadstype]?: string[] } = {
        [RSSoknadstype.ARBEIDSTAKERE]: Object.values(BekreftelsespunkterArbeidstakereTekster),
        [RSSoknadstype.ARBEIDSLEDIG]: Object.values(BekreftelsespunkterArbeidsledigTekster),
        [RSSoknadstype.ANNET_ARBEIDSFORHOLD]: Object.values(BekreftelsespunkterAnnetArbeidsforholdTekster),
        [RSSoknadstype.BEHANDLINGSDAGER]: Object.values(BekreftelsespunkterBehandlingsdagerTekster),
        [RSSoknadstype.REISETILSKUDD]: Object.values(BekreftelsespunkterReisetilskuddTekster),
        [RSSoknadstype.OPPHOLD_UTLAND]: Object.values(BekreftelsespunkterOppholdutlandTekster),
        [RSSoknadstype.GRADERT_REISETILSKUDD]: Object.values(BekreftelsespunkterGradertReisetilskuddTekster),
        [RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE]: Object.values(
            BekreftelsespunkterSelvstendigNaeringsdrivendeTekster,
        ),
    }

    const kulepunkterTekster = (() => {
        if (!valgtSoknad || !(valgtSoknad.soknadstype in bekreftelsespunkterMap)) {
            return []
        }
        return bekreftelsespunkterMap[valgtSoknad.soknadstype] ?? []
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
                        <List.Item key={tekst + index}>{tekstMedHtml(tekst)}</List.Item>
                    ))}
                </List>
            </div>
            {sporsmal.undertekst && <BodyLong as="div">{tekstMedHtml(sporsmal.undertekst)}</BodyLong>}
            <Oppsummering sporsmal={valgtSoknad!.sporsmal} />
            {valgtSoknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && (
                <>
                    <SendesTil soknad={valgtSoknad!} />
                </>
            )}
            <UndersporsmalListe oversporsmal={sporsmal} />
        </>
    )
}

export default Kulepunkter
