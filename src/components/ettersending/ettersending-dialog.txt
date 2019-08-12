/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHtmlLedetekst, getLedetekst } from '@navikt/digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import { soknadPt } from '../../../propTypes/index';
import { ettersendSoknadTilNav } from '../../data/ettersending/ettersendingNav';
import { ettersendSoknadTilArbeidsgiver } from '../../data/ettersending/ettersendingArbeidsgiver';
import Feilstripe from '../../../components/Feilstripe';
import { ETTERSEND_SOKNAD_FEILET, ETTERSEND_SOKNAD_SENDER, selectEttersendSoknadStatus } from '../../data/ettersending/ettersendingSelectors';

const sendtTilNAVDato = 'sendtTilNAVDato';
const sendtTilArbeidsgiverDato = 'sendtTilArbeidsgiverDato';
const ledetekstKeySuffixPt = PropTypes.oneOf(['send-til-nav', 'send-til-arbeidsgiver']);
const manglendeDatoPt = PropTypes.oneOf([sendtTilNAVDato, sendtTilArbeidsgiverDato]);

export const EttersendingDialog = (props) => {
    const {
        onClose,
        sykepengesoknad,
        status,
        ledetekstKeySuffix,
        manglendeDato,
        doEttersendSoknadTilNav,
        doEttersendSoknadTilArbeidsgiver,
    } = props;

    const sender = status === ETTERSEND_SOKNAD_SENDER;
    return (<div className="ettersending">
        <h3 className="modal__tittel">{getLedetekst(`sykepengesoknad.ettersending.info.tittel.${ledetekstKeySuffix}`)}</h3>
        <div dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.ettersending.info.tekst.${ledetekstKeySuffix}`)} />
        <Feilstripe vis={status === ETTERSEND_SOKNAD_FEILET} />
        <div className="knapperad">
            <Hovedknapp
                disabled={sender}
                spinner={sender}
                className="blokk--s"
                onClick={(e) => {
                    e.preventDefault();
                    if (manglendeDato === sendtTilNAVDato) {
                        doEttersendSoknadTilNav(sykepengesoknad.id);
                    } else {
                        doEttersendSoknadTilArbeidsgiver(sykepengesoknad.id);
                    }
                }}>
                {getLedetekst(`sykepengesoknad.ettersending.knapp.bekreft.${ledetekstKeySuffix}`)}
            </Hovedknapp>
            <p>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                    href="#"
                    className="lenke">Avbryt</a>
            </p>
        </div>
    </div>);
};

EttersendingDialog.propTypes = {
    onClose: PropTypes.func,
    sykepengesoknad: soknadPt,
    status: PropTypes.string,
    ledetekstKeySuffix: ledetekstKeySuffixPt,
    manglendeDato: manglendeDatoPt,
    doEttersendSoknadTilNav: PropTypes.func,
    doEttersendSoknadTilArbeidsgiver: PropTypes.func,
};

const mapStateToProps = state => ({
    status: selectEttersendSoknadStatus(state),
});

const actionCreators = {
    doEttersendSoknadTilNav: ettersendSoknadTilNav,
    doEttersendSoknadTilArbeidsgiver: ettersendSoknadTilArbeidsgiver,
};

export const EttersendDialogConnected = connect(mapStateToProps, actionCreators)(EttersendingDialog);
