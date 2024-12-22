const mineflayer = require('mineflayer');
const { once } = require('events');
const fs = require('fs');

// Log-Datei erstellen
const file = fs.createWriteStream('log.txt');

const bot = mineflayer.createBot({
    host: 'landania.net',
    auth: 'microsoft',
    username: process.env.user,
    password: process.env.password,
    version: '1.21',
});

// Pakete abfangen und in log.txt schreiben
bot._client.on('packet', (data, meta, buffer) => {
    if (meta.name === 'map_chunk') return
    const logEntry = JSON.stringify([meta, data, buffer.toString('hex')]);
    file.write(logEntry + '\n');
});

bot.on('chat', async (username, message) => {
    console.log(`[${username}] ${message}`);
});

bot.once('spawn', () => {
    console.log("bot connected");
});

bot.on('error', (err) => console.error('Bot error:', err));
bot.on('kicked', (reason) => console.log('Bot kicked:', reason));
