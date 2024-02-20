const { EmbedBuilder, Interaction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const config = require("../../config.ts");

module.exports = {
    selectMenu: () => {
        const select = new StringSelectMenuBuilder()
            .setCustomId('')
            .setPlaceholder('')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('')
                    .setDescription('')
                    .setValue(''),
                new StringSelectMenuOptionBuilder()
                    .setLabel('')
                    .setDescription('')
                    .setValue(''),
            );
        
        return select
    },
    async execute(interaction: typeof Interaction) {
        // Logic
    },
};
