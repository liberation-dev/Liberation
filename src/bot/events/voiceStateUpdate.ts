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

            GuildConfig.find({ guildId: guild.id })
            .then(async res => {
            if (res) {
                const pGuild = res[0]

                if (pGuild && pGuild.tempVoiceChannelId == newState.channelId) {
                    const channel = await guild.channels.create({ name: `${member.user.username}'s party`, type: ChannelType.GuildVoice })
                    await channel.setParent(pGuild.tempVoiceCategoryId)

                    const tempVoice = new TempVoice({
                        guildId: guild.id,
                        voiceChannelId: channel.id,
                        ownerId: member.user.id
                    })

                    tempVoice.save()

                    await member.voice.setChannel(channel, 'Created party VC')
                        .catch(error => {
                            logger.warn(`Error occured while switching user to party VC: ${error}`)
                        });
                }
            }
            })
        }

        // Left & Switched
        if (oldState.channelId) {
            logger.info(
                `${member.user.username} left ${oldState.channel.name}`
            );

            // TODO: add party deletion logic
            TempVoice.find({ voiceChannelId: oldState.channelId })
            .then(async res => {
            if (res) {
                if (res[0] && res[0].voiceChannelId === oldState.channelId) {
                    if (oldState.channel.members.size < 1) {
                        await oldState.channel.delete();
                    }
                }
            }
            })
        }
    },
};
