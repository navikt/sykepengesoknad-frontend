import * as React from 'react';
import { useAppStore } from '../stores/app-store';
import Soknader from './soknader';

const SoknaderSide = () => {
    const { soknader, visFeil } = useAppStore();

    return (
        <div className="limit">
            {
                <Soknader soknader={soknader} visFeil={visFeil}/>
            }
        </div>
    )
};

export default SoknaderSide;
