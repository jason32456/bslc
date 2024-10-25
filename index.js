const dotenv = require('dotenv');
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');

dotenv.config();  

const token = process.env.DISCORD_TOKEN;
const channelId = process.env.WELCOME_CHANNEL_ID;

const channelMention = `<#${channelId}>`;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ],
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('guildMemberAdd', (member) => {
    const welcomeChannelId = channelId; 
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    if (welcomeChannel) {
        
        const welcomeEmbed = new EmbedBuilder()
            .setColor(0x50C878)  
            .setTitle('Welcome to the BSLC📚 Server! 🎉, where we make learning fun🙌')
            .setDescription(`Hello, ${member}! We're so glad to have you here. Feel free to introduce yourself and join the fun!`)
            .setThumbnail(member.user.displayAvatarURL())  
            .setFooter({ text: `Welcome to the server, ${member.user.tag}` });

        welcomeChannel.send({ embeds: [welcomeEmbed] });
    } else {
        console.log("Welcome channel not found.");
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'rules') {
        const embed = new EmbedBuilder()
            .setTitle("**RULES📕**")
            .setDescription("**Peraturan yang mohon diikuti @everyone**\n\u200B")  
            .setColor(0x50C878)
            .setThumbnail("https://raw.githubusercontent.com/jason32456/images/main/BSLC-logo.jpg");

        const rules_list = [
            "**1.** Server BSLC ini terbuka untuk seluruh mahasiswa/i BINUS University All Region, Angkatan, dan Fakultas.",
            "**2.** Temen-temen bisa rename server profile menggunakan Nama Asli atau Nickname kalian.",
            "**3.** Mengedepankan prinsip kekeluargaan.",
            "**4.** Saling menghargai satu sama lain tanpa kompromi.",
            "**5.** Semua adalah teman dan saudara tanpa memandang sebelah mata.",
            "**6.** Jika terdapat kekeliruan antar sesama, diskusikan dengan kepala dingin.",
            "**7.** Kita disini bersama-sama belajar, sharing, dan bercanda bersama dengan tetap sopan satu terhadap yang lain.",
            "**8.** Jangan mengganggap diri superioritas, tetap rendah hati, dan saling support satu sama lain.",
            "**9.** Last but not least, always remember: Learning is Fun!"
        ];

        rules_list.forEach((rule) => {
            embed.addFields({ name: "\u200B", value: rule, inline: false });
        });

        embed.addFields({ name: "\u200B", value: "\n\u200B" }) 
            .setFooter({ text: "These rules are subject to change. Last updated: March 12, 2024" });

        await interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === 'guidelines') {
        const embed = new EmbedBuilder()
            .setColor(0x50C878)
            .setTitle('Server Guidelines')
            .setThumbnail("https://raw.githubusercontent.com/jason32456/images/main/BSLC-logo.jpg")
            .addFields(
                { name: '1. Channel Rules', value: 'Baca aturan di <#1297102928590409799>' },
                { name: '2. Category BSLC', value: 'Semua informasi tentang BSLC, mulai dari Responsi BSLC, Seminar, Workshop, Partnership, dan Website BSLC' },
                { name: '3. bot-command', value: 'Untuk menuliskan prompt bot yang digunakan' },
                { name: '4. Voice Channel', value: 'Bebas digunakan' },
                { name: '5. Learning Hub', value: 'Jika ada yang ingin belajar bareng, diskusi, sharing materi dll bisa di sana' },
                { name: '6. BSLC Forum', value: 'Kalau ada yang punya Pertanyaan dll bisa ditanya aja di forum' },
                { name: '7. Chillin Hub', value: 'Bebas mau chat untuk cari temen dan sosialisasi sesuai category channel-nya' },
                { name: '8. Jangan lupa pilih role', value: 'Pilih role (Angkatan, Region, dan Fakultas)' }
            )
            .setFooter({ text: 'Follow these guidelines to maintain a great community experience!' });

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
});

client.login(token);
