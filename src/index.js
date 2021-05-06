const fs = require('fs');

// BEGIN
const path = require('path');

const getPath = (fileName) => path.resolve(__dirname, '../__fixtures__/', fileName);

const upVersion = (fileName, type = 'patch') => {
    const fullFileName = getPath(fileName);
    let file;
    try {
        file = fs.readFileSync(fullFileName);
    } catch (e) {
        throw new Error('You missed pass file name for versioning up!');
    }
    const text = JSON.parse(file);
    const oldVersion = text?.version;
    if (!oldVersion) {
        throw new Error('Wrong content in file');
    }

    let newVersion;
    const [major, minor, patch] = oldVersion.split('.');

    switch (type) {
        case 'patch':
            newVersion = `${major}.${minor}.${Number(patch) + 1}`;
            break;
        case 'minor':
            newVersion = `${major}.${Number(minor) + 1}.0`;
            break;
        case 'major':
            newVersion = `${Number(major) + 1}.0.0`;
            break;
        default:
            throw new Error('unknown type for up version');
    }

    fs.writeFileSync(
        fullFileName,
        JSON.stringify({ ...text, version: newVersion }),
        'utf-8',
    );
};

// END

module.exports = { upVersion };
