
const { loadParser, createBase, getOutput } = require('./utils/parser');
const { read, fixHtml } = require('./utils');

function crawl() {
    return read('./data/test.html')
        .then(fixHtml)
        .then(loadParser)
        .then(createBase)
        .then(getOutput);
}

crawl()
    .then(output => console.log(JSON.stringify(output)))
    .catch(console.log)