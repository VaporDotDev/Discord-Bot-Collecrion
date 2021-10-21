const {Permissions} = require("../Validation/Permissions")
const {glob} = require('glob')
const {promisify} = require('util')
const globPromise = promisify(glob)
const Config = require('../Data/config.json')
const Ascii = require("ascii-table")

module.exports = async (client) => {
    const Table = new Ascii("Commands Handler")

    let CommandsArray = [];

    (await globPromise(__dirname + `/../Commands/*/*.js`)).map(async (file) => {
        const command = require(file)

        if (!command.name) {
            return Table.addRow(file.split("/")[7], "FAILED", "Missing a name.")
        }
        if (!command.description) {
            return Table.addRow(command.name, "FAILED", "Missing a description.")
        }
        if (command.permission) {
            if (Permissions.includes(command.permission)) {

                command.defaultPermission = false
            } else {
                return Table.addRow(command.name, "FAILED", "Permission is invalid.")
            }
        }
        client.commands.set(command.name, command)
        CommandsArray.push(command)

        await Table.addRow(command.name, "SUCCESSFUL")

    })
    console.log(Table.toString())

    client.on("ready", async () => {
            const DevGuild = await client.guilds.cache.get(Config.guildID)

            DevGuild.commands.set(CommandsArray).then(async (command) => {
                const Roles = (commandName) => {
                    const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission
                    if (!cmdPerms) {
                        return null
                    }
                    return DevGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms))
                }

                const fullPermissions = command.reduce((accumulator, r) => {
                    const roles = Roles(r.name)
                    if (!roles) {
                        return accumulator;
                    }

                    const permissions = roles.reduce((a, r) => {
                        return [...a, {id: r.id, type: "ROLE", permission: true}]
                    }, [])
                    return [...accumulator, {id: r.id, permissions}]
                }, [])
                await DevGuild.commands.permissions.set({fullPermissions})
            })
        }
    )
}