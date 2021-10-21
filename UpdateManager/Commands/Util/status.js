const {Client, MessageEmbed} = require('discord.js')
const {connection} = require("mongoose")
require("../../Events/Client/ready")

module.exports = {
    name: 'status',
    description: "Sends the client's ping",
    permission: "",
    async exec(interaction, client) {
        const Response = new MessageEmbed()
            .setColor('AQUA')
            .setDescription(`**Client**: ONLINE - ${client.ws.ping}ms \n**Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n**Database**: ${switchTo(connection.readyState)}`)
        interaction.reply({embeds: [Response]})
    }
}

function switchTo(val) {
    let status = " ";
    switch (val) {
        case 0:
            status = "DISCONNECTED"
            break
        case 1:
            status = "CONNECTED"
            break
        case 2:
            status = "CONNECTING"
            break
        case 3:
            status = "DISCONNECTING"
            break
    }
    return status
}