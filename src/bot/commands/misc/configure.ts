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
        .setDescription("Configure Liberation")
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel for the temp vc thing')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice))
        .addChannelOption(option =>
            option.setName('category')
                .setDescription('The category for the temp vc thing')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false),
    async execute(interaction: typeof Interaction) {
        const channel = interaction.options.getChannel('channel')
        const category = interaction.options.getChannel('category')

        const guildConfig = new GuildConfig({
            guildId: interaction.guildId,
            tempVoiceChannelId: channel.id,
            tempVoiceCategoryId: category.id
        })

        guildConfig.save();

        const configureReply = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle("Liberation configured!")
            .addFields([
                {
                    name: "Create a Temp VC channel",
                    value: `${channel}`,
                    inline: true
                },
                {
                    name: "Temp VC category",
                    value: `${category}`,
                    inline: true
                }
            ]);


        await interaction.reply({ embeds: [ configureReply ], ephemeral: true });
    },
};
