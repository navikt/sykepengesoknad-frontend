import { Alert, BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { SvarEnums, TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import KnapperadAvbryt from '../sporsmal-form/knapperad-avbryt'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

const JaNeiLiten = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }
    const feilmelding = hentFeilmelding(sporsmal)

    const presisering = (valgt: boolean) => {
        const spm = sporsmal
        if (spm.tag && valgt) {
            if (spm.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER) {
                const utenlandsopphold =
                    watchJaNei === SvarEnums.JA
                        ? 'soknad.infotekst.utlandsopphold_sokt_sykepenger.ja'
                        : 'soknad.infotekst.utlandsopphold_sokt_sykepenger.nei'
                return (
                    <Alert variant="info">
                        {parserWithReplace(
                            getLedetekst(tekst(utenlandsopphold), {
                                '%URL%': utlandssoknadUrl,
                            }),
                        )}
                    </Alert>
                )
            }
            if (spm.tag.startsWith('INNTEKTSKILDE_') && watchJaNei === 'JA') {
                return <Alert variant="info">{tekst(('soknad.presisering.' + spm.tag) as any)}</Alert>
            }
            if (spm.tag === 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT' && watchJaNei === 'NEI') {
                return (
                    <div className="presisering">
                        <BodyShort as="span">
                            {parserWithReplace(
                                getLedetekst(tekst(('soknad.presisering.' + spm.tag + '_NEI') as any), {
                                    '%URL%': tekst(
                                        'soknad.presisering.INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT_NEI.url',
                                    ),
                                }),
                            )}
                        </BodyShort>
                    </div>
                )
            }
        } else return <></>
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
                <Controller
                    name={sporsmal.id}
                    rules={{ required: feilmelding.global }}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmal.sporsmalstekst}
                            error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                            key={sporsmal.id}
                        >
                            <Radio id={field.name + '_' + '0'} value="JA">
                                Ja
                            </Radio>
                            {presisering(field.value === 'JA')}
                            <Radio id={field.name + '_' + '1'} value="NEI">
                                Nei
                            </Radio>
                            {presisering(field.value === 'NEI')}
                        </RadioGroup>
                    )}
                />
            </div>

            <Vis
                hvis={sporsmal.tag === TagTyper.SYKMELDINGSGRAD && watchJaNei === 'NEI'}
                render={() => (
                    <ProgressivtGuidePanel className="mb-8">
                        <BodyShort>{parserWithReplace(tekst('sykepengesoknad-utland.skjema.bjorn'))}</BodyShort>
                    </ProgressivtGuidePanel>
                )}
            />

            <Vis
                hvis={sporsmal.tag === TagTyper.FERIE && watchJaNei === 'JA'}
                render={() => (
                    <>
                        <ProgressivtGuidePanel className="mb-8">
                            <BodyShort>
                                {parserWithReplace(tekst('sykepengesoknad-utland.skjema.ferie-sporsmal-bjorn'))}
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
                        sporsmal.tag !== TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER
                        // TODO: Dette er en fix for å ikke vise underspørsmål, fjern denne etter hvert
                    }
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />
                </AnimateOnMount>
            </div>
        </>
    )
}

export default JaNeiLiten
