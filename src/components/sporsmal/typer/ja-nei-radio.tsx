import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import { SvarEnums, TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { utlandssoknadUrl } from '../../../utils/url-utils'
import Vis from '../../vis'
import Bjorn from '../bjorn/bjorn'
import { hentSvar } from '../hent-svar'
import KnapperadAvbryt from '../sporsmal-form/knapperad-avbryt'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

const jaNeiValg = [ {
    value: 'JA',
    label: 'Ja',
}, {
    value: 'NEI',
    label: 'Nei',
} ]

const JaNeiRadio = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))
    const { register, setValue, errors } = useFormContext()
    const { setRerenderSporsmalForm } = useAppStore()

    const feilmelding = hentFeilmelding(sporsmal)

    useEffect(() => {
        const lagret = hentSvar(sporsmal)
        if (lagret !== '') {
            setValue(sporsmal.id, lagret)
            setLokal(lagret)
        }
        // eslint-disable-next-line
    }, [sporsmal]);

    const changeValue = (value: string) => {
        setValue(sporsmal.id, value)
        setLokal(lokal === value ? '' : value)
        // Force rerender siden setValue kun trigger rerender første gangen
        setRerenderSporsmalForm(new Date().getUTCMilliseconds())
    }

    const presisering = (valgt: boolean) => {
        const spm = sporsmal
        if (spm.tag && valgt) {
            if (spm.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER) {
                const utenlandsopphold = lokal === SvarEnums.JA
                    ? 'soknad.infotekst.utlandsopphold_sokt_sykepenger.ja'
                    : 'soknad.infotekst.utlandsopphold_sokt_sykepenger.nei'
                return <div className="ekstrasporsmal">
                    <Normaltekst tag="span">
                        {parser(getLedetekst(tekst(utenlandsopphold), { '%URL%': utlandssoknadUrl }))}
                    </Normaltekst>
                </div>
            }
            if (spm.tag.startsWith('INNTEKTSKILDE_') && lokal === 'JA') {
                return <div className="presisering">
                    <Normaltekst tag="span">
                        {tekst('soknad.presisering.' + spm.tag)}
                    </Normaltekst>
                </div>
            }
            if (spm.tag === 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT' && lokal === 'NEI') {
                return <div className="presisering">
                    <Normaltekst tag="span">
                        {parser(getLedetekst(tekst('soknad.presisering.' + spm.tag + '_NEI'), { '%URL%': tekst('soknad.presisering.INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT_NEI.url') }))}
                    </Normaltekst>
                </div>
            }
        }
        else return <></>
    }

    return (
        <>
            <div className={sporsmal.parentKriterie
                ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                : 'skjemaelement'
            }>

                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>

                {jaNeiValg.map((valg, idx) => {
                    const OK = lokal === valg.value
                    return (
                        <div className="radioContainer" key={idx}>
                            <input type="radio"
                                id={sporsmal.id + '_' + idx}
                                name={sporsmal.id}
                                value={valg.value}
                                checked={OK}
                                aria-checked={OK}
                                onClick={() => changeValue(valg.value)}
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
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id]}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <p>{feilmelding.lokal}</p>
                    </Normaltekst>
                </Vis>
            </div>
            <Vis hvis={sporsmal.tag === TagTyper.SYKMELDINGSGRAD && lokal === 'NEI'}>
                <Bjorn className="press" nokkel="sykepengesoknad-utland.skjema.bjorn" ekstraMarginTop={true} />
            </Vis>
            <Vis hvis={sporsmal.tag === TagTyper.FERIE && lokal === 'JA'}>
                <Bjorn className="press" nokkel="sykepengesoknad-utland.skjema.ferie-sporsmal-bjorn"
                    ekstraMarginTop={true} />
                <KnapperadAvbryt />
            </Vis>
        </>
    )
}

export default JaNeiRadio
