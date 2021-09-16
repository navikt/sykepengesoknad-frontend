const { injectDecoratorServerSide } = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
    env: 'prod',
    filePath: filePath
  });

module.exports = getHtmlWithDecorator;
