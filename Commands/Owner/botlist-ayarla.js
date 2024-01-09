const { Client, SlashCommandBuilder, Partials, GatewayIntentBits, StringSelectMenuBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const config = require('../../config.js')
const Discord = require('discord.js')
const { join } = require('path');
const { JsonDatabase } = require("five.db");
const db = new JsonDatabase({ databasePath: join(__dirname, '../../Database/herşeyin-database.json') });

module.exports.execute = async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) 
    return interaction.reply({ content: "Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.", ephemeral: true })

    const botlistkanal = interaction.options.getChannel('kanal');
    const logkanal = interaction.options.getChannel('log_kanal');
    const ytrol = interaction.options.getRole('yetkili_rol');
    const botrol = interaction.options.getRole('bot_rol');

    const embed = new EmbedBuilder()
        .setColor(`${config.client.görünmez_renk}`)
        .setDescription(`### Aceth BotList Ayarlama

:white_check_mark: | Başarı İle Botlist Kanalını ${botlistkanal} Olarak Ayarladın!

- diğer ayarlar:
>>> Log Kanal: ${logkanal}\nYetkili Rol: ${ytrol}\nBot Rol: ${botrol}`)
    interaction.reply({ embeds: [embed], ephemeral: false })
    db.set(`botlistkanal_${interaction.guild.id}`, botlistkanal.id);
    db.set(`logkanal_${interaction.guild.id}`, logkanal.id);
    db.set(`ytrol_${interaction.guild.id}`, ytrol.id);
    db.set(`botrol_${interaction.guild.id}`, botrol.id);

    let currentValue = db.get(`komutkullanim_${interaction.client.user.id}`) || 0;
    currentValue += 1;
    db.set(`komutkullanim_${interaction.client.user.id}`, currentValue);
    
    const button1 = new Discord.ButtonBuilder()
    .setCustomId("botekle")
    .setLabel("Botunu Eklet!")
    .setEmoji(`🆔`)
    .setStyle(Discord.ButtonStyle.Primary)
    const row = new Discord.ActionRowBuilder().addComponents(button1)

    const menu = new EmbedBuilder()
    .setColor(`${config.client.görünmez_renk}`)
    .setThumbnail(interaction.client.user.displayAvatarURL())
    .setDescription(`### Aceth BotList Sistemi
    
Selam, Botunu Sunucuya Mı Ekletmek İstiyorsun?
Tam Aradığın Yerdesin Dostum! Tek Yapman Gereken Şey
Aşşağıdaki Button'a Botunun **ID**'sini Atmak.`)
    botlistkanal.send({ embeds: [menu], components: [row] })

},

    module.exports.config = {
        name: "botlist-ayarla",
        description: "altyazı",
        options: [
            {
                name: 'kanal',
                description: 'BotList Hangi Kanalda Olsun?',
                type: 7,
                required: true,
            },
            {
                name: 'log_kanal',
                description: `BotList LOG'u Hangi Kanalda Olsun?`,
                type: 7,
                required: true,
            },
            {
                name: 'yetkili_rol',
                description: 'Yetkili Rolü Ne Olsun?',
                type: 8,
                required: true,
            },
            {
                name: 'bot_rol',
                description: 'Bot Rolü Ne Olsun?',
                type: 8,
                required: true,
            },
        ]
    };