const { Events, ActivityType, ChannelType, Member } = require("discord.js");
const config = require("../config");
const logger = require("../../utils/logger");

module.exports = {
    name: Events.VoiceStateUpdate,
    // once: true,
    async execute(oldState: typeof Member, newState: typeof Member) {
        const { member, guild } = newState;

        // Joined
        if (newState.channelId && newState.channelId !== oldState.channelId) {
            logger.info(
                `${member.user.username} joined ${newState.channel.name}`
            );

            // TODO: add party creation logic
        }

        // Left
        if (oldState.channelId && !newState.channelId) {
            logger.info(
                `${member.user.username} left ${oldState.channel.name}`
            );

            // TODO: add party deletion logic
        }
    },
};
