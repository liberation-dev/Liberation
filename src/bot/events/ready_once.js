/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
