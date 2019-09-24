import * as React from 'react';
import cls from 'classnames';
import hakeGronn from './kvitteringhake.svg';

interface IllustrertInnholdProps {
    ikon: string,
    ikonAlt: string,
    children?: React.ReactNode,
    revers?: boolean,
    liten?: boolean,
}

export const IllustrertInnhold = ({ ikon, ikonAlt, children, liten, revers }: IllustrertInnholdProps) => {
    const classnamesIkon = cls('illustrertInnhold__ikon', {
        'illustrertInnhold__ikon--liten': liten,
    });
    const classNamesBoks = cls('illustrertInnhold', {
        'illustrertInnhold--revers': revers,
    });
    return (
        <div className={classNamesBoks}>
            <div className={classnamesIkon}>
                <img src={ikon} alt={ikonAlt}/>
            </div>
            <div className="illustrertInnhold__innhold">{children}</div>
        </div>
    );
};

export const IllustrertInnholdGronnHake = (props: any) => {
    return <IllustrertInnhold {...props} ikon={hakeGronn} ikonAlt="Hake" />;
};

export default IllustrertInnholdGronnHake;
