import React, { useEffect, useRef, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import Vis from '../../vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import './flatpickr.less';
import useForceUpdate from 'use-force-update';
import PeriodeKomp from './periode-komp';
import { empty } from '../../../utils/constants';
import { hentPerioder } from '../hent-svar';

const Perioder = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<number[]>([ 0 ]);
    const periodeliste = useRef<HTMLUListElement>(null);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const svar = hentPerioder(sporsmal);
        setLokal(svar.length > 0 ? svar : lokal);
        lagIdForPerioder();
        // eslint-disable-next-line
    }, [ sporsmal ]);

    const lagIdForPerioder = () => {
        const perioder = periodeliste.current.querySelectorAll('.periode');
        perioder.forEach((value, key) => {
            const input = value.querySelector('.input--m[type=text]');
            input.setAttribute('id', sporsmal.id + '_t_' + key);
            input.setAttribute('autoComplete', 'off');
        })

    };

    const oppdaterPerioder = () => {
        forceUpdate();
        setTimeout(() => {
            lagIdForPerioder();
        }, 10);
    };

    const slettPeriode = (e: any, idx: number) => {
        e.preventDefault();
        lokal.splice(idx, 1);
        setLokal(lokal);
        oppdaterPerioder();
    };

    const leggTilPeriode = (e: any) => {
        e.preventDefault();
        lokal.push(lokal[lokal.length - 1] + 1);
        setLokal(lokal);
        oppdaterPerioder();
    };

    return (
        <div className={sporsmal.parentKriterie ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() : ''}>
            <Element tag="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Element>

            <ul className="periodeliste" ref={periodeliste}>
                {lokal.map((idx) => {
                    return <PeriodeKomp sporsmal={sporsmal} index={idx} slettPeriode={slettPeriode} key={idx}/>
                })}
            </ul>

            <button role="link" className="periodeknapp lenke" onClick={leggTilPeriode}>
                {tekster['sykepengesoknad.periodevelger.legg-til-ekstra']}
            </button>

            <div className="undersporsmal">
                <Vis hvis={lokal.length > 0 && lokal[0] !== empty}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal}/>
                </Vis>
            </div>
        </div>
    )
};

export default Perioder;
