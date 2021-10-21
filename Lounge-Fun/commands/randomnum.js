module.exports.run = async (Client, interaction, args) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }


};
module.exports.help = {
    name: 'randomnum',
    description: 'Lets you choose a random number between two chosen numbers.',
    options: [
        {
            name: 'min',
            description: 'Minimum number to choose from.',
            type: 4,
            required: true,
        },
        {
            name: 'max',
            description: 'Maximum number to choose from.',
            type: 4,
            required: true,
        }
    ]
};