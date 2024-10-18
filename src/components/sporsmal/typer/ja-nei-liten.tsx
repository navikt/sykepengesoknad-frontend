import { Alert, BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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
import { formatterTall } from '../../../utils/utils'
import { erSigrunInntekt, SigrunInntekt } from '../../../types/types'
import { logEvent } from '../../amplitude/amplitude'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const JaNeiLiten = ({ sporsmal }: SpmProps) => {
    const { watch, getValues } = useFormContext()
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }
    const { valgtSoknad } = useSoknadMedDetaljer()

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

    const erVarigEndring25Prosent = sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT'
    let sigrunInntekt: SigrunInntekt | null = null

    if (erVarigEndring25Prosent && erSigrunInntekt(sporsmal.metadata?.sigrunInntekt)) {
        sigrunInntekt = sporsmal.metadata?.sigrunInntekt as SigrunInntekt
    }

    return (
        <>
            <div
                className={
                    'mt-8' +
                    ' skjemaelement' +
                    (sporsmal.parentKriterie ? ' kriterie--' + sporsmal.parentKriterie.toLowerCase() : '')
                }
            >
                {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING' && (
                    <>
                        <BodyShort size="large" weight="semibold" spacing>
                            Varig endring i din arbeidssituasjon eller virksomhet
                        </BodyShort>
                        <BodyShort spacing>
                            Hvis inntekten din har endret seg varig med mer enn 25 prosent på grunn av endringer i
                            arbeidssituasjonen, vil sykepengegrunnlaget fastsettes ved skjønn.
                        </BodyShort>
                        {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING' && <VarigEndringEksempler />}
                    </>
                )}

                <Controller
                    name={sporsmal.id}
                    rules={{
                        required: feilmelding.global,
                        onChange: (event) => {
                            logEvent('skjema spørsmål besvart', {
                                soknadstype: valgtSoknad?.soknadstype,
                                skjemanavn: 'sykepengesoknad',
                                spørsmål: sporsmal.tag,
                                svar: event.target.value,
                            })
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmal.sporsmalstekst}
                            description={sporsmal.undertekst}
                            error={fieldState.error && feilmelding.lokal}
                        >
                            {erVarigEndring25Prosent && sigrunInntekt && (
                                <>
                                    <BodyShort spacing>
                                        Din gjennomsnittlige årsinntekt på sykmeldingstidspunktet:{' '}
                                        <strong>{formatterTall(sigrunInntekt.beregnet.snitt)}</strong> kroner.
                                    </BodyShort>
                                    <BodyShort>
                                        Har du en årsinntekt som gjør at du tjener mindre enn{' '}
                                        <strong>{formatterTall(sigrunInntekt.beregnet.m25)}</strong> kroner eller mer
                                        enn <strong>{formatterTall(sigrunInntekt.beregnet.p25)}</strong> kroner?
                                    </BodyShort>
                                </>
                            )}
                            <EkspanderbarHjelp sporsmal={sporsmal} mb="mb-4" />

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
            {sporsmal.tag == 'AVKLART_MED_SYKMELDER' && watchJaNei === 'NEI' && (
                <Alert variant="warning" className="mt-4">
                    Du må avklare reisen med sykemelder før du reiser. Uten godkjenning risikerer du at sykepengene
                    stanses under reisen og beregnes på nytt etter et lavere grunnlag når du er tilbake. Ved reiser på
                    fire uker eller mer kan dette også føre til avslag på videre sykepenger.
                </Alert>
            )}
            {sporsmal.tag == 'AVKLART_MED_ARBEIDSGIVER_ELLER_NAV' && watchJaNei === 'NEI' && (
                <Alert variant="warning" className="mt-4">
                    Du må avklare reisen med arbeidsgiver/NAV før du reiser. Uten godkjenning risikerer du at
                    sykepengene stanses under reisen og beregnes på nytt etter et lavere grunnlag når du er tilbake. Ved
                    reiser på fire uker eller mer kan dette også føre til avslag på videre sykepenger.
                </Alert>
            )}

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
