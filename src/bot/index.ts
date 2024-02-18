/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const { config } = require("./config");
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const logger = require("../utils/logger");
import * as mongoose from 'mongoose';

logger.info("Starting up");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// Connect to DB
await mongoose.connect(config.database.url);

// Load commands
logger.info("Loading commands");
client.commands = new Collection();
const foldersPath = path.join(import.meta.dir, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file: string) => file.endsWith(".ts"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            logger.info(`Found command ${command.data.name}`);
            client.commands.set(command.data.name, command);
        } else {
            logger.warn(
                `Command ${filePath} missing required "data" or "execute" property`
            );
        }
    }
}

/*
// Load buttons
logger.info("Loading buttons");
client.buttons = new Map();
const buttonsPath = path.join(__dirname, "./components/buttons");
const buttonFiles = fs
    .readdirSync(buttonsPath)
    .filter((file: string) => file.endsWith(".ts"));

for (const file of buttonFiles) {
    const button = require(`${buttonsPath}/${file}`);
    client.buttons.set(button.data.customId, button);
}
*/

/*
// Load modals
logger.info("Loading modals");
client.modals = new Map();
const modalsPath = path.join(__dirname, "./components/modals");
const modalFiles = fs
    .readdirSync(modalsPath)
    .filter((file: string) => file.endsWith(".ts"));

for (const file of modalFiles) {
    const model = require(`${modalsPath}/${file}`);
    client.modals.set(model.data.customId, model);
}
*/

// Handle events
logger.info("Loading events");
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file: string) => file.endsWith(".ts"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args: any) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any) => event.execute(...args));
    }
}

logger.info("Logging into Discord");
client.login(config.botToken);
