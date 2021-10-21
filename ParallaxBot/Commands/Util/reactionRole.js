const Discord = require('discord.js')

module.exports = {
    name: 'reactionroles',
    description: "Sends the reaction role message",
    permission: "ADMINISTRATOR",
    async exec(interaction, client) {

        const DarkRP = interaction.guild.roles.cache.find(role => role.id === "890633923737030676");
        const CWRP = interaction.guild.roles.cache.find(role => role.id === "890633968226029640");
        const MilRP = interaction.guild.roles.cache.find(role => role.id === "890677330270375996");


        const Response = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Server Updates')
            .setDescription('Please use the buttons below to opt-in for server updates. \nThe grey buttons below will link you to each of the server discords.')


        const serverGameUpdates = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('darkrpRole')
                    .setLabel('DarkRP')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId('cwrpRole')
                    .setLabel('CWRP')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId('milrpRole')
                    .setLabel('MilRP')
                    .setStyle('SUCCESS')
            )


        const serverDiscordLinks = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('DarkRP')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK'),
                new Discord.MessageButton()
                    .setLabel('Garrys Mod')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK'),
                new Discord.MessageButton()
                    .setLabel('MilRP')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK')
            )

        await interaction.channel.send({
            ephemeral: true,
            embeds: [Response],
            components: [serverGameUpdates, serverDiscordLinks]
        })


        // Button clicking event, toggle role
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton()) {
                return null
            }

            if (interaction.customId === 'darkrpRole') {
                if (interaction.member.roles.cache.has(DarkRP.id)) {
                    await interaction.member.roles.remove(DarkRP)
                } else {
                    await interaction.member.roles.add(DarkRP)
                }
            }
            if (interaction.customId === 'cwrpRole') {
                if (interaction.member.roles.cache.has(CWRP.id)) {
                    await interaction.member.roles.remove(CWRP)
                } else {
                    await interaction.member.roles.add(CWRP)
                }
            }
            if (interaction.customId === 'milrpRole') {
                if (interaction.member.roles.cache.has(MilRP.id)) {
                    await interaction.member.roles.remove(MilRP)
                } else {
                    await interaction.member.roles.add(MilRP)
                }
            }
            await interaction.update({components: [serverGameUpdates, serverDiscordLinks]})
        })
    }
}