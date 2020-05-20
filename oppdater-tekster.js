const path = require('path');
const fs = require('fs');
const http = require('http');

let alleTekster;
let req = http.get('https://syfoapi.nav.no/syfotekster/api/tekster', function(res) {
    let data = '';

    res.on('data', function(stream) {
        data += stream;
    });
    res.on('end', function() {
        alleTekster = JSON.parse(data);
    });
});

req.on('error', function(e) {
    console.log(e.message);
});

function filerEtterEndelse(base, endelse, filer, resultat) {
    filer = filer || fs.readdirSync(base);
    resultat = resultat || [];

    filer.forEach(
        function(file) {
            const nybase = path.join(base, file);
            if (fs.statSync(nybase).isDirectory() && file !== 'data') {
                resultat = filerEtterEndelse(nybase, endelse, fs.readdirSync(nybase), resultat)
            } else {
                if (file.substr(-1 * endelse.length) === endelse) {
                    resultat.push(nybase)
                }
            }
        }
    );
    return resultat;
}

const fil_liste = filerEtterEndelse('./src', '-tekster.ts');

/*
const innhold = fs.readFileSync('./' + fil_liste[0], 'utf8');
let netto = innhold.split('=')[1].split(';')[0];
netto = '[' + netto.replace(/'/g, '"') + "]";
console.log(netto);
const tekster = JSON.parse(netto);
*/

fil_liste.forEach(fil => {
    const innhold = fs.readFileSync('./' + fil, 'utf8');
    let netto = innhold.split('=')[1].split(';')[0];
    netto = netto.replace(/'/g, '"');
    const tekster = JSON.parse(netto);
    console.log(tekster.nb["sykepengesoknad-utland.tittel"])
});
