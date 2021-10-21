const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async exec(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("⛔ AN error occurred while executing the command")
                ]}) && client.commands.delete(interaction.commandName);

            command.exec(interaction, client)

        }
    }
}