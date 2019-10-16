import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useAppStore } from '../../../data/stores/app-store';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import tekster from './oppsummering-tekster';
import CheckBoxImg from './check-box-1.png';
import './oppsummering.less';
import Vis from '../../../utils/vis';

const Oppsummering = () => {
    const { valgtSoknad } = useAppStore();

    return (
        <Ekspanderbartpanel apen={true} tittel={tekster['oppsummering.tittel']} tittelProps="element">
            {valgtSoknad.sporsmal
                .filter((sporsmal) => {
                    return (sporsmal.svar.length > 0 || sporsmal.undersporsmal.length > 0 || sporsmal.svartype === RSSvartype.IKKE_RELEVANT);
                })
                .map((sporsmal) => {
                    const vis = sporsmal.svartype === RSSvartype.RADIO_GRUPPE;
                    return (
                        <div className="sporsmal" key={`${sporsmal.tag}_${sporsmal.id}`}>
                            <Vis hvis={vis}>
                                <img src={CheckBoxImg} alt="" className="bilde"/>
                            </Vis>
                            <Normaltekst className="tekst">{sporsmal.sporsmalstekst}</Normaltekst>
                            {sporsmal.svar.map(svar => {
                                return <div className="undersporsmal">{svar.verdi}</div>
                            })}
                            {sporsmal.undersporsmal.map(uspm => {
                                {
                                    uspm.svar.map(usvar => {
                                        return (
                                            <>
                                                <div className="undersporsmal">{uspm.sporsmalstekst}</div>
                                                <div className="undersporsmal">{usvar.verdi}</div>
                                            </>
                                        )
                                    })
                                }
                            })}
                        </div>
                    );
                })
            }
        </Ekspanderbartpanel>
    );
};

export default Oppsummering;
