const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "loopqueue",
    description: "Loop a fila inteira",
    usage: "",
    permissions: {
      channel: ["Ver Canal", "Enviar Mensagem", "Embed Links"],
      member: [],
    },
    aliases: ["lq", "repeatqueue", "rq"],
    /**
      *
      * @param {import("../structures/DiscordMusicBot")} client
      * @param {import("discord.js").Message} message
      * @param {string[]} args
      * @param {*} param3
      */
    run: async (client, message, args, { GuildDB }) => {
      let player = await client.Manager.get(message.guild.id);
      if (!player) return client.sendTime(message.channel, "❌ | **Nada está tocando agora...**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para usar este comando!**");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");

        if (player.queueRepeat) {
          player.setQueueRepeat(false)
          client.sendTime(message.channel, `:repeat: Loop de fila \`Desabilitado\``);
        } else {
          player.setQueueRepeat(true)
          client.sendTime(message.channel, `:repeat: Loop de fila \`Habilitado\``);
        }
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
          let player = await client.Manager.get(interaction.guild_id);
          const guild = client.guilds.cache.get(interaction.guild_id);
          const member = guild.members.cache.get(interaction.member.user.id);
          const voiceChannel = member.voice.channel;
          let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
            if (!player) return client.sendTime(interaction, "❌ | **Nada está tocando agora...**"); 
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Você deve estar em um canal de voz para usar este comando**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");

            if(player.queueRepeat){
                  player.setQueueRepeat(false)
                  client.sendTime(interaction, `:repeat: **Loop de fila** \`Desabilitado\``);
              }else{
                  player.setQueueRepeat(true)
                  client.sendTime(interaction, `:repeat: **Loop de fila** \`Habilitado\``);
              }
          console.log(interaction.data)
        }
      }    
};
