import type { CategoryChannel } from "discord.js";

const { Events, ActivityType, ChannelType, Member } = require("discord.js");
const config = require("../config");
const logger = require("../../utils/logger");
const { GuildConfig, TempVoice } = require("../database/schema")

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
            GuildConfig.find({ guildId: guild.id })
            .then(async res => {
              if (res) {
                const pGuild = res[0]

                if (pGuild.tempVoiceChannelId == newState.channelId) {
                    const channel = await guild.channels.create({ name: `${member.user.username}'s party`, type: ChannelType.GuildVoice })
                    await channel.setParent(pGuild.tempVoiceCategoryId)

                    const tempVoice = new TempVoice({
                        guildId: guild.id,
                        voiceChannelId: channel.id,
                        ownerId: member.user.id
                    })

                    tempVoice.save()

                    member.voice.setChannel(channel, 'Created party VC')
                }
              }
            })
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
