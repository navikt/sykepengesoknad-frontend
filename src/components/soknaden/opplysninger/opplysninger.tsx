import React from 'react';
import tekster from './opplysninger-tekster';
import SykmeldingPerioder from './sykmelding-perioder';
import ArbeidsgiverInfo from './arbeidsgiver-info';
import SykmeldingDato from './sykmelding-dato';
import SelvstendigInfo from './selvstendig-info';
import { useAppStore } from '../../../data/stores/app-store';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import plaster from './plaster.svg';
import plasterHover from './plaster-hover.svg';
import './opplysninger.less';
import Utvidbar from '../../utvidbar';


const Opplysninger = () => {
    const {valgtSoknad} = useAppStore();
    const tidligere: boolean = valgtSoknad.status === RSSoknadstatus.SENDT || valgtSoknad.status === RSSoknadstatus.AVBRUTT;

    return (
        <Utvidbar className={'ekspander' + (!tidligere ? ' apen' : '')}
            ikon={plaster} ikonHover={plasterHover} erApen={!tidligere}
            tittel={tekster['sykepengesoknad.sykmelding-utdrag.tittel']}
            ikonAltTekst=""
        >
            <div className="opplysninger">
                <SykmeldingPerioder />
                <ArbeidsgiverInfo />
                <SykmeldingDato />
                <SelvstendigInfo />
            </div>
        </Utvidbar>
    )
};

export default Opplysninger;
