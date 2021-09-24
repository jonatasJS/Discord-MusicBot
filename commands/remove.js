const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

  module.exports = {
    name: "remove",
    description: `Remover uma música da fila`,
    usage: "[number]",
    permissions: {
      channel: ["Ver Canal", "Enviar Mensagem", "Embed Links"],
      member: [],
    },
    aliases: ["rm"],

    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    if(!player.queue) return;
    const song = player.queue.slice(args[0] - 1, 1); 
    if (!player) return client.sendTime(message.channel, "❌ | **Não está tocando nada agora...**");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para usar este comando!**");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");
        
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("❌ | Não há nada na fila para remover");
    let rm = new MessageEmbed()
      .setDescription(`✅ **|** Faixa removida **\`${Number(args[0])}\`** da fila`)
      .setColor("GREEN")
      if (isNaN(args[0]))rm.setDescription(`**Usage - **${client.botconfig.prefix}\`remove [track]\``);
      if (args[0] > player.queue.length)
      rm.setDescription(`A fila tem apenas ${player.queue.length} sons!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
          name: "track",
          value: "[track]",
          type: 4,
          required: true,
          description: "Remover uma música da fila",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player) return client.sendTime(interaction, "❌ | **Não está tocando nada agora...**");
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Você deve estar em um canal de voz para usar este comando.**");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");
  
      if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime("❌ | **Não está tocando nada agora...**");
      let rm = new MessageEmbed()
        .setDescription(`✅ | **Faixa removida** \`${Number(args[0])}\` da fila!`)
        .setColor("GREEN")
      if (isNaN(args[0])) rm.setDescription(`**Usage:** \`${GuildDB.prefix}remove [track]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`A fila tem apenas ${player.queue.length} canções!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  }
};
