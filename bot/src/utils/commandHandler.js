const misc = require("./misc");
const dateTime = require("./dateTime");
const envs = require("../../env");
const path = require("path");
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const camera = require("./camera");
const logger = require("./logger");

const dict = {
    hello: x => () => {
        return x.reply(`hello there! here is a random num: ${misc.randomNum(0, 100)}`);
    },

    img: x => async () => {
        let picPath = null;
        let isSamplePic = true;

        try {
            const tempPath = await camera.takePicture();
            picPath = tempPath;
            isSamplePic = false;
        }
        catch (e) {
            logger.error(`Error taking picture 😵`, e);
            picPath = path.join(__dirname, "..", "..", "sample-img.png");
        }

        const file = new AttachmentBuilder(picPath);
        const embed = new EmbedBuilder()
            .setTitle(`Door bell rang at ${dateTime.ecuadorIsoString(null, true)}`)
            .setImage(`attachment://img.${isSamplePic ? "png" : "jpg"}`);

        await x.channel.send({ embeds: [embed], files: [file] });

        if (!isSamplePic) {
            await misc.execSafely(`rm -r ${picPath}`);
        }
    }
};

module.exports = async x => {
    let content = x.content.toLowerCase();
    if (content.includes("error") || !content.includes(envs.specialChar))
        return;

    content = content.replaceAll(envs.specialChar, "");

    const f = dict.hasOwnProperty(content)
        ? dict[content](x)
        : () => x.reply(`ERROR: no me se el comando '${content}'`);

    try {
        await f();
        logger.log(`command '${content}' ran successfully 😎`);
    }
    catch (e) {
        logger.error(`Error running command '${content}'`, e);
    }

    logger.empty();
};