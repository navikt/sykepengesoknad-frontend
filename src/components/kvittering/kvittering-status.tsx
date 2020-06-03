import React, { useEffect, useState } from 'react';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import { tekst } from '../../utils/tekster';
import { SvarTil } from '../../types/enums';
import dayjs from 'dayjs';

const KvitteringStatus = () => {
    const { valgtSoknad } = useAppStore();
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

    return (
        <AlertStripeSuksess>
            <Undertittel tag="h2">
                {tekst('kvittering.soknaden-er-sendt-til')} {tilNavn} {tilOrg}
            </Undertittel>
            <Normaltekst>
                {tekst('kvittering.mottatt')}: {tilDato}
            </Normaltekst>
        </AlertStripeSuksess>
    );
};

export default KvitteringStatus;
