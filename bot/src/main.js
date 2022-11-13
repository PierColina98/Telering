const envs = require("../env");
const logger = require("./utils/logger");
const commandHandler = require("./utils/commandHandler");
const Discord = require("discord.js");
const { Client, GatewayIntentBits} = Discord;
const client = new Client({
    intents: [
        ...Object.values(GatewayIntentBits)
    ]
});

client.on("ready", () => {
    logger.log(`discord client ready 😎`);
    logger.log(`logged as user: ${client.user.tag}`);
});

client.on("messageCreate", commandHandler);

async function m() {
    try {
        await client.login(envs.botToken);
        logger.log(`login ok ✅`);
    }
    catch (e) {
        logger.error("Bot Error", e);
    }
}

m();