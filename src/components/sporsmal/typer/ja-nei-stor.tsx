import { Alert, BodyLong, Radio, RadioGroup } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'

import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { PaskeferieInfo } from '../../hjelpetekster/paaskeferie/paskeferie-info'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { YrkesskadeInfo } from '../../hjelpetekster/yrkesskade-info'
import { useJaNeiTastaturNavigasjon } from '../../../utils/tastatur-navigasjon'
import { Inntektsbulletpoints } from '../inntektsbulletpoints'
import { Yrkesskadebulletpoints } from '../yrkesskade-bulletpoints'
import { InntektsopplysningerErKonfidensielleInfo } from '../inntektsopplysninger-er-konfidensielle-info'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { KjentOppholdstillatelse } from '../kjent-oppholdstillatelse'
import { NyttArbeidsforhold } from '../nytt-arbeidsforhold'
import { logEvent } from '../../umami/umami'
import { OppholdUtenforEUEOS } from '../opphold-utenfor-eu-eos/opphold-utenfor-eu-eos'
import { NaringsdrivendeYrkesaktivInfo } from '../../hjelpetekster/yrkesaktiv-info'
import { VarigEndringInfo } from '../../hjelpetekster/varig-endring-info'

import { jaNeiStorStyle, JaNeiStyle } from './ja-nei-stor-style'

const JaNeiStor = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        clearErrors,
        watch,
        getValues,
    } = useFormContext()
    const { valgtSoknad } = useSoknadMedDetaljer()

    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }

    useJaNeiTastaturNavigasjon(sporsmal)
    if (!valgtSoknad) return null

    const valider = (value: any) => {
        if (value === 'JA' || value === 'NEI') {
            if (sporsmal.erHovedsporsmal) {
                clearErrors()
            } else {
                clearErrors(sporsmalIdListe(sporsmal.undersporsmal))
            }
            return true
        }
        return false
    }

    const error = errors[sporsmal.id] !== undefined

    const skalHaInntektsbulletpoints =
        sporsmal.tag === 'ANDRE_INNTEKTSKILDER_V2' &&
        (valgtSoknad.inntektskilderDataFraInntektskomponenten || sporsmal.metadata)
    const skalViseKjentOppholdstillatelse =
        sporsmal.tag === 'MEDLEMSKAP_OPPHOLDSTILLATELSE_V2' && valgtSoknad.kjentOppholdstillatelse

    function sporsmalstekst() {
        if (skalHaInntektsbulletpoints) {
            return 'Har du andre inntektskilder enn nevnt over?'
        }
        return sporsmal.sporsmalstekst
    }

    const erOppholdUtenforEUEOS = sporsmal.tag === 'OPPHOLD_UTENFOR_EOS' || sporsmal.tag === 'FTA_REISE_TIL_UTLANDET'

    return (
        <>
            <div>
                {skalHaInntektsbulletpoints && (
                    <Inntektsbulletpoints key="inntekt-bulletpoints" soknad={valgtSoknad} sporsmal={sporsmal} />
                )}
                {skalViseKjentOppholdstillatelse && (
                    <KjentOppholdstillatelse key="kjent-opphold" soknad={valgtSoknad} />
                )}
                {sporsmal.tag === 'NYTT_ARBEIDSFORHOLD_UNDERVEIS' && (
                    <NyttArbeidsforhold key="nytt-arbeidsforhold" spm={sporsmal} />
                )}
                {erOppholdUtenforEUEOS && <OppholdUtenforEUEOS />}

                <Controller
                    name={sporsmal.id}
                    rules={{
                        validate: (value) => valider(value),
                        required: feilmelding.global,
                        onChange: (event) => {
                            logEvent('skjema spørsmål besvart', {
                                soknadstype: valgtSoknad.soknadstype,
                                skjemanavn: 'sykepengesoknad',
                                spørsmål: sporsmal.tag,
                                svar: event.target.value,
                            })
                        },
                    }}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmalstekst()}
                            description={sporsmal.undertekst}
                            data-cy="ja-nei-stor"
                            className="w-full"
                            key={sporsmal.id}
                            error={fieldState.error && feilmelding.lokal}
                            style={
                                {
                                    '--ac-radio-checkbox-border': error
                                        ? 'var(--a-border-danger)'
                                        : 'var(--a-border-default)',
                                    '--ac-radio-checkbox-action-hover-bg': 'white',
                                } as React.CSSProperties
                            }
                        >
                            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} key="ja-nei-stor-guidepanel" />

                            <EkspanderbarHjelp sporsmal={sporsmal} key="ja-nei-stor-hjelp" />
                            {sporsmal.tag === 'YRKESSKADE_V2' && <Yrkesskadebulletpoints sporsmal={sporsmal} />}

                            <JaNeiStyle key="ja-nei-stor-style">
                                <Radio
                                    id={`${field.name}_0`}
                                    key={`${field.name}_0`}
                                    value="JA"
                                    className={jaNeiStorStyle('JA', watchJaNei, error)}
                                >
                                    Ja
                                </Radio>
                                <Radio
                                    id={`${field.name}_1`}
                                    key={`${field.name}_1`}
                                    value="NEI"
                                    className={jaNeiStorStyle('NEI', watchJaNei, error, true)}
                                >
                                    Nei
                                </Radio>
                            </JaNeiStyle>
                        </RadioGroup>
                    )}
                />

                {sporsmal.tag === 'ANDRE_INNTEKTSKILDER_V2' && <InntektsopplysningerErKonfidensielleInfo />}

                {sporsmal?.tag === 'UTLANDSOPPHOLD_SOKT_SYKEPENGER' && watchJaNei && (
                    <BodyLong spacing className="utland_infotekst">
                        {tekstMedHtml(
                            getLedetekst(
                                tekst(
                                    ('soknad.infotekst.utlandsopphold_sokt_sykepenger.' +
                                        watchJaNei?.toLowerCase()) as any,
                                ),
                                { '%URL%': utlandssoknadUrl },
                            ),
                        )}
                    </BodyLong>
                )}

                {sporsmal.tag === 'FRAVAR_FOR_SYKMELDINGEN_V2' && watchJaNei === 'JA' && (
                    <Alert variant="info" className="mt-8">
                        Det kan være vi trenger flere opplysninger om fraværet ditt. Da vil en saksbehandler ta kontakt.
                    </Alert>
                )}
                {sporsmal.tag === 'NARINGSDRIVENDE_OPPRETTHOLDT_INNTEKT' && watchJaNei === 'JA' && (
                    <Alert variant="info" className="mt-8">
                        Det kan være vi trenger mer dokumentasjon på dette. Da vil en saksbehandler ta kontakt med deg.
                    </Alert>
                )}
            </div>

            <div>
                <AnimateOnMount
                    mounted={watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal}
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <>
                        <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />
                        {valgtSoknad?.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING &&
                            sporsmal.tag === 'FERIE_V2' &&
                            watchJaNei === 'JA' && (
                                <Alert data-cy="feriekorrigeringvarsel" className="mt-8" variant="info">
                                    Du kan dra på ferie mens du er sykmeldt, men du får ikke utbetalt sykepenger når du
                                    har ferie.
                                </Alert>
                            )}
                        <YrkesskadeInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
                        <PaskeferieInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
                        <NaringsdrivendeYrkesaktivInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />
                        <VarigEndringInfo sporsmal={sporsmal} jaNeiSvar={watchJaNei} />

                        {erOppholdUtenforEUEOS && (
                            <Alert variant="info" className="mt-4">
                                Nav oppretter en egen søknad som du må sende inn. Du får varsel når den er klar, og
                                finner den under Ditt sykefravær etter at du har sendt inn denne søknaden.
                            </Alert>
                        )}
                    </>
                </AnimateOnMount>
            </div>
        </>
    )
}

export default JaNeiStor
