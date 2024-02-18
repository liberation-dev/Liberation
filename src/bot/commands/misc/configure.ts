/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {
    SlashCommandBuilder,
    EmbedBuilder,
    Interaction,
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");
const { config } = require("../../config");
const logger = require("../../../utils/logger");
const { GuildConfig } = require('../../database/schema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("configure")
        .setDescription(`Database test`)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel for the temp vc thing')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice))
        .addChannelOption(option =>
            option.setName('category')
                .setDescription('The category for the temp vc thing')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction: typeof Interaction) {
        const channel = interaction.options.getChannel('channel')
        const category = interaction.options.getChannel('category')

        const guildConfig = new GuildConfig({
            guildId: interaction.guildId,
            tempVoiceChannelId: channel.id,
            tempVoiceCategoryId: category.id
        })

        guildConfig.save();

        await interaction.reply('done');
    },
};
