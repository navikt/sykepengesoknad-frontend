import { TagTyper } from '../../types/enums';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { hentGeneriskFeilmelding } from './sporsmal-utils';
import { tekst } from '../../utils/tekster';

test('Alle tags har global feilmelding', () => {
    let tags = Object.values(TagTyper);
    let manglerFeilmelding = false;

    tags = tags.filter(skipTag => {
        return skipTag !== TagTyper.VAER_KLAR_OVER_AT
            && skipTag !== TagTyper.PERMISJON_NAR
            && skipTag !== TagTyper.PERMISJON_NAR_V2
            && skipTag !== TagTyper.IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON
            && skipTag !== TagTyper.FERIE_NAR
            && skipTag !== TagTyper.FERIE_NAR_V2
            && skipTag !== TagTyper.ER_DU_SYKMELDT
            && skipTag !== TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER
            && skipTag !== TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO

            // TODO: Sjekk om disse faktisk ikke skal ha feilmelding
            && skipTag !== TagTyper.PERMITTERT_PERIODE_NAR
            && skipTag !== TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER_DAG_NAR
    });

    tags.forEach(tag => {
        if (tekst(`soknad.feilmelding.${tag}`) === undefined) {
            // eslint-disable-next-line no-console
            console.log('Mangler feilmelding for tag:', tag);
            manglerFeilmelding = true;
        }
    });

    expect(manglerFeilmelding).toBeFalsy();
});

test('Alle svartyper har generiskfeilmelding', () => {
    const svartyper = Object.values(RSSvartype);
    let manglerFeilmelding = false;

    svartyper.forEach(svartype => {
        if(hentGeneriskFeilmelding(svartype) === undefined) {
            // eslint-disable-next-line no-console
            console.log('Mangler generisk feilmelding for svartype:', svartype);
            manglerFeilmelding = true;
        }
    });

    expect(manglerFeilmelding).toBeFalsy();
});
