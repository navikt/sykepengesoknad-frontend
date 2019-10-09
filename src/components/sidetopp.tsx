import React from 'react';
import cls from 'classnames';
import parser from 'html-react-parser';
import { Sidetittel } from 'nav-frontend-typografi';

import './sidetopp.less';

interface SidetoppProps {
    tittel: string;
    htmlTekst?: string;
    className?: string;
}

const Sidetopp = ({ tittel, htmlTekst = undefined, className }: SidetoppProps) => {
    const classNames = cls('sidetopp', className);

    return (
        <div className={classNames}>
            <Sidetittel tag="h1" className="sidetopp__tittel">
                {tittel}
            </Sidetittel>
            {htmlTekst
                ?
                <p className="sidetopp__intro">{parser({ htmlTekst })}</p>
                :
                null
            }
        </div>
    );
};

export default Sidetopp;
