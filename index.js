const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, GuildInvites } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel, Reaction } = Partials

const { loadConfig } = require("./Functions/configLoader");
const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');
const client = new Client ({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, GuildInvites],
    partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction]
});

client.config = require("./config.json")
client.commands = new Collection();
client.guildConfig = new Collection();

const { connect } = require("mongoose")
connect(client.config.DBURL, {}).then(() => console.log("The client is now connected to the database."))
 
client.login(client.config.token).then(() => {
    loadEvents(client)
    loadCommands(client)
    loadConfig(client)
});