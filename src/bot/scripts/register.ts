/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { config } = require("../config");
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const logger = require("../../utils/logger");

const commands = [];
const foldersPath = path.join(import.meta.dir, "../commands");
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
            commands.push(command.data.toJSON());
        } else {
            logger.warn(
                `The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

const rest = new REST().setToken(config.botToken);

(async () => {
    try {
        logger.info(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        const data = await rest.put(Routes.applicationCommands(config.botID), {
            body: commands,
        });

        logger.info(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        logger.error(error);
    }
})();
