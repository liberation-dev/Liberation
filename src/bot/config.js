const { key: botKey } = require("./keys/bot_key.json");

class Config {
    constructor() {
        this.keys = {
            botKey,
        };

        this.botID = "1189193161222926426";

        this.colors = {
            primary: "",
            secondary: "",
            neutral: "",
            success: "",
            error: "",
            invis: "#2B2D31",
        };

        this.emojis = {};

        this.ids = {
            roc: "1027380375028244551",
        };
    }
}

const config = new Config();

module.exports = config;
