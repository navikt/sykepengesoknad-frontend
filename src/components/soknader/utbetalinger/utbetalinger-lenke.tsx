import './utbetalinger-lenke.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const UtbetalingerLenke = () => {
    const url = 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/Utbetalingsdatoer%2C+feriepenger+og+skattetrekk?kap=499628'

    return (
        <Lenke href={url} target="_blank" rel="noreferrer noopener" className="utbetalinger-lenke">
            <Undertittel tag="h3">
                {tekst('utbetalinger.sykepenger.tittel')}
            </Undertittel>
            <HoyreChevron />
        </Lenke>
    )
}

export default UtbetalingerLenke
