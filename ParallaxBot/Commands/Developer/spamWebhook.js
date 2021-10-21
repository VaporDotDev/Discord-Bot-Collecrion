const Discord = require('discord.js')
const {WelcomeChannel} = require("discord.js");

module.exports = {
    name: 'spamwebhook',
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

        const welcomeWebhook = new Discord.WebhookClient({
            id: "898333649479565313",
            token: "6vy1bBJuf7rL1b14Repp_6P2NrIzYX6PgL9Pc2fl_A2FclYOXFpxRV3_beHxu_YpZfA-"
        })
        let i = 1;

        function loop() {
            setTimeout(async () => {
                const Response = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(`**[${i}]** ${echo}`)
                await welcomeWebhook.send({content: echo})


                i++;
                if (i < amount + 1) {
                    loop();
                }
            }, 1000)
        }

        loop()
    }
}