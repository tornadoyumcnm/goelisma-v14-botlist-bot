const { Client, SlashCommandBuilder, Partials, GatewayIntentBits, StringSelectMenuBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const config = require('../../config.js')
const Discord = require('discord.js')
const { join } = require('path');
const { JsonDatabase } = require("five.db");
const db = new JsonDatabase({ databasePath: join(__dirname, '../../Database/herşeyin-database.json') });

module.exports.execute = async (client, interaction) => {

    const embed2 = new EmbedBuilder()
        .setDescription(`Bu komutu birtek <@${config.owners}> kullanabilir`)
        .setColor('Red')
    if (interaction.user.id !== `${config.owners}`) {
        return interaction.reply({ embeds: [embed2] })
    }
    let currentValue2 = db.fetch(`komutkullanim_${interaction.client.user.id}`) || `0`
    const embed = new EmbedBuilder()
        .setColor(`${config.client.görünmez_renk}`)
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setDescription(`### Aceth Botlist Bilgiler`)
        .addFields(
            { name: `🏆 | Sunucu Sayısı`, value: `\`${interaction.client.guilds.cache.size}\``, inline: true },
            { name: `🤷 | Kullanıcı Sayısı`, value: `\`${interaction.client.users.cache.size}\``, inline: true },
            { name: `🏓 | Ping Sayısı`, value: `\`${interaction.client.ws.ping}\``, inline: true },
            { name: `⚽ | Komut Kullanım S.`, value: `\`\`\`                    ${currentValue2}\`\`\``, inline: false },
        )
    interaction.reply({ embeds: [embed], ephemeral: false })

    let currentValue = db.get(`komutkullanim_${interaction.client.user.id}`) || 0;
    currentValue += 1;
    db.set(`komutkullanim_${interaction.client.user.id}`, currentValue);

},

    module.exports.config = {
        name: "bot-bilgi",
        description: "Botun Bilgilerine Bakarsın [Developer Özel]",
        options: []
    }