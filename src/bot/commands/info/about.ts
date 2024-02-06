const {
    Interaction,
    SlashCommandBuilder,
    EmbedBuilder,
    time,
} = require("discord.js");
const { config } = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription(`About Liberation!`),
    async execute(interaction: typeof Interaction) {
        // Defer
        await interaction.deferReply();

        // Embed
        const aboutEmbed = new EmbedBuilder()
            .setColor(config.colors.invis)
            .setTitle("Liberation")
            .setDescription("A bot that provides temporary voice channels, temporary text channels, and tickets on a single package. ")
            .addFields([
                {
                    name: "The Libera-Team",
                    value: `**[jbcarreon123](https://github.com/jbcarreon123)** *(Lead Developer)*
**[Gowthr](https://github.com/gowthr)** *(Lead Developer & Designer)*
**[JadenLabs](https://github.com/JadenLabs)** *(Lead Developer)*
**[MooreGaming1324](https://github.com/MooreGaming1324)** *(Administrator)*`,
                    inline: true,
                },
                {
                    name: "Links",
                    value: `[GitHub Repo](https://github.com/liberation-dev/Liberation)
[Ko-Fi](https://ko-fi.com/liberationdev)`,
                    inline: true,
                },
            ]);

        // Respond
        await interaction.editReply({ embeds: [aboutEmbed] });
    },
};
