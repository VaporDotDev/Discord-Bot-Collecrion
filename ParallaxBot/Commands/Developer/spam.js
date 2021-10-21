const Discord = require('discord.js')

module.exports = {
    name: 'spam',
    description: "Sends the client's ping",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "amount",
            type: "NUMBER",
            description: "The amount of chats to send.",
            required: true
        },
        {
            name: "echo",
            type: "STRING",
            description: "What to send",
            required: true
        }],

    async exec(interaction) {
        let amount = interaction.options.getNumber('amount')
        let echo = interaction.options.getString('echo')

        let i = 1;

        function loop() {
            setTimeout(async () => {
                const Response = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(`**[${i}]** ${echo}`)
                await interaction.channel.send({embeds: [Response]})
                i++;
                if (i < amount + 1) {
                    loop();
                }
            }, 1000)
        }

        loop()
    }
}