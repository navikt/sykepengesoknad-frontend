import { TagTyper } from '../../types/enums';
import tekster from './sporsmal-tekster';

it('Alle tags har global feilmelding', async() => {
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
    });

    tags.forEach(tag => {
        if (tekster[`soknad.feilmelding.${tag}`] === undefined) {
            console.log('Mangler feilmelding for tag:', tag);
            manglerFeilmelding = true;
        }
    });

    expect(manglerFeilmelding).toBe(false);
});
