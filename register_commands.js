const dotenv = require('dotenv');
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

dotenv.config(); 

const botToken = process.env.DISCORD_TOKEN;
const botID = process.env.BOT_ID;
const guildID = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(botToken);

const slashRegister = async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(botID, guildID),
            {
                body: [
                    new SlashCommandBuilder()
                        .setName('rules')
                        .setDescription('send rules'),
                    new SlashCommandBuilder()
                        .setName('guidelines')
                        .setDescription('send guidelines')
                ]                
            }
        );
        console.log('Slash command registered successfully!');
    } catch (error) {
        console.error('Error registering slash command:', error);
    }
};

slashRegister();
