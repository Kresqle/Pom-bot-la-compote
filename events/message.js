const Discord = require("discord.js");
const { prefix } = require("../config.json");
const ytdl = require("ytdl-core");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("pom potes")) {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (permissions.has("CONNECT") && permissions.has("SPEAK")) {
        const connection = await voiceChannel.join();
        videoPlayer(voiceChannel, connection);
      }
    } else {
      message.lineReply(`
**POM POTES LA COMPOTE,
POM POTES SUR LES DOIGTS,
POM POTES À L'ENVERS,
POM POTES SOUS L'EAU,
POM POTES, LA COMPOTE QU'ON TRANSPOTE !**`);
    }
  }

  if (!message.content.startsWith(prefix)) return;

  const command = args.shift();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  return cmd.run(client, message, args);
};

function videoPlayer(voiceChannel, connection) {
  const stream = ytdl("https://www.youtube.com/watch?v=UrX1N5cXu7A", {
    filter: "audioonly",
  });
  connection.play(stream, { seek: 0, volume: 0.5 }).on("finish", () => {
    voiceChannel.leave();
  });
}
