const Discord = require('discord.js')
const {Channel} = require("discord.js");

module.exports = {
    name: 'purge',
    description: "Purges the chat",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "amount",
            type: "NUMBER",
            description: "The amount of chats that will be deleted",
            required: true
        },
        {
            name: "target",
            description: "Select a user to clear their messages.",
            type: "USER",
            required: false
        }],
    async exec(client, interaction) {

        const amount = interaction.options.getNumber('amount')
        const target = interaction.options.getMember('target')
        const channel = interaction.channel;
        const messages = channel.messages.fetch();

        const Response = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`**${amount}** messages deleted in **#${interaction.channel.name}** \nDeleted by ${interaction.user.tag}`)

        if (amount > 100) {
            const reply = await interaction.channel.send("You cannot delete more than 400 chat messages at one time.")
            setTimeout(() => reply.delete(), 5000)
        } else if (target) {
            const targetMessages = (await messages).filter((m) => m.author.id === target.id)
            await channel.bulkDelete(targetMessages, true)
            const reply = await interaction.channel.send({embeds: [Response]})
            setTimeout(() => reply.delete(), 5000)
        } else if (!target) {
            await channel.bulkDelete(amount, true)
            const reply = await interaction.channel.send({embeds: [Response]})
            setTimeout(() => reply.delete(), 5000)
        }
    }
}