import React from 'react';
import { useAppStore } from '../../data/stores/app-store';
import env from '../../utils/environment';
import Vis from '../vis';

const SykSokLokalt = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore();
    return (
        <Vis hvis={env.isDevelopment}>
            <div>
                <span>sok <strong>{
                    valgtSoknad &&
                    valgtSoknad.id.substring(valgtSoknad.id.length - 6, valgtSoknad.id.length)
                }</strong></span>
                &nbsp;&nbsp;
                <span>syk <strong>{
                    valgtSykmelding &&
                    valgtSykmelding.id.substring(valgtSykmelding.id.length - 6, valgtSykmelding.id.length)
                }</strong></span>
                <br />
                <br />
            </div>
        </Vis>
    )
};

export default SykSokLokalt;
