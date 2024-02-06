const {
    Interaction,
    SlashCommandBuilder,
    EmbedBuilder,
    time,
} = require("discord.js");
const { config } = require("../../config");
const logger = require("../../../utils/logger");
const os = require("os");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription(`View Liberation's stats!`),
    async execute(interaction: typeof Interaction) {
        // Defer
        await interaction.deferReply();

        // System information
        const osInfo = os.type();
        const cpuInfo = os.cpus()[0].model;
        const totalMemory = Math.round(os.totalmem() / (1024 * 1024));

        // Bot information
        const uptime = process.uptime();
        const formattedUptime = time(new Date(Date.now() - uptime * 1000), "R");
        const guilds = interaction.client.guilds.cache.size;
        const users = interaction.client.users.cache.size;
        const discordjsVersion = require("discord.js").version;
        const botVersion = "1.0.0";

        // Embed
        const statsEmbed = new EmbedBuilder()
            .setColor(config.colors.invis)
            .setTitle("Liberation bot stats")
            .addFields([
                {
                    name: "Bot",
                    value: `- Started: ${formattedUptime}
- Servers: \`${guilds}\`
- Users (cached): \`${users}\`
- Library: \`Discord.js v${discordjsVersion}\`
- Bot Version: \`${botVersion}\``,
                    inline: true,
                },
                {
                    name: "System",
                    value: `\
- OS: \`${osInfo}\`
- CPU: \`${cpuInfo}\`
- Memory: \`${totalMemory} MB\`
`,
                    inline: true,
                },
            ]);

        // Respond
        await interaction.editReply({ embeds: [statsEmbed] });
    },
};
