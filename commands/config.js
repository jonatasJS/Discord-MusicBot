const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "config",
  description: "Edite as configurações do bot",
  usage: "",
  permissions: {
    channel: ["Ver Canal", "Enviar Mensagem", "Embed Links"],
    member: ["Administrador"],
  },
  aliases: ["conf"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Config = new MessageEmbed()
      .setAuthor("Server Config", client.botconfig.IconURL)
      .setColor("RANDOM")
      .addField("Prefix", GuildDB.prefix, true)
      .addField("DJ Role", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Not Set", true)
      .setDescription(`
O que você gostaria de editar?

:one: - Server Prefix
:two: - DJ Role
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("1️⃣");
    await ConfigMessage.react("2️⃣");
    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      client.sendTime(
        message.channel, "❌ | **Você demorou muito para responder. Se você quiser editar as configurações, execute o comando novamente!**"
      );
      ConfigMessage.delete(Config);
    });
    let isOk = false;
    try {
      emoji = emoji.first();
    } catch {
      isOk = true;
    }
    if (isOk) return; //im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "1️⃣") {
      await client.sendTime(message.channel, "Para que você deseja alterar o prefixo?");
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first())
        return client.sendTime(message.channel, "Você demorou muito para responder.");
      prefix = prefix.first();
      prefix = prefix.content;

      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      client.sendTime(
        message.channel, `Prefixo de guilda salvo com sucesso como \`${prefix}\``
      );
    } else {
      await client.sendTime(
        message.channel, "Por favor, mencione o cargo que você deseja que os `DJs` tenham."
      );
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first())
        return client.sendTime(message.channel, "Você demorou muito para responder.");
      role = role.first();
      if (!role.mentions.roles.first())
        return client.sendTime(
          message.channel, "Mencione a função que deseja apenas para DJs."
        );
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      client.sendTime(
        message.channel, "Função de DJ salva com sucesso como <@&" + role.id + ">"
      );
    }
  },

  SlashCommand: {
    options: [
      {
        name: "prefix",
        description: "Verifique o prefixo do bot",
        type: 1,
        required: false,
        options: [
          {
            name: "symbol",
            description: "Defina o prefixo do bot",
            type: 3,
            required: false,
          },
        ],
      },
      {
        name: "dj",
        description: "Verifique a função de DJ",
        type: 1,
        required: false,
        options: [
          {
            name: "role",
            description: "Defina a função de DJ",
            type: 8,
            required: false,
          },
        ],
      },
    ],
    /**
       *
       * @param {import("../structures/DiscordMusicBot")} client
       * @param {import("discord.js").Message} message
       * @param {string[]} args
       * @param {*} param3
       */
    run: async (client, interaction, args, { GuildDB }) => {
      let config = interaction.data.options[0].name;
      let member = await interaction.guild.members.fetch(interaction.user_id);
      //TODO: if no admin perms return...
      if (config === "prefix") {
        //prefix stuff
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          //has prefix
          let prefix = interaction.data.options[0].options[0].value;
          await client.database.guild.set(interaction.guild.id, {
            prefix: prefix,
            DJ: GuildDB.DJ,
          });
          client.sendTime(interaction, `O prefixo agora foi definido para \`${prefix}\``);
        } else {
          //has not prefix
          client.sendTime(interaction, `O prefixo deste servidor é \`${GuildDB.prefix}\``);
        }
      } else if (config === "djrole") {
        //DJ role
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          let role = interaction.guild.roles.cache.get(
            interaction.data.options[0].options[0].value
          );
          await client.database.guild.set(interaction.guild.id, {
            prefix: GuildDB.prefix,
            DJ: role.id,
          });
          client.sendTime(
            interaction, `Alterou com sucesso a função de DJ deste servidor para ${role.name}`
          );
        } else {
          /**
           * @type {require("discord.js").Role}
           */
          let role = interaction.guild.roles.cache.get(GuildDB.DJ);
          client.sendTime(interaction, `A função de DJ deste servidor é ${role.name}`);
        }
      }
    },
  },
};
