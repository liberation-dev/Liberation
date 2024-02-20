const { ButtonBuilder, ButtonStyle, Interaction } = require("discord.js");
const config = require("../../config.ts");

module.exports = {
    button: new ButtonBuilder()
        .setLabel("label")
        .setCustomId("id")
        .setStyle(ButtonStyle),
    async execute(interaction: typeof Interaction) {
        // Logic
    },
};
