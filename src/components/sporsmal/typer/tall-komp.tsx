import React, { useEffect, useRef } from 'react';
import useForm, { FormContext, useFormContext } from 'react-hook-form';
import { Normaltekst } from 'nav-frontend-typografi';
import { useHistory, useParams } from 'react-router-dom';
import Vis from '../../../utils/vis';
import tekster from '../sporsmal-tekster';
import { SpmProps } from '../sporsmalene';
import { hentSvar, pathUtenSteg, settSvar } from '../sporsmal-utils';
import Knapperad from '../sporsmal-form/knapperad';
import { useAppStore } from '../../../data/stores/app-store';
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

interface TallKompProps {
    desimaler: number;
}

type AllTallKompProps = SpmProps & TallKompProps;

const TallKomp = ({ sporsmal, desimaler }: AllTallKompProps) => {
    const { valgtSoknad, setValgtSoknad } = useAppStore();
    const history = useHistory();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const methods = useForm();

    const onSubmit = (data: any) => {
        settSvar(sporsmal, data);
        methods.reset();
        setValgtSoknad(valgtSoknad);
        history.push(pathUtenSteg(history.location.pathname) + '/' + (spmIndex + 2));
    };

    return (
        sporsmal.erHovedSporsmal
            ?
            <FormContext {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                    <FeilOppsummering visFeilliste={true} errors={methods.errors} />
                    <TallInput sporsmal={sporsmal} desimaler={desimaler} />
                    <Knapperad onSubmit={onSubmit} />
                </form>
            </FormContext>
            :
            <TallInput sporsmal={sporsmal} desimaler={desimaler} />
    );
};

export default TallKomp;

type AllTallProps = SpmProps & TallKompProps;

const TallInput = ({ sporsmal, desimaler }: AllTallProps) => {
    const compId = 'spm_' + sporsmal.id;
    const feilmelding = tekster['soknad.feilmelding.' + sporsmal.tag.toLowerCase()];
    const { register, setValue, watch, errors } = useFormContext();
    const watchVerdi = watch(compId);
    const undersporsmal = useRef<HTMLDivElement>(null);

    const handleChange = () => {
        if (watchVerdi === 'ja') {
            undersporsmal.current.classList.add('aapen');
        } else {
            undersporsmal.current.classList.remove('aapen');
        }
    };

    useEffect(() => {
        setValue(compId, hentSvar(sporsmal));
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <label className="skjema__sporsmal" htmlFor={compId}>
                    <Normaltekst tag="span">{sporsmal.sporsmalstekst}</Normaltekst>
                </label>
            </Vis>

            <input type="number"
                className="input--s"
                name={compId}
                id={compId}
                ref={register({
                    validate: (value: any) => value === true || feilmelding
                })}
                onChange={() => handleChange}
            />

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[compId] !== undefined}>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {errors[compId] && errors[compId].message}
                    </Normaltekst>
                </Vis>
            </div>

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={watchVerdi > 0}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
};
