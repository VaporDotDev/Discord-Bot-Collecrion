const Discord = require('discord.js')
const {MessageActionRow} = require("discord.js");

module.exports = {
    name: 'updateroles',
    description: "Sends the reaction role message",
    permission: "ADMINISTRATOR",
    async exec(interaction, client) {

        const Rust = interaction.guild.roles.cache.find(role => role.id === "890633923737030676");
        const GarrysMod = interaction.guild.roles.cache.find(role => role.id === "890633968226029640");
        const Minecraft = interaction.guild.roles.cache.find(role => role.id === "890677330270375996");
        const FiveM = interaction.guild.roles.cache.find(role => role.id === "890677497056870410");
        const Arma3 = interaction.guild.roles.cache.find(role => role.id === "890677544968400936");


        const Response = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Server Updates')
            .setDescription('Please use the buttons below to opt-in for server updates. \nThe grey buttons below will link you to each of the server discords.')


        const serverGameUpdates = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rustUpdates')
                    .setLabel('Rust')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId('gmodUpdates')
                    .setLabel('Garrys Mod')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId('minecraftUpdates')
                    .setLabel('Minecraft')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId('fivemUpdates')
                    .setLabel('FiveM')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId('arma3Updates')
                    .setLabel('Arma 3')
                    .setStyle('SUCCESS')
            );


        const serverDiscordLinks = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('Rust')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK'),
                new Discord.MessageButton()
                    .setLabel('Garrys Mod')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK'),
                new Discord.MessageButton()
                    .setLabel('Minecraft')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK'),
                new Discord.MessageButton()
                    .setLabel('FiveM')
                    .setURL('https://www.google.com/')
                    .setStyle('LINK'),
                new Discord.MessageButton()
                    .setLabel('Arma 3')
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

            if (interaction.customId === 'rustUpdates') {
                if (interaction.member.roles.cache.has(Rust.id)) {
                    interaction.member.send("You have opted out for **RUST SERVER** updates. ")
                    await interaction.member.roles.remove(Rust)
                } else {
                    interaction.member.send("You have opted in for **RUST SERVER** updates.")
                    await interaction.member.roles.add(Rust)
                }
            }
            if (interaction.customId === 'gmodUpdates') {
                if (interaction.member.roles.cache.has(GarrysMod.id)) {
                    interaction.member.send("You have opted out for **GARRYS MOD SERVER** updates.")
                    await interaction.member.roles.remove(GarrysMod)
                } else {
                    interaction.member.send("You have opted in for **GARRYS MOD SERVER** updates.")
                    await interaction.member.roles.add(GarrysMod)
                }
            }
            if (interaction.customId === 'minecraftUpdates') {
                if (interaction.member.roles.cache.has(Minecraft.id)) {
                    interaction.member.send("You have opted out for **MINECRAFT SERVER** updates.")
                    await interaction.member.roles.remove(Minecraft)
                } else {
                    interaction.member.send("You have opted in for **MINECRAFT SERVER** updates.")
                    await interaction.member.roles.add(Minecraft)
                }
            }
            if (interaction.customId === 'fivemUpdates') {
                if (interaction.member.roles.cache.has(FiveM.id)) {
                    interaction.member.send("You have opted out for **FIVEM SERVER** updates.")
                    await interaction.member.roles.remove(FiveM)
                } else {
                    interaction.member.send("You have opted in for **FIVEM SERVER** updates.")
                    await interaction.member.roles.add(FiveM)
                }
            }
            if (interaction.customId === 'arma3Updates') {
                if (interaction.member.roles.cache.has(Arma3.id)) {
                    interaction.member.send("You have opted out for **ARMA 3 SERVER** updates.")
                    await interaction.member.roles.remove(Arma3)
                } else {
                    interaction.member.send("You have opted in for **ARMA 3 SERVER** updates.")
                    await interaction.member.roles.add(Arma3)
                }
            }
            await interaction.update({ephemeral: true, components: [serverGameUpdates, serverDiscordLinks]})
        })
    }
}