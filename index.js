require('advanced-logs');
require("dotenv");
require("./Functions/interactionCreate.js")

const { PermissionsBitField, EmbedBuilder, interaction } = require("discord.js")
const { ButtonStyle } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, MessageAttachment, ActivityType, TextInputBuilder, ModalBuilder, AttachmentBuilder } = require("discord.js");
const Discord = require('discord.js')
const { join } = require('path');
const { JsonDatabase } = require("five.db");
const db = new JsonDatabase({ databasePath: join(__dirname, './Database/herşeyin-database.json') });
console.setConfig({
    background: true,
    timestamp: false
}); 

const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.User,
        Partials.ThreadMember
    ],
    allowedMentions: {
        parse: [
            "everyone",
            "roles",
            "users"
        ]
    },
});

client.slashCommands = new Collection();
client.registerdCommands = new Collection();

const config = require("./config");

client.slashCommands = new Collection();
client.registeredCommands = new Collection();

const loadCommands = (folderPath) => {
    const commandFolders = fs.readdirSync(folderPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${folderPath}/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${folderPath}/${folder}/${file}`);
            client.slashCommands.set(command.config.name, command);
            client.registeredCommands.set(command.config.name, command.config);
            console.success(`${command.config.name} komutu başarıyla aktif edildi.`);
        }
    }
}

const loadEvents = () => {
    for (const event of fs.readdirSync("./Functions").filter(file => file.endsWith(".js"))) {
        const evt = require(`./Functions/${event}`);

        if (evt.config.once) {
            client.once(evt.config.name, (...args) => {
                evt.execute(client, ...args);
            });
        } else {
            client.on(evt.config.name, (...args) => {
                evt.execute(client, ...args);
            });
        }
    }
}

const slashCommandsRegister = () => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");

    client.once("ready", async() => {
        const rest = new REST({ version: "10" }).setToken(config.client.token);
      try {
        await rest.put(Routes.applicationCommands(config.client.id), {
          body: client.registeredCommands.toJSON(),
        }).then(() => {
            console.success(`${config.client.isim} Toplam Komutları: ${client.registeredCommands.size}`)
        });
      } catch (error) {
        throw error;
      }
    })};

loadCommands("./Commands");
loadEvents();
slashCommandsRegister();

process.on('unhandledRejection', err => {console.log(err)})
process.on('uncaughtException', err => {console.log(err)})
process.on('rejectionHandled', err => {console.log(err)})

client.on("ready", () => {
require('./Database/herşeyin-database.json')
console.warn(`Database'ler Başarıyla Hazırlandı!`)
})

client.login(config.client.token).then(() => {
    console.success(`${config.client.isim} Discord Evrenine Başarıyla Bağlandı!`);
}).catch((err) => {
    console.error(`${config.isimler} Bağlanamadı! ${err}`);
});

client.on("ready", () => {
  client.user.setActivity(`Developer For ${config.ownerad}`);
});

client.on("interactionCreate", async (i) => {
    if (!i.isButton()) return
    let id = i.customId
        const modal = new Discord.ModalBuilder()
            .setCustomId('modal')
            .setTitle(`Botunuzun ID'si`);

        const a = new Discord.TextInputBuilder()
            .setCustomId('naber')
            .setLabel("Botunuzun ID'sini Buraya Girin!")
            .setStyle(Discord.TextInputStyle.Short);
        const r = new Discord.ActionRowBuilder().addComponents(a);

        modal.addComponents(r);
        await i.showModal(modal)

        const collector = await i.awaitModalSubmit({ time: 60000 })
        let c = collector.fields.fields.get("naber").value
        if (c > 25 || c < 1 || isNaN(c))
        /*kanal.edit({ userLimit: collector.fields.fields.get("naber").value })*/
        collector.reply({ content: "Başarılı bir şekilde ayarlandı.", ephemeral: true })
        db.set(`botid_${interaction.user.id}`, )

    if (id == "botekle") {
    }
})