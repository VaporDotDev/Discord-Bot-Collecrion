const Discord = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    exec(member) {
        const {user, guild} = member;

        // member.roles.add("")

        const leaveWebhook = new Discord.WebhookClient({
            id: "892717943786446849",
            token: "aCtlOQohRfnKDrgFVkqvCrwsWyXs_qkxOM3uhQ7eeMTwl5u89WNyMt77Aund-7iJ7WZI"
        })
        const Leave = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
            .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`
            ${member} has left the community.\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**.`)
            .setFooter(`ID: ${user.id}`)

        leaveWebhook.send({embeds: [Leave]})
    }
}