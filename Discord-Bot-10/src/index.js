const {Client, Collection} = require('discord.js')
const client = new Client({intents: 32767})
module.exports = client;
const Config = require("./Data/config.json")

client.commands = new Collection();

console.clear();

['Events', 'Commands'].forEach(handler => {
    require(`./Handlers/${handler}`)(client)
})

client.login(Config.token)