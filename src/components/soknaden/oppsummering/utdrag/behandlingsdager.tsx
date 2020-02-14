import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../vis';
import dayjs from 'dayjs';
import { empty } from '../../../../utils/constants';

const datoEllerIkkeTilBehandling = (verdi: string) => {
    if (verdi === "") {
        return "Ikke til behandling";
    }
    return dayjs(verdi).format('DD.MM.YYYY');
};

const Behandlingsdager = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Vis hvis={sporsmal.undersporsmal !== undefined}>
                <div className="oppsummering__sporsmal">
                    <Element tag="h3">{sporsmal.sporsmalstekst}</Element>
                    <Vis hvis={sporsmal.undersporsmal.length > 0}>
                        <div className="oppsummering__undersporsmalsliste">
                            {sporsmal.undersporsmal.map((uspm, idx) => {
                                return (
                                    <div className="oppsummering__sporsmal" key={idx}>
                                        <Element tag="h3">{uspm.sporsmalstekst}</Element>
                                        <div className="oppsummering__tekstsvar">
                                            {uspm.svarliste.svar.map((svarverdi, index) => {
                                                return (
                                                    <Vis
                                                        hvis={svarverdi.verdi !== empty && typeof svarverdi.verdi === 'string'}
                                                        key={index}>
                                                        <Normaltekst className="oppsummering__dato">
                                                            {datoEllerIkkeTilBehandling(svarverdi.verdi.toString())}
                                                        </Normaltekst>
                                                    </Vis>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Vis>
                </div>
            </Vis>
        </>
    )
};

export default Behandlingsdager;
