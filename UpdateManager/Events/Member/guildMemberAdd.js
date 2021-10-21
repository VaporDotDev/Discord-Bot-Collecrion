const Discord = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    exec(member) {
        const {user, guild} = member;

        // member.roles.add("")

        const welcomeWebhook = new Discord.WebhookClient({
            id: "892712796368830484",
            token: "f3gG4WfxbS68u5n_yBOASAuu8Y7JE74F_knCF6tRMGAdarecwtVFs1Ai7VOOSd8yzNX7"
        })
        const Welcome = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
            .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`
            Welcome ${member} to the **${guild.name}**!\n
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**.`)
            .setFooter(`ID: ${user.id}`)

        welcomeWebhook.send({embeds: [Welcome]})
    }
}