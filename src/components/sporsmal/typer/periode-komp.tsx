import { ErrorMessage, useFormContext } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { hentSvar } from '../sporsmal-utils';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import useForceUpdate from 'use-force-update';
import './flatpickr.less';

export class Periode {
    fom?: Date;
    tom?: Date;
}

const PeriodeInput = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<Periode[]>([ new Periode() ]);
    const { register, setValue, errors } = useFormContext();
    const periodeliste = useRef<HTMLUListElement>(null);
    const forceUpdate = useForceUpdate();
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];

    useEffect(() => {
        const svar = hentSvar(sporsmal);
        setLokal(svar.length > 0 ? svar : lokal);
        setValue(sporsmal.id, lokal);
        //oppdaterPerioder();
        register({
            name: sporsmal.id,
            validate: { required: feilmelding },
            required: true
        });
        lagIdForPerioder();
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const onChange = (dates: Date[], a: any, b: any) => {
        const index = b.input.id.split('_')[1];
        lokal[index].fom = dates[0];
        lokal[index].tom = dates[1];
        setLokal(lokal);
        setValue(sporsmal.id, lokal);

    };

    const lagIdForPerioder = () => {
        const perioder = periodeliste.current.querySelectorAll('.periode');
        perioder.forEach((value, key) => {
            const input = value.querySelector('.input--m[type=text]');
            input.setAttribute('id', sporsmal.id + '_t_' + key);
            input.setAttribute('autoComplete', 'off');
        })
    };

    const leggTilPeriode = (e: any) => {
        e.preventDefault();
        lokal.push(new Periode());
        setLokal(lokal);
        oppdaterPerioder();
    };

    const slettPeriode = (e: any) => {
        e.preventDefault();
        const index = e.target.id.split('_')[1];
        lokal.splice(index, 1);
        setLokal(lokal);
        oppdaterPerioder();
    };

     const oppdaterPerioder = () => {
        forceUpdate();
        setTimeout(() => {
            lagIdForPerioder();
        },10);
    };

    return (
        <div className={sporsmal.parentKriterie ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() : ''}>
            <Element tag="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Element>

            <ul className="periodeliste" ref={periodeliste}>
                {lokal.map((periode, idx) => {
                    return (
                        <li key={idx} className="periode">
                            <div className="periodelabel">
                                <label htmlFor={sporsmal.id + '_t_' + idx} className="fom">
                                    {tekster['sykepengesoknad.periodevelger.fom']}
                                </label>
                                <label htmlFor={sporsmal.id + '_t_' + idx} className="tom">
                                    {tekster['sykepengesoknad.periodevelger.tom']}
                                </label>
                            </div>
                            <Flatpickr
                                id={sporsmal.id + '_' + idx}
                                name={sporsmal.id + '_' + idx}
                                value={[ periode.fom, periode.tom ]}
                                onChange={onChange}
                                className="skjemaelement__input input--m"
                                placeholder="dd.mm.yyyy til dd.mm.yyyy"
                                options={{
                                    minDate: sporsmal.min,
                                    maxDate: sporsmal.max,
                                    mode: 'range',
                                    enableTime: false,
                                    dateFormat: 'F j, Y',
                                    altInput: true,
                                    altFormat: 'd.m.Y',
                                    locale: Norwegian,
                                    allowInput: true,
                                }}
                            />
                            <Vis hvis={idx > 0}>
                                <button role="link" id={'btn_' + idx} className="periodeknapp lenke slett" onClick={slettPeriode}>
                                    {tekster['sykepengesoknad.periodevelger.slett']}
                                </button>
                            </Vis>
                        </li>
                    )
                })}
            </ul>

            <button role="link" className="periodeknapp lenke" onClick={leggTilPeriode}>
                {tekster['sykepengesoknad.periodevelger.legg-til-ekstra']}
            </button>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage as="p" errors={errors} name={sporsmal.id} />
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal">
                <Vis hvis={lokal.length > 0 && lokal[0].fom !== undefined}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal}/>
                </Vis>
            </div>
        </div>
    )
};

export default PeriodeInput;
