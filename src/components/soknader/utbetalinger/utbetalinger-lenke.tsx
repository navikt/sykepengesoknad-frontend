import React, { useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import utbetalingIkon from './utbetalinger.svg';
import utbetalingHover from './utbetalinger--hover.svg';
import { tekst } from '../../../utils/tekster';

const UtbetalingerLenke = () => {
    const [ ikon, setIkon ] = useState(utbetalingIkon);
    const url = 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/Utbetalingsdatoer%2C+feriepenger+og+skattetrekk?kap=499628';

    return (
        <a href={url} target='_blank' rel='noreferrer noopener'
            onMouseEnter={() => setIkon(utbetalingHover)}
            onMouseLeave={() => setIkon(utbetalingIkon)}
            className='inngangspanel inngangspanel--ekstern'>
            <span className='inngangspanel__ikon'>
                <img alt='' className='js-ikon' src={ikon} />
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
