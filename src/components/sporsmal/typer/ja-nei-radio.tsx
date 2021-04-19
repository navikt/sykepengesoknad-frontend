import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { SvarEnums, TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { utlandssoknadUrl } from '../../../utils/url-utils'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import VisBlock from '../../vis-block'
import Bjorn from '../bjorn/bjorn'
import KnapperadAvbryt from '../sporsmal-form/knapperad-avbryt'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const jaNeiValg = [ {
    value: 'JA',
    label: 'Ja',
}, {
    value: 'NEI',
    label: 'Nei',
} ]

const JaNeiRadio = ({ sporsmal }: SpmProps) => {
    const { register, watch, errors } = useFormContext()
    const watchJaNei = watch(sporsmal.id)
    const feilmelding = hentFeilmelding(sporsmal)

    const presisering = (valgt: boolean) => {
        const spm = sporsmal
        if (spm.tag && valgt) {
            if (spm.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER) {
                const utenlandsopphold = watchJaNei === SvarEnums.JA
                    ? 'soknad.infotekst.utlandsopphold_sokt_sykepenger.ja'
                    : 'soknad.infotekst.utlandsopphold_sokt_sykepenger.nei'
                return <div className="ekstrasporsmal">
                    <Normaltekst tag="span">
                        {parser(getLedetekst(tekst(utenlandsopphold), { '%URL%': utlandssoknadUrl }))}
                    </Normaltekst>
                </div>
            }
            if (spm.tag.startsWith('INNTEKTSKILDE_') && watchJaNei === 'JA') {
                return <div className="presisering">
                    <Normaltekst tag="span">
                        {tekst('soknad.presisering.' + spm.tag as any)}
                    </Normaltekst>
                </div>
            }
            if (spm.tag === 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT' && watchJaNei === 'NEI') {
                return <div className="presisering">
                    <Normaltekst tag="span">
                        {parser(getLedetekst(tekst('soknad.presisering.' + spm.tag + '_NEI' as any), { '%URL%': tekst('soknad.presisering.INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT_NEI.url') }))}
                    </Normaltekst>
                </div>
            }
        } else return <></>
    }

    return (
        <>
            <div className={
                'skjemaelement' +
                (sporsmal.parentKriterie ? ' kriterie--' + sporsmal.parentKriterie.toLowerCase() : '') +
                (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')
            }>

                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>

                {jaNeiValg.map((valg, idx) => {
                    const OK = watchJaNei === valg.value
                    return (
                        <div className="radioContainer" key={idx}>
                            <input type="radio"
                                id={sporsmal.id + '_' + idx}
                                name={sporsmal.id}
                                value={valg.value}
                                ref={register({ required: feilmelding.global })}
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

            <VisBlock hvis={sporsmal.tag === TagTyper.SYKMELDINGSGRAD && watchJaNei === 'NEI'}
                render={() =>
                    <Bjorn className="press" nokkel="sykepengesoknad-utland.skjema.bjorn" ekstraMarginTop={true} />
                }
            />

            <VisBlock hvis={sporsmal.tag === TagTyper.FERIE && watchJaNei === 'JA'}
                render={() =>
                    <>
                        <Bjorn className="press" nokkel="sykepengesoknad-utland.skjema.ferie-sporsmal-bjorn"
                            ekstraMarginTop={true} />
                        <KnapperadAvbryt />
                    </>
                }
            />

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
        </>
    )
}

export default JaNeiRadio
