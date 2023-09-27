import { CompanionActionDefinitions } from "@companion-module/base";
import { InstanceBaseExt } from "./util";
import { Config } from "./config";


export enum ActionId {
    All_Scenes,
    Lamps_Switch,
    Lamps_Switch_Bri,
    Room_Switch,
    Room_Switch_Bri,
    LightGroup_Switch,
    LightGroup_Switch_Bri,
    Zones_Switch,
    Zones_Switch_Bri,
}



export const setActionDefinitions = (instance: InstanceBaseExt<Config>): CompanionActionDefinitions => {
    const actions: CompanionActionDefinitions = {};
    actions[ActionId.All_Scenes] = {
        name: 'All Scenes',
        options: [
            {
                type: 'dropdown',
                label: 'Scenes',
                id: 'Scenes',
                default: 'Chose Scenes',
                choices: instance.scenes.map(scene => ({ id: scene.id, label: scene.name }))
            },
        ],
        async callback(action) {
            await instance.api?.scenes.activateScene(action.options.Scenes?.toString() ?? '')
        } 
    };
    actions[ActionId.Lamps_Switch] = {
        name: 'Lamps Switch',
        options: [
            {
                type: 'dropdown',
                label: 'Lamps',
                id: 'Lamps',
                default: 'Chose Lamp',
                choices: instance.lights.map(light => ({ id: light.id, label: light.name }))
            },
            {
                type: 'dropdown',
                label: 'ON/OFF',
                id: 'State',
                default: 'Chose State',
                choices: [
                    { id: 'true', label: 'On' },
                    { id: 'false', label: 'Off' },
                ]
            },
        ],
        async callback(action) {
            await instance.api?.lights.setLightState(action.options.Lamps?.toString() ?? '', { on: action.options.State === 'true' })
        }
    };
    actions[ActionId.Lamps_Switch_Bri] = {
        name: 'Lamps Switch Bri',
        options: [
            {
                type: 'dropdown',
                label: 'Lamps',
                id: 'Lamps',
                default: 'Chose Lamp',
                choices: instance.lights.map(light => ({ id: light.id, label: light.name }))
            },
            {
                type: 'number',
                label: 'Brightness',
                id: 'bri',
                min: 0,
                max: 254,
                default: 254,
            },
        ],
        async callback(action) {
            await instance.api?.lights.setLightState(action.options.Lamps?.toString() ?? '', { bri: action.options.bri ?? 0 })
        }
    };
    actions[ActionId.Room_Switch] = {
        name: 'Room Switch',
        options: [
            {
                type: 'dropdown',
                label: 'Room',
                id: 'Room',
                default: 'Chose Room',
                choices: instance.rooms.map(room => ({ id: room.id, label: room.name }))
            },
            {
                type: 'dropdown',
                label: 'ON/OFF',
                id: 'State',
                default: 'Chose State',
                choices: [
                    { id: 'true', label: 'On' },
                    { id: 'false', label: 'Off' },
                ]
            },
        ],
        async callback(action) {
            await instance.api?.groups.setGroupState(action.options.Room?.toString() ?? '', { on: action.options.State === 'true' })
        }
    };
    actions[ActionId.Room_Switch_Bri] = {
        name: 'Room Switch Bri',
        options: [
            {
                type: 'dropdown',
                label: 'Room',
                id: 'Room',
                default: 'Chose Room',
                choices: instance.rooms.map(room => ({ id: room.id, label: room.name }))
            },
            {
                type: 'number',
                label: 'Brightness',
                id: 'bri',
                min: 0,
                max: 254,
                default: 254,
            },
        ],
        async callback(action) {
            await instance.api?.groups.setGroupState(action.options.Room?.toString() ?? '', { bri: action.options.bri ?? 0 })
        }
    };
    actions[ActionId.LightGroup_Switch] = {
        name: 'LightGroup Switch',
        options: [
            {
                type: 'dropdown',
                label: 'LightGroup',
                id: 'LightGroup',
                default: 'Chose LightGroup',
                choices: instance.lightGroups.map(lightGroup => ({ id: lightGroup.id, label: lightGroup.name }))
            },
            {
                type: 'dropdown',
                label: 'ON/OFF',
                id: 'State',
                default: 'Chose State',
                choices: [
                    { id: 'true', label: 'On' },
                    { id: 'false', label: 'Off' },
                ]
            },
        ],
        async callback(action) {
            await instance.api?.groups.setGroupState(action.options.LightGroup?.toString() ?? '', { on: action.options.State === 'true' })
        }
    };
    actions[ActionId.LightGroup_Switch_Bri] = {
        name: 'LightGroup Switch Bri',
        options: [
            {
                type: 'dropdown',
                label: 'LightGroup',
                id: 'LightGroup',
                default: 'Chose LightGroup',
                choices: instance.lightGroups.map(lightGroup => ({ id: lightGroup.id, label: lightGroup.name }))
            },
            {
                type: 'number',
                label: 'Brightness',
                id: 'bri',
                min: 0,
                max: 254,
                default: 254,
            },
        ],
        async callback(action) {
            await instance.api?.groups.setGroupState(action.options.LightGroup?.toString() ?? '', { bri: action.options.bri ?? 0 })
        }
    };
    actions[ActionId.Zones_Switch] = {
        name: 'Zones Switch',
        options: [
            {
                type: 'dropdown',
                label: 'Zones',
                id: 'Zones',
                default: 'Chose Zones',
                choices: instance.zones.map(zone => ({ id: zone.id, label: zone.name }))
            },
            {
                type: 'dropdown',
                label: 'ON/OFF',
                id: 'State',
                default: 'Chose State',
                choices: [
                    { id: 'true', label: 'On' },
                    { id: 'false', label: 'Off' },
                ]
            },
        ],
        async callback(action) {
            await instance.api?.groups.setGroupState(action.options.Zones?.toString() ?? '', { on: action.options.State === 'true' })
        }
    };
    actions[ActionId.Zones_Switch_Bri] = {
        name: 'Zones Switch Bri',
        options: [
            {
                type: 'dropdown',
                label: 'Zones',
                id: 'Zones',
                default: 'Chose Zones',
                choices: instance.zones.map(zone => ({ id: zone.id, label: zone.name }))
            },
            {
                type: 'number',
                label: 'Brightness',
                id: 'bri',
                min: 0,
                max: 254,
                default: 254,
            },
        ],
        async callback(action) {
            await instance.api?.groups.setGroupState(action.options.Zones?.toString() ?? '', { bri: action.options.bri ?? 0 })
        }
    };

    return actions
}