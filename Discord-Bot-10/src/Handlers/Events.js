const {Client} = require('discord.js')
const {glob} = require('glob')
const {promisify} = require('util')
const globPromise = promisify(glob)

module.exports = async (client) => {
    const eventFiles = await globPromise(__dirname + `/../Events/*/*.js`)

    eventFiles.map((file) => {
        const event = require(file)
        if (!event.name) return

        if (event.once) {
            client.once(event.name, (...args) => event.exec(client, ...args))
        } else {
            client.on(event.name, (...args) => event.exec(client, ...args))
        }

        const Category = file.split("/");
        console.log(`[EVENT HANDLER] Event ` + event.name.toUpperCase() + ` from ${Category[Category.length - 2].toUpperCase()} has been loaded.`)
    })
}