const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "grab",
  description: "Salva a música atual em suas mensagens diretas",
  usage: "",
  permissions: {
    channel: ["Ver Canal", "Enviar Mensagem", "Embed Links"],
    member: [],
  },
  aliases: ["save"],
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/
run: async (client, message, args, { GuildDB }) => {
  let player = await client.Manager.get(message.guild.id);
  if (!player) return client.sendTime(message.channel, "❌ | **Nada está tocando agora ...**");
  if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para tocar algo!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");
   message.author.send(new MessageEmbed()
   .setAuthor(`Música Salva`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor("RANDOM")
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`⌛ Duração: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
  .addField(`🎵 Autor: `, `\`${player.queue.current.author}\``, true)
  .addField(`▶ Tocando:`, `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 Salvo em:`, `<#${message.channel.id}>`)
  .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: Seus DMs estão desativados**")
    })    

    client.sendTime(message.channel, "✅ | **Verifique seus DMs!**")
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
    const user = client.users.cache.get(interaction.member.user.id);
    const member = guild.members.cache.get(interaction.member.user.id);
    let player = await client.Manager.get(interaction.guild_id);
    if (!player) return client.sendTime(interaction, "❌ | **Nada está tocando agora ...**");
    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Você deve estar em um canal de voz para usar este comando.**");
    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");
    try{
    let embed = new MessageEmbed()
      .setAuthor(`Song saved: `, client.user.displayAvatarURL())
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor("RANDOM")
      .setTimestamp()
      .setTitle(`**${player.queue.current.title}**`)
      .addField(`⌛ Duration: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
      .addField(`🎵 Author: `, `\`${player.queue.current.author}\``, true)
      .addField(`▶ Play it:`, `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }play ${player.queue.current.uri}\``)
      .addField(`🔎 Saved in:`, `<#${interaction.channel_id}>`)
      .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      }))
      user.send(embed);
    }catch(e) {
      return client.sendTime(interaction, "**:x: Seus DMs estão desativados**")
    }

    client.sendTime(interaction, "✅ | **Verifique seus DMs!**")
  },
  },
};
