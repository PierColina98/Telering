const dateTime = require("./dateTime");

const logger = {
    empty: (n = 1) => {
        for (let i = 0; i < n; i++) {
            console.log("");
        }
    },

    log: str => console.log(`${dateTime.ecuadorIsoString(null, true)} | LOG | ${str}`),

    error: (str, e) => {
        console.error(`${dateTime.ecuadorIsoString(null, true)} | ERROR | ${str}`);
        if (e) console.log(e);
        console.log("");
    }
};

module.exports = logger;