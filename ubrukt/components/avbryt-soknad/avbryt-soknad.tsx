import React, { useEffect, useState } from 'react';
import { getLedetekst, scrollTo } from '@navikt/digisyfo-npm';
import AvbrytSoknadUtvidet from './avbryt-soknad-utvidet';
import { Soknad } from '../../../src/types/types';

interface AvbrytSoknadProps {
    soknad: Soknad,
}

const AvbrytSoknad = (props: AvbrytSoknadProps) => {
    const [erApen, setErApen] = useState(false);
    let dialog: any;

    useEffect(() => {
        if (erApen) {
            scrollTo(dialog);
        }
    });

/*
    function skjulAvbrytdialog() {
        setErApen(false);
    }
*/

    function toggleAvbrytdialog() {
        setErApen(!erApen);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let knapp: HTMLButtonElement;

    return (
        <div className="avbrytDialog blokk--l">
            <p className="avbrytDialog__trigger">
                <button tabIndex={0}
                    aria-pressed={erApen}
                    ref={(c: HTMLButtonElement) => {
                        knapp = c;
                    }}
                    className="lenke"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleAvbrytdialog();
                    }}>{getLedetekst('sykepengesoknad.avbryt.trigger')}
                </button>
            </p>
            <div ref={(c) => {
                dialog = c;
            }}>
                {
                    erApen &&
                    <AvbrytSoknadUtvidet bekreftHandler={toggleAvbrytdialog}/>
                }
            </div>
        </div>
    );
};

export default AvbrytSoknad;
