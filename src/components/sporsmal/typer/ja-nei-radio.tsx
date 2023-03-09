import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { SvarEnums, TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import KnapperadAvbryt from '../sporsmal-form/knapperad-avbryt'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

import styles from './JaNeiRadio.module.css'

const jaNeiValg = [
    {
        value: 'JA',
        label: 'Ja',
    },
    {
        value: 'NEI',
        label: 'Nei',
    },
]

const JaNeiRadio = ({ sporsmal }: SpmProps) => {
    const {
        register,
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
                    <div className="ekstrasporsmal">
                        <BodyShort as="span">
                            {parserWithReplace(
                                getLedetekst(tekst(utenlandsopphold), {
                                    '%URL%': utlandssoknadUrl,
                                }),
                            )}
                        </BodyShort>
                    </div>
                )
            }
            if (spm.tag.startsWith('INNTEKTSKILDE_') && watchJaNei === 'JA') {
                return (
                    <div className="presisering">
                        <BodyShort as="span">{tekst(('soknad.presisering.' + spm.tag) as any)}</BodyShort>
                    </div>
                )
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
                    'skjemaelement' +
                    (sporsmal.parentKriterie ? ' kriterie--' + sporsmal.parentKriterie.toLowerCase() : '') +
                    (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')
                }
            >
                <Label as="h3" className="skjema__sporsmal">
                    {sporsmal.sporsmalstekst}
                </Label>

                {jaNeiValg.map((valg, idx) => {
                    const OK = watchJaNei === valg.value
                    return (
                        <div className="radioContainer" key={idx}>
                            <input
                                type="radio"
                                id={sporsmal.id + '_' + idx}
                                value={valg.value}
                                {...register(sporsmal.id, {
                                    required: feilmelding.global,
                                })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label className="skjemaelement__label" htmlFor={sporsmal.id + '_' + idx}>
                                {valg.label}
                            </label>
                            {presisering(OK)}
                        </div>
                    )
                })}
                <FeilLokal sporsmal={sporsmal} />
            </div>

            <Vis
                hvis={sporsmal.tag === TagTyper.SYKMELDINGSGRAD && watchJaNei === 'NEI'}
                render={() => (
                    <ProgressivtGuidePanel className={styles.guidepanelWrapper}>
                        <BodyShort>{parserWithReplace(tekst('sykepengesoknad-utland.skjema.bjorn'))}</BodyShort>
                    </ProgressivtGuidePanel>
                )}
            />

            <Vis
                hvis={sporsmal.tag === TagTyper.FERIE && watchJaNei === 'JA'}
                render={() => (
                    <>
                        <ProgressivtGuidePanel className={styles.guidepanelWrapper}>
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

export default JaNeiRadio
