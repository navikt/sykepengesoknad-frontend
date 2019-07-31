import React from 'react';
import cls from 'classnames';
import parser from 'html-react-parser';
import { Sidetittel } from 'nav-frontend-typografi';

interface SidetoppProps {
    tittel: string,
    htmlTekst?: string,
    className: string
}

const Sidetopp = ({ tittel, htmlTekst = undefined, className }: SidetoppProps) => {
    const classNames = cls('sidetopp', className);

    return (
        <header className={classNames}>
            <Sidetittel tag="h1" className="sidetopp__tittel">
                {tittel}
            </Sidetittel>
            {htmlTekst
                ?
                <div className="sidetopp__intro js-intro">
                    <p>{parser({ htmlTekst })}</p>
                </div>
                :
                null
            }
        </header>
    );
};

export default Sidetopp;
