const dotenv = require('dotenv');
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');

dotenv.config();  // Using .env file

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'rules') {
        const embed = new EmbedBuilder()
            .setTitle("**RULES📕**")
            .setDescription("**Peraturan yang mohon diikuti @everyone**\n\u200B")  // '\u200B' adds a space between title and the first rule
            .setColor(0x50C878)
            .setThumbnail("https://raw.githubusercontent.com/jason32456/images/main/BSLC-logo.jpg");

        const rules_list = [
            "**1.** Server BSLC dikhususkan untuk semua elemen Nindya dan Mentor/Mentee Periode 2023/2024.",
            "**2.** Wajib menggunakan nama asli sebagai nickname di server.",
            "**3.** Mengedepankan prinsip kekeluargaan.",
            "**4.** Saling menghargai satu sama lain tanpa kompromi.",
            "**5.** Semua adalah teman dan saudara tanpa memandang sebelah mata.",
            "**6.** Menjaga kenyamanan sesama (menjaga privasi orang lain, menghargai sesama, dll).",
            "**7.** Jika terdapat kekeliruan antar sesama, diskusikan dengan kepala dingin."
        ];

        rules_list.forEach((rule) => {
            embed.addFields({ name: "\u200B", value: rule, inline: false });
        });

        embed.addFields({ name: "\u200B", value: "\n\u200B" })  // Adds a blank line before the footer
            .setFooter({ text: "These rules are subject to change. Last updated: March 12, 2024" });

        await interaction.reply({ embeds: [embed] });
    }
});

client.login(token);
