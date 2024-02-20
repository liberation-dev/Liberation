const { ButtonBuilder, ButtonStyle, Interaction } = require("discord.js");
const config = require("../../config.ts");

module.exports = {
    button: new ButtonBuilder()
        .setLabel("Poke")
        .setCustomId("test-button")
        .setStyle(ButtonStyle),
    async execute(interaction: typeof Interaction) {
        await interaction.reply("hello");
    },
};
