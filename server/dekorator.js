const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.DECORATOR_ENV,
        filePath: filePath,
        simple: 'true',
        chatbot: 'false',
        urlLookupTable: 'false',
    });

module.exports = getHtmlWithDecorator;
