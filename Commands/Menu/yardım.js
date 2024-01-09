const { Client, SlashCommandBuilder, Partials, GatewayIntentBits, StringSelectMenuBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, Events, EmbedBuilder} = require('discord.js');
const config = require('../../config.js')
const Discord = require('discord.js')
const { join } = require('path');
const { JsonDatabase } = require("five.db");
const db = new JsonDatabase({ databasePath: join(__dirname, '../../Database/herşeyin-database.json') });

module.exports.execute = async(client, interaction) => {

const embed = new EmbedBuilder()
.setColor(`${config.client.görünmez_renk}`)
.setDescription(`### Aceth Botlist Yardım Menüsü`)
.setImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmh6YW82dWRwbGgzaWVscDN4MDFkaXdzZ2oxN3hzMDdxMDN6cGs3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XedwBgtVcjuzKjM4P8/giphy.gif')
interaction.reply({ embeds: [embed], ephemeral: false })

let currentValue = db.get(`komutkullanim_${interaction.client.user.id}`) || 0;
currentValue += 1;
db.set(`komutkullanim_${interaction.client.user.id}`, currentValue);

},

module.exports.config = {
    name: "yardım",
    description: "Yardım Menüsüdür.",
    options: []
}