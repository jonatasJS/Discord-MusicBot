const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Pare a música e saia do canal de voz",
  usage: "",
  permissions: {
    channel: ["Ver Mensagem", "Enviar Mensagem", "Embed Links"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz, use este comando**");
    if (!player) return client.sendTime(message.channel,"❌ | **Nada está tocando agora ...**");
    await client.sendTime(message.channel,":notes: | **Desconectado!**");
    await message.react("✅");
    player.destroy();
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Você deve estar em um canal de voz para usar este comando.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **Você deve estar em ${guild.me.voice.channel} para usar este comando.**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Nada está tocando agora ...**"
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":notes: | **Desconectado!**"
      );
    },
  },
};
