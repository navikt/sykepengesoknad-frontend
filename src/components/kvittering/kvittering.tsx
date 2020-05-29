import React, { useEffect, useState } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Alertstripe, { AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Opplysninger from '../opplysninger/opplysninger';
import Oppsummering from '../oppsummering/oppsummering';
import { Knapp } from 'nav-frontend-knapper';
import { tekst } from '../../utils/tekster';
import Ettersending from '../status/ettersending';
import Vis from '../vis';
import env from '../../utils/environment';
import { FetchState, hasData } from '../../data/rest/utils';
import { RSSoknad } from '../../types/rs-types/rs-soknad';
import { Soknad } from '../../types/types';
import { getUrlTilSoknad } from '../../utils/url-utils';
import { logger } from '../../utils/logger';
import { useAppStore } from '../../data/stores/app-store';
import useFetch from '../../data/rest/use-fetch';
import { useHistory } from 'react-router';
import { SvarTil } from '../../types/enums';
import dayjs from 'dayjs';
import Utvidbar from '../utvidbar/utvidbar';
import plaster from '../opplysninger/plaster.svg';
import plasterHover from '../opplysninger/plaster-hover.svg';
import Lenke from 'nav-frontend-lenker';
import './kvittering.less';

const Kvittering = () => {
    const { valgtSoknad, soknader, setSoknader, feilmeldingTekst, setFeilmeldingTekst } = useAppStore();
    const korrigerSoknad = useFetch<RSSoknad>();
    const history = useHistory();
    const [ tilNavn, setTilNavn ] = useState<string>();
    const [ tilOrg, setTilOrg ] = useState<string>();
    const [ tilDato, setTilDato ] = useState<string>();

    useEffect(() => {
        let sendtTilNavn = valgtSoknad && valgtSoknad.arbeidsgiver && valgtSoknad.arbeidsgiver.navn
            ? valgtSoknad.arbeidsgiver.navn
            : SvarTil.NAV;
        if (sendtTilNavn === undefined) {
            sendtTilNavn = '';
        }
        setTilNavn(sendtTilNavn);

        const sendtTilOrgnr = valgtSoknad && valgtSoknad.arbeidsgiver && valgtSoknad.arbeidsgiver.orgnummer
            ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})`
            : ''
        setTilOrg(sendtTilOrgnr);

        const sendtTilDato = valgtSoknad && valgtSoknad.sendtTilArbeidsgiverDato
            ? valgtSoknad.sendtTilArbeidsgiverDato
            : valgtSoknad!.sendtTilNAVDato
        const dato = dayjs(sendtTilDato).format('dddd D. MMM, kl hh:mm');
        setTilDato(dato.charAt(0).toUpperCase() + dato.slice(1));
        // eslint-disable-next-line
    }, [])

    const korriger = () => {
        korrigerSoknad.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data);
                soknader.push(soknad);
                setSoknader(soknader);
                history.push(getUrlTilSoknad(soknad.id, undefined));
                setFeilmeldingTekst('');
            } else {
                logger.error('Feil ved opprettelse av UTKAST_TIL_KORRIGERING', fetchState);
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'));
            }
        });
    };

    return (
        <div>
            <AlertStripeSuksess>
                <Undertittel tag="h2">
                    {tekst('kvittering.soknaden-er-sendt-til')} {tilNavn} {tilOrg}
                </Undertittel>
                <Normaltekst>
                    {tekst('kvittering.mottatt')}: {tilDato}
                </Normaltekst>
            </AlertStripeSuksess>

            <Utvidbar className={'ekspander apen'}
                ikon={plaster} ikonHover={plasterHover} erApen={true}
                tittel={tekst('kvittering.hva-skjer-videre')}
                ikonAltTekst=''
            >
                <div className='opplysninger'>
                    <div className="avsnitt">
                        <Undertittel tag="h3">{tekst('kvittering.nav-behandler-soknaden')}</Undertittel>
                        <Normaltekst tag="span">{tekst('kvittering.saksbehandling-avhenger-av')} </Normaltekst>
                        <Lenke href={tekst('kvittering.finn-ut.url')}>
                            <Normaltekst tag="span">{tekst('kvittering.finn-ut')}</Normaltekst>
                        </Lenke>
                    </div>
                    <div className="avsnitt">
                        <Undertittel tag="h3">{tekst('kvittering.naar-blir-pengene')}</Undertittel>
                        <Normaltekst tag="span">{tekst('kvittering.det-er-ulike-regler')} </Normaltekst>
                        <Lenke href={tekst('kvittering.se-hva.url')}>
                            <Normaltekst tag="span">{tekst('kvittering.se-hva')}</Normaltekst>
                        </Lenke>
                    </div>
                    <div className="avsnitt">
                        <Undertittel tag="h3">{tekst('kvittering.viktig-for-arbeidstaker')}</Undertittel>
                        <Normaltekst tag="span">{tekst('kvittering.soker-du-etter')}</Normaltekst>
                        <Utvidbar erApen={false} tittel={tekst('kvittering.hva-er-arbeidsgiverperioden')} className="intern">
                            <AlertStripeInfo>
                                <Normaltekst>{tekst('kvittering.arbeidsgiveren-skal-betale')}</Normaltekst>
                            </AlertStripeInfo>
                        </Utvidbar>
                        <Utvidbar erApen={false} tittel={tekst('kvittering.hva-er-inntektsmelding')} className="intern">
                            <AlertStripeInfo>
                                <Normaltekst>{tekst('kvittering.digital-inntektsmelding')}</Normaltekst>
                            </AlertStripeInfo>
                        </Utvidbar>
                    </div>
                    <div className="avsnitt">
                        <Undertittel tag="h3">{tekst('kvittering.viktig-for-selvstendige')}</Undertittel>
                        <Normaltekst tag="span">{tekst('kvittering.for-at-nav.1')} </Normaltekst>
                        <Lenke href={tekst('kvittering.for-at-nav.2.url')} className="lenke">
                            <Normaltekst tag="span">{tekst('kvittering.for-at-nav.2')}</Normaltekst>
                        </Lenke>
                        <Normaltekst tag="span">{tekst('kvittering.for-at-nav.3')}</Normaltekst>
                    </div>
                </div>
            </Utvidbar>

            <Opplysninger ekspandert={false} />
            <Oppsummering />

            <div className='knapperad'>
                <Knapp mini type='standard' onClick={korriger}>{tekst('kvittering.knapp.endre')}</Knapp>

                <Ettersending gjelder='nav' />

                <Vis hvis={valgtSoknad!.arbeidsgiver !== undefined}>
                    <Ettersending gjelder='arbeidsgiver' />
                </Vis>
            </div>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst !== ''}>
                    <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                </Vis>
            </div>
        </div>
    )
};

export default Kvittering;
