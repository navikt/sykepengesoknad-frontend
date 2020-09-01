import { HoyreChevron } from 'nav-frontend-chevron'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const UtbetalingerLenke = () => {
    const url = 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/Utbetalingsdatoer%2C+feriepenger+og+skattetrekk?kap=499628'

    return (
        <a href={url} target="_blank" rel="noreferrer noopener"
            className="inngangspanel">
            <div className="inngangspanel__innhold">
                <Systemtittel className="inngangspanel__tittel" tag="h3">
                    {tekst('utbetalinger.sykepenger.tittel')}
                </Systemtittel>
                <HoyreChevron />
            </div>
        </a>
    )
}

export default UtbetalingerLenke
