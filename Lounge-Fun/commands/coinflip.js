module.exports.run = async (Client, interaction, args) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    let probability = getRndInteger(0,2);

    if (probability == 0) {
        return Client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: 'The coin rolls.... It lands on **heads**!'
                }
            }
        });
    } else {
        return Client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: 'The coin rolls.... It lands on **tails**!'
                }
            }
        });
    }


};
module.exports.help = {
    name: 'coinflip',
    description: 'Tosses a coin with two possible results, heads or tails.',
    options: []
};