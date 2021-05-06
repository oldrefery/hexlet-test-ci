const fs = require('fs');
const path = require('path');
const { upVersion } = require('../src/index.js');

// BEGIN
const getPath = (fileName) => path.resolve(__dirname, '../__fixtures__/', fileName);

const getNewVersion = (fileName) => {
    const fullFileName = getPath(fileName);
    const text = fs.readFileSync(fullFileName, 'utf-8');
    const newVersion = JSON.parse(text).version;
    return newVersion;
};

describe('upVersion', () => {
    const fileName = './package.json';

    test('when pass a wrong filename, get error', () => {
        expect(() => upVersion('unknown file')).toThrowError();
    });

    test('Wrong content file', () => {
        expect(() => upVersion('./wrongPackage.json')).toThrowError(
            'Wrong content in file',
        );
    });

    test('when pass wrong type, get error', () => {
        expect(() => {
            upVersion(fileName, 'super');
        }).toThrowError('unknown type for up version');
    });

    test('when run without type, changing has to be patch', () => {
        upVersion(fileName);
        expect(getNewVersion(fileName)).toBe('1.3.3');
    });

    test('when run with minor', () => {
        upVersion(fileName, 'minor');
        expect(getNewVersion(fileName)).toBe('1.4.0');
    });

    test('when run with major', () => {
        upVersion(fileName, 'major');
        expect(getNewVersion(fileName)).toBe('2.0.0');
    });

    test('when run with patch', () => {
        upVersion(fileName, 'patch');
        expect(getNewVersion(fileName)).toBe('1.3.3');
    });
});

beforeAll(() => {
    const fullFilename = path.resolve(
        __dirname,
        '../__fixtures__/',
        'wrongPackage.json',
    );
    fs.writeFileSync(fullFilename, '{"Wersion":"1.3.2"}');
});

beforeEach(() => {
    const fullFilename = path.resolve(
        __dirname,
        '../__fixtures__/',
        'package.json',
    );
    fs.writeFileSync(fullFilename, '{"version":"1.3.2"}');
});


// END
