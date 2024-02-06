/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as fs from "fs";
// @ts-ignore
import * as yaml from "js-yaml";
interface Config {
    botToken: string;
    botID: string;

    colors: {
        primary: string;
        secondary: string;
        success: string;
        error: string;
        invis: string;
    };

    sudoUsers: JSON;
}

function parseYamlConfig(filePath: string): Config {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as Config;

    // TODO: add error handling here

    return data;
}

const config = parseYamlConfig("config.yaml");

export default { config };
