import { InstanceBase } from "@companion-module/base";
import Api, {Light} from 'node-hue-api/lib/api/Api';
import { LightGroup, Zone, Room } from 'node-hue-api/lib/api/Groups';

import LightScene from 'node-hue-api/lib/model/scenes/LightScene';
import GroupScene from 'node-hue-api/lib/model/scenes/GroupScene';

export interface InstanceBaseExt<TConfig> extends InstanceBase<TConfig> {
	config: TConfig
    discoveredBridges: {ipaddress: string, name: string}[]
    lights: Array<Light>
    rooms: Array<Room>
    zones: Array<Zone>
    lightGroups: Array<LightGroup>
    scenes: Array<LightScene|GroupScene>
    api: Api | undefined
}