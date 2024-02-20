/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { Events, VoiceChannel } = require("discord.js");
const { config } = require("../config");
const { GuildConfig, TempVoice } = require("../database/schema")
const logger = require("../../utils/logger");

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel: typeof VoiceChannel) {
        await TempVoice.deleteMany({ voiceChannelId: channel.id });

        logger.info(`Voice channel deleted. ID: ${channel.id}`);
    },
};
