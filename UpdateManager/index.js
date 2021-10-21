console.clear();
const {Client, Collection} = require("discord.js");
const client = new Client({intents: 32767});
module.exports = client;
const {Token} = require("./Data/config.json");

client.commands = new Collection();

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token);