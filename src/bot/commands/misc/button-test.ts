/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {
    SlashCommandBuilder,
    EmbedBuilder,
    Interaction,
    ActionRowBuilder,
} = require("discord.js");
const { config } = require("../../config");
const logger = require("../../../utils/logger");
const { data } = require("../../components/buttons/test-button.ts")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("button-test")
        .setDescription(`temp command`),
    async execute(interaction: typeof Interaction) {
        // Grab client latency
        const latency = Math.abs(Date.now() - interaction.createdAt);

        // Row
        const row = new ActionRowBuilder().addComponents(data)

        // Reply
        await interaction.reply({ content: "test", components: [row] });

        logger.info(`Res ping -> latency of ${latency}ms`);
    },
};
