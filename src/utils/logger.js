/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("path");
const pino = require("pino");
const pretty = require("pino-pretty");

const transport = pino.transport({
    targets: [
        {
            target: "pino-pretty",
            options: { colorize: true, translateTime: true },
        },
        {
            target: "pino/file",
            options: { destination: path.join(__dirname, "../logs/log.log") },
        },
    ],
});

const logger = pino(transport);

module.exports = logger;
