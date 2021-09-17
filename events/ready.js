module.exports = async (client) => {
  let name = true;
  
	client.Ready = true;
  client.user.setPresence({
		status: "online", // You can show online, idle, and dnd
		activity: {
			name: name ? "Music (>play)" : "Help (>help)", // The message shown
			type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING,
		}
	});
  
	setInterval(() => {
    client.user.setPresence({
      status: "online", // You can show online, idle, and dnd
      activity: {
        name: name ? "Music (>play)" : "Help (>help)", // The message shown
        type: "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING,
      }
    });
    
		name = !name;
	}, 10000);
  
	client.Manager.init(client.user.id);
	client.log("Successfully Logged in as " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
	client.RegisterSlashCommands();
};
