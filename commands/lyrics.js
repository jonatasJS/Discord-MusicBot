const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
  name: "lyrics",
  description: "Mostra a letra da música pesquisada",
  usage: "[Nome da música]",
  permissions: {
    channel: ["Ver Mensagem", "Enviar Mensagem", "Embed Links"],
    member: [],
  },
  aliases: ["ly"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    let SongTitle = args.join(" ");
    let SearchString = args.join(" ");
    if (!args[0] && !player) return client.sendTime(message.channel, "❌ | **Nada está tocando agora...**");
    if (!args[0]) SongTitle = player.queue.current.title;

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics) return client.sendTime(message.channel, `**No lyrics found for -** \`${SongTitle}\``);
    lyrics = lyrics.split("\n"); //spliting into lines
    let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Lyrics for: ${SongTitle}`, client.botconfig.IconURL)
        .setColor("RANDOM")
        .setDescription(ly.join("\n"));

      if (args.join(" ") !== SongTitle) em.setThumbnail(player.queue.current.displayThumbnail());

      return em;
    });

    if (!Pages.length || Pages.length === 1) return message.channel.send(Pages[0]);
    else return client.Pagination(message, Pages);
  },

  SlashCommand: {
    options: [
      {
        name: "song",
        value: "song",
        type: 3,
        description: "Digite o nome de uma música para pesquisar",
        required: false,
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

      if (!interaction.data.options && !player) return client.sendTime(interaction, "❌ | **Nada está tocando agora...**");

      SongTitle = interaction.data.options ? interaction.data.options[0].value : player.queue.current.title;
      let lyrics = await lyricsFinder(SongTitle);
      console.log(lyrics.length === 0)
      if (lyrics.length === 0)
        return client.sendTime(interaction, `**No lyrics found for -** \`${SongTitle}\``);
      lyrics = lyrics.split("\n"); //spliting into lines
      let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page

      let Pages = SplitedLyrics.map((ly) => {
        let em = new MessageEmbed()
          .setAuthor(`Lyrics for: ${SongTitle}`, client.botconfig.IconURL)
          .setColor("RANDOM")
          .setDescription(ly.join("\n"));

        if (SongTitle !== SongTitle) em.setThumbnail(player.queue.current.displayThumbnail());

        return em;
      });
      if (!Pages.length || Pages.length === 1)
        return interaction.send(Pages[0]);

    },
  }
};
