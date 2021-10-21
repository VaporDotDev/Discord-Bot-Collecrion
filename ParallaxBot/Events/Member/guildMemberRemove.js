const Discord = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    exec(member) {
        const {user, guild} = member;

        // member.roles.add("")

        const leaveWebhook = new Discord.WebhookClient({
            id: "894906828599722015",
            token: "1SC2rDCv02TeZccSDYRPfHZUQwhKIa6YMHuYVajWvv5LJj5fqRqMgz62DJfKuM5hJAfJ"
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