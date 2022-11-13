const misc = require('./misc');
const logger = require('./logger');
const envs = require("../../env");

const takePicture = async (path = null, logOutput = false) => {
    const nums = new Date().getMilliseconds() + "";
    const p = path || `${__dirname}/img${misc.shuffleArray(nums.split("")).join("")}.jpg`;

    const script = envs.deployedInRaspberry
        ? `raspistill -n -w 1280 -h 720 -o ${p}`
        : `ffmpeg -ss 0.5 -f avfoundation -framerate 30 -i "0" -t 1 ${p}`;

    await misc.execSafely(script, logOutput);

    await misc.fileExists(p);

    logger.log(`picture taken successfully 😎`);

    return p;
};
module.exports.takePicture = takePicture;