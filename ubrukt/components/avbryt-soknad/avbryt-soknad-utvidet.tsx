import React from 'react';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import Feilstripe from '../feilstripe';

interface AvbrytSoknadUtvidetProps {
    bekreftHandler: () => void,
}

const AvbrytSoknadUtvidet = ({ bekreftHandler }: AvbrytSoknadUtvidetProps) => {

    function avbrytHandler() {

    }

    return (
        <div className="avbrytDialog__dialog">
            <div className="pekeboble">
                <p className="blokk--s" dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.avbryt.sporsmal')}/>
                <Feilstripe vis={false} className="blokk"/>
                <div className="blokk--xs">
                    <button
                        className="js-bekreft knapp knapp--fare"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            bekreftHandler();
                        }}>{getLedetekst('sykepengesoknad.avbryt.ja')}
                    </button>
                </div>
                <p className="sist">
                    <button
                        className="lenke js-avbryt"
                        onClick={(e) => {
                            e.preventDefault();
                            avbrytHandler();
                        }}>{getLedetekst('sykepengesoknad.avbryt.angre')}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AvbrytSoknadUtvidet;
