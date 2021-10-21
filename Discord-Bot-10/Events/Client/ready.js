const mongoose = require('mongoose')
const { dbURL } = require('../../Data/config.json')

module.exports = {
    name: "ready",
    once: true,
    exec(client) {
        console.log(`\n[CLIENT] Logged in as ${client.user.tag}.`)
        client.user.setActivity('in Development', {
            type: "COMPETING"
        })

        if (!dbURL) return;
        mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('[CLIENT] The client is now connected to the database.')
        }).catch((err) => {
            console.log(err)
        })
    }
}