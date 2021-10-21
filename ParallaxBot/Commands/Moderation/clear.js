const Discord = require('discord.js')

module.exports = {
    name: "clear",
    description: "Clears a specified amount of chat from a channel or a target",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "amount",
            description: "Select an amount of messages to clear.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select a target",
            type: "USER",
            required: false
        }
    ],

    async exec(interaction) {
        const amount = interaction.options.getNumber("amount")
        const target = interaction.options.getMember("target")

        const messages = await interaction.channel.messages.fetch()

        const Response = new Discord.MessageEmbed()
            .setColor("RED")

        if(amount > 100 || amount <= 0) {
            Response.setDescription(`Amount cannot exceed 100, and cannot be under 1.`)
            return interaction.reply({embeds: [Response]})
            setTimeout(() => interaction.deleteReply(), 5000)
        }
        if (target) {
            let i = 0
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m)
                    i++
                }
            })
            await interaction.channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`Cleared ${messages.size} from ${target}.`)
                interaction.reply({embeds: [Response]})
                setTimeout(() => interaction.deleteReply(), 5000)
            })
        } else {
            await interaction.channel.bulkDelete(amount, true).then(messages => {
                Response.setDescription(`Cleared ${messages.size} from this channel.`)
                interaction.reply({embeds: [Response]})
                setTimeout(() => interaction.deleteReply(), 5000)
            })
        }
    }
}