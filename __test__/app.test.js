const { loadParser, createBase, getOutput } = require('./../utils/parser');
const { read, fixHtml } = require('./../utils');
const expected = require('./../data/test-result');

describe('Read File', () => {
    test('Read inexistent file', () => {
        expect.assertions(1);
        return expect(read('./data/fakeFile.html')).rejects.toEqual("Failed to read the file");
    });
    test('Read html file', () => {
        expect.assertions(1);
        return expect(read('./data/test.html')).resolves.toBeDefined();
    });
});
describe('Convert Input into valid HTML', () => {
    test('Fix HTML format', () => {
        expect.assertions(1);
        return read('data/test.html')
            .then(html => expect(fixHtml(html)).toBeDefined());
    });
});
describe('Start parser', () => {
    test('loadParser with plain html', () => {
        expect.assertions(1);
        return expect(loadParser('<div>Alberto Nebot</div>')).toBeInstanceOf(Function);
    });
});
describe('Parse Base elements', () => {
    test('Create Base', () => {
        expect.assertions(1);
        return read('data/test.html')
            .then(loadParser)
            .then($ => expect(createBase($)).toBeInstanceOf(Object));
    });
});

describe('Get output', () => {
    test('getOutput', () => {
        expect.assertions(1);
        return read('./data/test.html')
            .then(fixHtml)
            .then(loadParser)
            .then(createBase)
            .then(base => expect(getOutput(base)).toEqual(expected));
    });
});
