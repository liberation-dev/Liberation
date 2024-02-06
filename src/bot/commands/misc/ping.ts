/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {
    SlashCommandBuilder,
    EmbedBuilder,
    Interaction,
} = require("discord.js");
const { config } = require("../../config");
const logger = require("../../../utils/logger");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription(`Pings Liberation!`),
    async execute(interaction: typeof Interaction) {
        // Grab client latency
        const latency = Math.abs(Date.now() - interaction.createdAt);

        // Make embed
        const pingReply = new EmbedBuilder()
            .setColor(config.colors.primary)
            .setTitle("Pong 🏓")
            .setDescription(`Latency: \`${latency}\`ms`);

        // Reply
        await interaction.reply({ embeds: [pingReply] });

        logger.info(`Res ping -> latency of ${latency}ms`);
    },
};
