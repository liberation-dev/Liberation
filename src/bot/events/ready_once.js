const { Events, ActivityType } = require("discord.js");
const config = require("../config");
const logger = require("../../utils/logger");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        logger.info(`Logged in as ${client.user.tag}`);

        client.user.setPresence({
            activities: [
                {
                    name: "Lorem Ipsum",
                    type: ActivityType.Custom,
                },
            ],
            status: "online",
        });
    },
};
