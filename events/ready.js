module.exports = async (client) => {
    let name = "";
    const myHeaders = new Headers();
    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    const data = fetch(`/api/commands`, myInit).then(res => res.json());
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
        await data.commands.forEach((cmd) => {
            const index = rondom(0, data.commands.length);
            return name = `${cmd[index].name} (${cmd[index].aliases[1]})`;
        });

        client.user.setPresence({
            status: "online", // You can show online, idle, and dnd
            activity: {
                name, // The message shown
                type: "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING,
            }
        });
    }, 10000);

    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
    client.RegisterSlashCommands();
};
