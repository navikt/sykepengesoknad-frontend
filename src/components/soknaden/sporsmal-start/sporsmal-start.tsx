import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import tekster from './sporsmal-start-tekster';
import { useAppStore } from '../../../data/stores/app-store';
import './sporsmal-start.less';
import Vis from '../../../utils/vis';
import FeilOppsummering from '../../skjema/feiloppsummering/feil-oppsummering';

const SporsmalStart = () => {
    const {soknader, setSoknader, valgtSoknad, setValgtSoknad} = useAppStore();
    const [bekreft, setBekreft] = useState<boolean>(false);
    const {handleSubmit, register, errors} = useForm();

    const onSubmit = (data: any) => {
        console.log('spm', data['sporsmal_0']); // eslint-disable-line
        const svar: any = {verdi: data.sporsmal_0};
        valgtSoknad.sporsmal[0].svar = [svar];
        console.log('svar', svar); // eslint-disable-line
        console.log('valgtSoknad', valgtSoknad); // eslint-disable-line
        console.log('errors', errors['sporsmal_0']); // eslint-disable-line
    };

    return (
        <section className="sporsmal-start">
            <div className="foer-du-begynner">
                <Systemtittel tag="h3" className="foer-du-begynner-tittel">{tekster['sykepengesoknad.foer-du-begynner.tittel']}</Systemtittel>
                <Normaltekst>{tekster['sykepengesoknad.foer-du-begynner.introtekst']}</Normaltekst>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <FeilOppsummering visFeilliste={true} errors={errors}/>

                <div className="skjemaelement skjemaelement--horisontal bekreft">
                    <input
                        type="checkbox"
                        className="skjemaelement__input checkboks"
                        name="sporsmal_0"
                        id="sporsmal_0"
                        ref={register({
                            validate: value => value === true
                        })}
                        checked={bekreft}
                        onChange={() => setBekreft(!bekreft)}
                    />
                    <label className="skjemaelement__label" htmlFor="sporsmal_0">
                        {valgtSoknad.sporsmal[0].sporsmalstekst}
                    </label>
                </div>
                <div role="alert" aria-live="assertive">
                    <Vis hvis={errors['sporsmal_0'] !== undefined}>
                        <div className="skjemaelement__feilmelding">{tekster['soknad.feilmelding.ansvarserklaring']}</div>
                    </Vis>
                </div>

                <div className="knapperad">
                    <Knapp type="hoved">{tekster['sykepengesoknad.ga-videre']}</Knapp>
                    <Lenke href={'asdf'}>
                        <Normaltekst>{tekster['sykepengesoknad.avbryt.trigger']}</Normaltekst>
                    </Lenke>
                </div>
            </form>
        </section>
    );
};

export default SporsmalStart;
