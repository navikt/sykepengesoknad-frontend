import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import parser from 'html-react-parser';
import ForsteSoknadSvg from './soknad-intro-svg';
import { tekst } from '../../utils/tekster';
import './soknad-intro.less';

const SoknadIntro = () => {
    return (
        <div className='soknad-intro'>
            <div className='blokk-s'>
                <Veilederpanel kompakt svg={<ForsteSoknadSvg/>}>
                    <Normaltekst tag='h2' className='panel__tittel sist'>
                        {parser(tekst('sykepengesoknad.soknad-intro.personvern'))}
                    </Normaltekst>
                </Veilederpanel>
            </div>
        </div>
    );
};

export default SoknadIntro;
