const {Client, CommandInteraction, MessageEmbed} = require("discord.js");


module.exports = {
    name: "interactionCreate",
    async exec(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return interaction.reply({content: "This command no longer exists."}) &&
                client.commands.delete(interaction.commandName);

            command.exec(interaction);
        }
    }
}