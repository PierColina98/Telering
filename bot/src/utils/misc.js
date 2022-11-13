const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const logger = require('./logger');

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
module.exports.randomNum = randomNum;

const fileExists = async path => {
    const ok = !!(await fs.promises.stat(path).catch(e => false));
    if (!ok)
        throw new Error(`File: ${path} does not exists`);
}
module.exports.fileExists = fileExists;

const shuffleArray = arr => {
    const array = JSON.parse(JSON.stringify(arr));
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
module.exports.shuffleArray = shuffleArray;

const execSafely = async (script, logOutput = false, ignoreErr = true) => {
    logger.log(`running: '${script}'`);

    let stdout = null;
    let err = null;

    try {
        const res = await exec(script);

        if (res.stdout && res.stdout.length > 2)
            stdout = res.stdout;

        if (res.stderr && res.stderr.length > 2)
            err = res.stderr;
    }
    catch(e) {
        err = e;
    }

    if (logOutput) {
        console.log("stdout:")
        console.log(stdout);
        if (!ignoreErr) {
            console.log("stderr:")
            console.log(stderr);
            logger.error("Exception thrown inside 'execSafely()'", err);
        }
    }

    logger.empty();

    return stdout !== null || ignoreErr;
}
module.exports.execSafely = execSafely;