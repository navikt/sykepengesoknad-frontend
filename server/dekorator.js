const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: 'prod',
        filePath: filePath,
        simple: 'true',
        chatbot: 'false',
        urlLookupTable: 'false',
    });

module.exports = getHtmlWithDecorator;
