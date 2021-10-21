const {glob} = require('glob')
const {promisify} = require('util')
const globPromise = promisify(glob)
const Config = require('../Data/config.json')

module.exports = async (client) => {
    const commandFiles = await globPromise(__dirname + `/../Commands/*/*.js`)

    let commandsArray = [];

    commandFiles.map(async (commandFile) => {
        const command = await require(commandFile)

        if (!command.name) return;
        if (command.permission) command.defaultPermission = false;

        const Category = commandFile.split("/");
        console.log(`[COMMAND HANDLER] Command ` + command.name.toUpperCase() + ` from ${Category[Category.length - 2].toUpperCase()} has been loaded.`)

        await client.commands.set(command.name, command)
        commandsArray.push(command)
    })

    client.on("ready", async () => {
        const devGuild = await client.guilds.cache.get(Config.guildID)

        devGuild.commands.set(commandsArray).then((command) => {
            const Roles = (commandName) => {
                const commandPerm = commandsArray.find((c) => c.name === commandName).permission

                if (!commandPerm) return null;

                return devGuild.roles.cache.filter((r) => r.permissions.has(commandPerm) && !r.managed)
            }
            const fullPermissions = command.reduce((accumulator, x) => {
                const roles = Roles(x.name);
                if (!roles) return accumulator;

                const permissions = roles.reduce((a, v) => {
                    return [...a, {id: v.id, type: "ROLE", permission: true}]
                }, [])

                return [...accumulator, {id: x.id, permissions}]
            }, [])

            devGuild.commands.permissions.set({ fullPermissions })
        })
    })
}