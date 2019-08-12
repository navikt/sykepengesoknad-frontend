import React from 'react';
import Knapp from 'nav-frontend-knapper';
import { Soknad } from '../../../types/types';

interface EndreSoknadProps {
    soknad: Soknad,
}

function endreSoknad(id: string) {

}

// TODO: Gjenskape endreSoknad fra gammelt prosjekt

const EndreSoknad = ({ soknad }: EndreSoknadProps) => {
    return (
        <div className="verktoylinje__element">
            <Knapp
                type="standard"
                mini
                onClick={(e) => {
                    e.preventDefault();
                    endreSoknad(soknad.id);
                }}
                className="js-endre">
                Endre søknad
            </Knapp>
        </div>
    )
};

export default EndreSoknad;
