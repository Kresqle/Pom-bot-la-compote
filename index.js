const fs = require("fs");
const Discord = require("discord.js");
require("discord-reply");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");

client.commands = new Discord.Collection();

client.login(token);

fs.readdir("./commands//", (error, file) => {
  if (error) console.log(error);

  let commands = file.filter((file) => file.split(".").pop() === "js");
  if (commands.length <= 0) return console.log("Aucune commande trouvée");

  commands.forEach((file) => {
    let command = require(`./commands/${file}`);
    console.log(`Commande chargée : ${file}`);
    client.commands.set(command.help.name, command);
  });
});

fs.readdir("./events/", (error, file) => {
  if (error) console.log(error);
  console.log(`Event chargé : ${file.length}`);

  file.forEach((file) => {
    const events = require(`./events/${file}`);
    const event = file.split(".")[0];

    client.on(event, events.bind(null, client));
  });
});
