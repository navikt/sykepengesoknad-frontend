/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const proxy = require('http-proxy-middleware');
const fs = require('fs');

const app = express();
const port = 8085;


const jwt = fs.readFileSync('local-backend-proxy/jsonwebtoken.txt', 'utf8')
    .replace(/\n/g, '');

const addHeaders = (proxyReq) => {
    proxyReq.setHeader('Authorization', `Bearer ${jwt}`);
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    next();
});


app.use('/syfoapi/syfosoknad', proxy({
    target: 'http://localhost:7070',
    changeOrigin: true,
    pathRewrite: {'^/syfoapi/syfosoknad': '/syfosoknad'},
    onProxyReq: addHeaders,
}));

app.use('/syforest/sykmeldinger', proxy({
    target: 'http://localhost:7070',
    changeOrigin: true,
    pathRewrite: {'^/syforest/sykmeldinger': '/syfosoknad/api/sykmeldingmockup'},
    onProxyReq: addHeaders,
}));

app.all('/syfounleash', (req, res) => res.json({
    "syfo.syfofront.angre.bekreft.sykmelding": true,
    "syfo.syfofront.korriger.selvstendig.soknad": true,
    "syfo.ag.soknad.ny.platform": true,
    "syfo.syfofront.nytt.sykmeldingsmottak": true
}));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
