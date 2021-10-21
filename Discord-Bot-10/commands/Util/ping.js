const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: "Sends the client's ping",
    permission: "",
    exec(client, interaction) {
        const Response = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Bot Latency is ${Date.now() - interaction.createdTimestamp}ms. \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        interaction.reply({embeds: [Response]})
    }
}