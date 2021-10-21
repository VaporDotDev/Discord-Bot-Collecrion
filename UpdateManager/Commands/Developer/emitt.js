module.exports = {
    name: "emit",
    description: "Event Emitter",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Guild Member Events",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"

                }
            ]
        }
    ],
    exec(interaction, client) {
        const choices = interaction.options.getString("member")

        switch (choices) {
            case "guildMemberAdd":
                client.emit("guildMemberAdd", interaction.member)
                interaction.reply({content: "Emitted the event.", ephemeral: true})
                break
            case "guildMemberRemove":
                client.emit("guildMemberRemove", interaction.member)
                interaction.reply({content: "Emitted the event.", ephemeral: true})
                break
        }
    }
}