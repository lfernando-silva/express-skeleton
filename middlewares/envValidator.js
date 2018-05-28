const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const _ = require('lodash');
const os = require('os');

const processFileData = fileData => {
    const regexp = new RegExp(os.platform() === 'win32' ? '=xxx\\r\\n' : '=xxx\\n', 'g')
    return _.compact(fileData
        .replace(regexp, '#')
        .replace(/\r\n/g, '')
        .split('#'))
        .map(v => ({[v]: process.env[v]}))
        .concat(({NODE_ENV: process.env.NODE_ENV || 'development'}));
}

module.exports = async (req, res, next) => {
    try {
        const data = await fs.readFileAsync(path.join(__dirname, '..', '.env.example'), 'utf8');
        const variablesObject = {...processFileData(data)};
        _.forEach(variablesObject, (e, k) => {
            if (!e) throw new Error(`Env Variable ${k} is not defined`)
            return true
        });
        return next();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
