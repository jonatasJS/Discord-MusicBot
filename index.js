require('dotenv').config();

const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();
const fs = require("fs");

const { execSync, exec } = require('child_process');

console.log("Execulted");

const output = exec('yarn dev-next', { encoding: 'utf-8' });

console.log('The output is:');
console.clear();

client.build();

console.clear();

module.exports = client; //;-;
