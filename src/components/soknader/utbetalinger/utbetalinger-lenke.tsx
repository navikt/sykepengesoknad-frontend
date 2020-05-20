import React, { useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import utbetalingIkon from './utbetalinger.svg';
import utbetalingHover from './utbetalinger--hover.svg';
import { tekst } from '../../../utils/tekster';

const UtbetalingerLenke = () => {
    const [ ikon, setIkon ] = useState(utbetalingIkon);

    return (
        <a href={tekst('utbetaliner.lenke.url')} target='_blank' rel='noreferrer noopener'
            onMouseEnter={() => setIkon(utbetalingHover)}
            onMouseLeave={() => setIkon(utbetalingIkon)}
            className='inngangspanel inngangspanel--ekstern'>
            <span className='inngangspanel__ikon'>
                <img alt='' className='js-ikon' src={ikon}/>
            </span>
            <div className='inngangspanel__innhold'>
                <Systemtittel className='inngangspanel__tittel' tag='h2'>
                    {tekst('soknader.sykepenger.tittel')}
                </Systemtittel>
            </div>
        </a>
    );
};

export default UtbetalingerLenke;
