const {Events} = require("../Validation/EventNames");
const {promisify} = require("util");
const {glob} = require("glob");
const globPromise = promisify(glob);
const Ascii = require("ascii-table")

module.exports = async (client) => {
    const Table = new Ascii("Events Handler");

    (await globPromise(`${__dirname}/../Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!Events.includes(event.name) || !event.name) {
            const loc = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `Event name is INVALID or MISSING. ${loc[6] + `/` + loc[7]}`)
            return null;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.exec(...args, client));
        } else {
            client.on(event.name, (...args) => event.exec(...args, client));
        }


        await Table.addRow(event.name, `SUCCESSFUL`)
    })
    console.log(Table.toString());
}