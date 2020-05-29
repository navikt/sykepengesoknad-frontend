import React from 'react';
import { useAppStore } from '../../data/stores/app-store';
import env from '../../utils/environment';
import Vis from '../vis';
import { useParams } from 'react-router';

const SykSokLokalt = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore();
    const { stegId } = useParams();

    if (!valgtSoknad || !valgtSoknad.sporsmal || !stegId || Number(stegId) >= valgtSoknad.sporsmal.length) {
        return null;
    }

    return (
        <Vis hvis={env.isDev}>
            <div style={{ position: 'absolute', fontSize: '10px', marginLeft: '1rem', color: 'gray' }}>
                <span>sok <strong>{
                    valgtSoknad &&
                    valgtSoknad.id.substring(valgtSoknad.id.length - 6, valgtSoknad.id.length)
                }</strong></span>
                &nbsp;&nbsp;
                <span>syk <strong>{
                    valgtSykmelding &&
                    valgtSykmelding.id.substring(valgtSykmelding.id.length - 6, valgtSykmelding.id.length)
                }</strong></span>
                &nbsp;&nbsp;
                <span>spm
                    <strong> {
                        valgtSoknad && valgtSoknad.sporsmal[Number(stegId) - 1].id
                    } </strong>
                    <strong> {
                        valgtSoknad && valgtSoknad.sporsmal[Number(stegId) - 1].tag
                    } </strong>
                </span>
                <br />
                <br />
            </div>
        </Vis>
    )
};

export default SykSokLokalt;
