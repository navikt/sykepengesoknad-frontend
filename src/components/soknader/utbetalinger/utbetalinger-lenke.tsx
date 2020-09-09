import './utbetalinger-lenke.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Lenke from 'nav-frontend-lenker';

const UtbetalingerLenke = () => {
    const url = 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/Utbetalingsdatoer%2C+feriepenger+og+skattetrekk?kap=499628'

    return (
        <Lenke href={url} target="_blank" rel="noreferrer noopener" className="utbetalinger-lenke">
            <Systemtittel tag="h3">
                {tekst('utbetalinger.sykepenger.tittel')}
            </Systemtittel>
            <HoyreChevron />
        </Lenke>
    )
}

export default UtbetalingerLenke
