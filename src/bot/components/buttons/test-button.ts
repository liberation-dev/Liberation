const { ButtonBuilder, ButtonStyle, Interaction } = require("discord.js");
const config = require("../../config.ts");

module.exports = {
    data: new ButtonBuilder()
        .setLabel("Poke")
        .setCustomId("test-button")
        .setStyle(ButtonStyle.Primary),
    async execute(interaction: typeof Interaction) {
        await interaction.update("hello");
    },
};
