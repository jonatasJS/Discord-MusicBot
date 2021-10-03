const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "resume",
    description: "Resumes the music",
    usage: "",
    permissions: {
        channel: ["Ver Canal", "Enviar Mensagem", "Embed Links"],
        member: [],
    },
    aliases: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Não está tocando nada agora...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Você deve estar em um canal de voz para usar este comando!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");

        if (player.playing) return client.sendTime(message.channel, "❌ | **A música já foi retomada!**");
        player.pause(false);
        await message.react("✅");
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

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Você deve estar em um canal de voz para usar este comando.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Você deve estar no mesmo canal de voz que eu para usar este comando!**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "❌ | **Não está tocando nada agora...**");
            if (player.playing) return client.sendTime(interaction, "❌ | **A música já foi retomada!**");
            player.pause(false);
            client.sendTime(interaction, "**⏯ Retomado!**");
        },
    },
};
