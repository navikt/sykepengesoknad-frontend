import { Alert, BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { PiggybankIcon } from '@navikt/aksel-icons'

import { SvarEnums } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import KnapperadAvbryt from '../sporsmal-form/knapperad-avbryt'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { tekstMedHtml } from '../../../utils/html-react-parser-utils'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { VarigEndringEksempler } from '../../hjelpetekster/varig-endring-eksempler'
import { VarigEndringAlert } from '../../hjelpetekster/varig-endring-alert'
import { hentInntektMetadata } from '../../../utils/ferdiglignet-inntekt'
import { formatterTall } from '../../../utils/utils'

const JaNeiLiten = ({ sporsmal }: SpmProps) => {
    const { watch, getValues } = useFormContext()
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }
    const feilmelding = hentFeilmelding(sporsmal)

    const presisering = (valgt: boolean) => {
        const spm = sporsmal
        if (spm.tag && valgt) {
            if (spm.tag === 'UTLANDSOPPHOLD_SOKT_SYKEPENGER') {
                const utenlandsopphold =
                    watchJaNei === SvarEnums.JA
                        ? 'soknad.infotekst.utlandsopphold_sokt_sykepenger.ja'
                        : 'soknad.infotekst.utlandsopphold_sokt_sykepenger.nei'
                return (
                    <Alert variant="info">
                        {tekstMedHtml(
                            getLedetekst(tekst(utenlandsopphold), {
                                '%URL%': utlandssoknadUrl,
                            }),
                        )}
                    </Alert>
                )
            }
            if (spm.tag.endsWith('_ER_DU_SYKMELDT') && watchJaNei === 'JA') {
                return <Alert variant="info">{tekst(('soknad.presisering.' + spm.tag) as any)}</Alert>
            }
            if (spm.tag === 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT' && watchJaNei === 'NEI') {
                return (
                    <Alert variant="info">
                        {tekstMedHtml(
                            getLedetekst(tekst(('soknad.presisering.' + spm.tag + '_NEI') as any), {
                                '%URL%': tekst('soknad.presisering.INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT_NEI.url'),
                            }),
                        )}
                    </Alert>
                )
            }
        } else return <></>
    }

    const inntektMetadata =
        sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT' &&
        sporsmal.metadata?.inntekt &&
        hentInntektMetadata(sporsmal.metadata.inntekt as Record<string, number>)

    return (
        <>
            <div
                className={
                    'mt-8' +
                    ' skjemaelement' +
                    (sporsmal.parentKriterie ? ' kriterie--' + sporsmal.parentKriterie.toLowerCase() : '')
                }
            >
                <Controller
                    name={sporsmal.id}
                    rules={{ required: feilmelding.global }}
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmal.sporsmalstekst}
                            error={fieldState.error && feilmelding.lokal}
                        >
                            {inntektMetadata && (
                                <InfoBoks>
                                    <div className="flex">
                                        <PiggybankIcon title="sparegris" fontSize="1.5rem" />
                                        <BodyShort className="mb-4 ml-2 font-semibold">
                                            Inntektsopplysninger fra Skatteetaten
                                        </BodyShort>
                                    </div>
                                    {Object.entries(inntektMetadata.inntekt).map(([year, inntektValue]) => (
                                        <BodyShort key={year}>
                                            {`${year}: ${formatterTall(inntektValue)} kr`}
                                            {inntektMetadata.g[year] &&
                                                ` (G: ${formatterTall(inntektMetadata.g[year])} kr)`}
                                        </BodyShort>
                                    ))}
                                    <BodyShort className="mt-4">
                                        G ved sykmeldingstidspunkt: {formatterTall(inntektMetadata.g.sykmelding)} kr.
                                    </BodyShort>
                                    <BodyShort className="mt-4">
                                        Gjennomsnitt: {formatterTall(inntektMetadata.beregnet.snitt)} kr.
                                    </BodyShort>
                                    <BodyShort>
                                        Gjennomsnitt: {formatterTall(inntektMetadata.beregnet.m25)} kr (- 25 %)
                                    </BodyShort>
                                    <BodyShort>
                                        Gjennomsnitt: {formatterTall(inntektMetadata.beregnet.p25)} kr (+ 25 %)
                                    </BodyShort>
                                </InfoBoks>
                            )}
                            <EkspanderbarHjelp sporsmal={sporsmal} mb="mb-4" />

                            {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING' && <VarigEndringEksempler />}
                            <Fragment key={sporsmal.id}>
                                <Radio id={field.name + '_0'} value="JA">
                                    Ja
                                </Radio>
                                {presisering(field.value === 'JA')}
                                <Radio id={field.name + '_1'} value="NEI">
                                    Nei
                                </Radio>
                                {presisering(field.value === 'NEI')}
                            </Fragment>
                        </RadioGroup>
                    )}
                />
            </div>

            <Vis
                hvis={sporsmal.tag === 'SYKMELDINGSGRAD' && watchJaNei === 'NEI'}
                render={() => (
                    <ProgressivtGuidePanel className="mb-8">
                        <BodyShort>{tekstMedHtml(tekst('sykepengesoknad-utland.skjema.bjorn'))}</BodyShort>
                    </ProgressivtGuidePanel>
                )}
            />

            <Vis
                hvis={sporsmal.tag === 'FERIE' && watchJaNei === 'JA'}
                render={() => (
                    <>
                        <ProgressivtGuidePanel className="mb-8">
                            <BodyShort>
                                {tekstMedHtml(tekst('sykepengesoknad-utland.skjema.ferie-sporsmal-bjorn'))}
                            </BodyShort>
                        </ProgressivtGuidePanel>

                        <KnapperadAvbryt />
                    </>
                )}
            />

            <div aria-live="assertive">
                <AnimateOnMount
                    mounted={
                        watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal &&
                        sporsmal.tag !== 'UTLANDSOPPHOLD_SOKT_SYKEPENGER'
                        // TODO: Dette er en fix for å ikke vise underspørsmål, fjern denne etter hvert
                    }
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />
                </AnimateOnMount>
            </div>
            {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT' && watchJaNei === 'JA' && (
                <VarigEndringAlert />
            )}
        </>
    )
}

export default JaNeiLiten

const InfoBoks = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-6 p-3 rounded bg-surface-info-subtle">{children}</p>
)
