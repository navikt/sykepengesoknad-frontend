import React from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { Innholdstittel } from 'nav-frontend-typografi';
import { formaterEnkeltverdi, genererParseForEnkeltverdi } from '../field-utils';
import DatoVelger from '../../skjema/datovelger/dato-velger';
import { getOnChangeForDato } from '../../../utils/get-on-change';
import { useAppStore } from '../../../data/stores/app-store';

interface DatoProps {
    feilmelding: string;
}

const Dato = (props: DatoProps) => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const stegNo = parseInt(stegId);
    const sporsmal = valgtSoknad.sporsmal[stegNo];

    const parse = genererParseForEnkeltverdi();
    const onChange = getOnChangeForDato(props);
    const compId = 'spm_' + stegId;

    return (
        <>
            <Innholdstittel tag="label" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Innholdstittel>
            <DatoVelger
                oppdaterSporsmal={onChange}
                format={formaterEnkeltverdi}
                parse={parse}
                parseVerdi={parse}
                name={compId}
                id={compId}
                tidligsteFom={dayjs(sporsmal.min).toDate()}
                senesteTom={dayjs(sporsmal.max).toDate()}
            />

            {props.feilmelding}
        </>
    );
};

export default Dato;
