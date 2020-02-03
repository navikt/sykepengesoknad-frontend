import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect } from 'react';
import { hentSvar } from '../sporsmal-utils';
import { SpmProps } from '../sporsmal-form/sporsmal-form';
import { ErrorMessage, useFormContext } from 'react-hook-form';
import Vis from '../../vis';
import { Sporsmal } from '../../../types/types';
import { ukeDatoListe } from '../../../utils/dato-utils';
import './beh.dager.less';

const BehDager = ({ sporsmal }: SpmProps) => {
    const { register, setValue, errors, watch } = useFormContext();

    useEffect(() => {
        const lagret = hentSvar(sporsmal);
    }, [ sporsmal ]);

    const dagerSidenMandag = (spm: Sporsmal) => {
        return (((new Date(spm.min).getDay() - 1) % 7) + 7) % 7;
    };

    return (
        <React.Fragment>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className="skjemaelement">
                <div className="skjema__beh-dager">
                    <div className={'ukedager'}>
                        <span>Man</span>
                        <span>Tir</span>
                        <span>Ons</span>
                        <span>Tor</span>
                        <span>Fre</span>
                    </div>

                    {sporsmal.undersporsmal.map((ukespm, idx) => {
                        const behWatch = watch(ukespm.id);

                        return (
                            <div className="kalenderuke" key={idx}>
                                {Array(dagerSidenMandag(ukespm)).fill(0).map((i, idx) => {
                                    return <div className="kalenderdag tomdag" key={idx} />;
                                })}

                                {ukeDatoListe(ukespm.min, ukespm.max).map((dagspm, idx) => {
                                    return (
                                        <div className="kalenderdag" key={idx}>
                                            <input type="radio"
                                                id={ukespm.id + '_' + idx}
                                                name={ukespm.id}
                                                value={dagspm.day()}
                                                ref={register}
                                                className="radioknapp"
                                            />
                                            <label htmlFor={ukespm.id + '_' + idx}
                                                onClick={() => setValue(ukespm.id, '')}
                                                >
                                                {dagspm.date()}
                                            </label>
                                        </div>
                                    );
                                })}
                                <div className="kalenderdag">
                                    <input type="radio" name={ukespm.id}
                                        className="radioknapp" value={null}
                                        id={ukespm.id + '_fjern'}
                                    />
                                    <label htmlFor={ukespm.id + '_fjern'} className="fjern">
                                        fjern
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        <ErrorMessage errors={errors} name={sporsmal.id} />
                    </Normaltekst>
                </Vis>
            </div>
        </React.Fragment>
    )
};

export default BehDager;
