const fetch = require('node-fetch');
const Logger = require('../structures/Logger');
const path = require('path');
const lg = new Logger(path.join(__dirname, "..", "Logs.log"));


module.exports = async (client) => {
    let name = false;
    /*const data = fetch(`http://localhost:3000/api/commands`).then(res => res.json());
    const rondom = (min, max) => Math.floor(Math.random() * (min - max) + min);
    setTimeout(() => lg.log(data), 10000); */

    client.Ready = true;
    client.user.setPresence({
        status: "online", // You can show online, idle, and dnd
        activity: {
            name: name ? `Music (${client.botconfig.DefaultPrefix}play)` : `Help (${client.botconfig.DefaultPrefix}help)`, // The message shown
            type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });

    

    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
    client.RegisterSlashCommands();
};
