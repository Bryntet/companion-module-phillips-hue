

import { Regex, SomeCompanionConfigField } from "@companion-module/base";
import { InstanceBaseExt } from "./util";

export interface Config {
    ip: string,
    username: string,
    createUser: boolean,
}

export const getConfigFields = (instance: InstanceBaseExt<Config>): SomeCompanionConfigField[] => {
    return [
			{
                type: "dropdown",
                id: "ip",
                width: 6,
                label: "Bridge Address",
                default: '',
                allowCustom: true,
                choices: instance.discoveredBridges.map(bridge => 
                     ({ id: bridge.ipaddress, label: bridge.name })
                ),
                regex: Regex.IP
            },
            {
                type: "textinput",
                id: "username",
                label: "Bridge user",
                width: 6,
                required: true,
            },
            {
                type: "checkbox",
                id: "createUser",
                label: "Create new User",
                width: 6,
                default: false,
            }
			
		];
};