const Discord = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    exec(member) {
        const {user, guild} = member;

        // member.roles.add("")

        const welcomeWebhook = new Discord.WebhookClient({
            id: "894906828599722015",
            token: "1SC2rDCv02TeZccSDYRPfHZUQwhKIa6YMHuYVajWvv5LJj5fqRqMgz62DJfKuM5hJAfJ"
        })
        const Welcome = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`
        Welcome ${member} to the **${guild.name}** Discord Server! Make sure to check out the tagged channels to get invloved!
        \n **Current Member Count:** \`\`${guild.memberCount}\`\``)
            .addFields(
                {name: "📕 Rules", value: "<#>", inline: true},
                {name: "🌟 Roles", value: "<#894907471179706368>", inline: true},
                {name: "💬 General", value: "<#>", inline: true}
            )
            .setFooter(`ID: ${user.id}`)

        welcomeWebhook.send({embeds: [Welcome]})
    }
}