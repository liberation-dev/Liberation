/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { Events, EmbedBuilder } = require("discord.js");
const config = require("../config");
const logger = require("../../utils/logger");

module.exports = {
    name: Events.InteractionCreate,
    // once: true,
    async execute(interaction) {
        const interactionName =
            (await interaction.commandName) ?? interaction.customId;
        const interactionSource = interaction.guild
            ? interaction.guild.id
            : "DM";

        logger.info(
            `Run ${interactionName} -> ${interaction.user.username} (${interaction.user.id}) from ${interactionSource}`
        );

        try {
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(
                    interaction.commandName
                );

                if (!command) {
                    console.error(
                        `No command matching ${interaction.commandName} was found.`,
                        { interaction: interaction.commandName }
                    );
                    return;
                }

                try {
                    await command.execute(interaction);
                } catch (error) {
                    console.error(
                        `Error executing ${interaction.commandName} - ${error}`,
                        {
                            interaction: interaction.commandName,
                        }
                    );
                    console.log(error.message);
                    console.log(error.stack);
                }
            } else if (interaction.isButton()) {
                const button = interaction.client.buttons.get(
                    interaction.customId
                );

                if (button) {
                    try {
                        await button.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        interaction.reply({
                            content: "Error executing the button command.",
                            ephemeral: true,
                        });
                    }
                }
            } else if (interaction.isRoleSelectMenu()) {
            } else if (interaction.isChannelSelectMenu()) {
            } else if (interaction.isModalSubmit()) {
                const modal = interaction.client.modals.get(
                    interaction.customId
                );
                if (modal) {
                    try {
                        await modal.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        interaction.reply({
                            content: "Error executing the modal command.",
                            ephemeral: true,
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`Error executing ${interactionName} - ${error}`, {
                interaction: interactionName,
            });
            console.log(error.message);
        }

        logger.info(
            `Ran ${interactionName} -> ${interaction.user.username} (${interaction.user.id}) from ${interactionSource}`
        );
    },
};
