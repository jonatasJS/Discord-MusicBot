const fetch = require('node-fetch');

module.exports = async (client) => {
    let name = "";
    const myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    const data = fetch(`${process.env.Website}/api/commands`, myInit).then(res => res.json());
    const rondom = (min, max) => Math.floor(Math.random() * (min - max) + min);

    client.Ready = true;
    client.user.setPresence({
        status: "online", // You can show online, idle, and dnd
        activity: {
            name: name ? "Music (>play)" : "Help (>help)", // The message shown
            type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });

    setInterval(async () => {
        if(data.commands){
            await data.commands.forEach((cmd) => {
                const index = rondom(0, data.commands.length);
                console.log(`${cmd[index].name} (${cmd[index].aliases[1]})`);
                return name = `${cmd[index].name} (${cmd[index].aliases[1]})`;
            });

            client.user.setPresence({
                status: "online", // You can show online, idle, and dnd
                activity: {
                    name: name, // The message shown
                    type: "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING,
                }
            });
        } else return;
    }, 10000);

    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
    client.RegisterSlashCommands();
};
