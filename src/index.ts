import { CompanionStaticUpgradeScript, InstanceBase, InstanceStatus, SomeCompanionConfigField, runEntrypoint } from '@companion-module/base';
import { Config, getConfigFields } from './config';

import { v3 } from 'node-hue-api';
import Api, { Light } from 'node-hue-api/lib/api/Api';
import { LightGroup, Zone, Room } from 'node-hue-api/lib/api/Groups';
import LightScene from 'node-hue-api/lib/model/scenes/LightScene';
import GroupScene from 'node-hue-api/lib/model/scenes/GroupScene';
import { setActionDefinitions } from './actions';



class HueInstance extends InstanceBase<Config> {
    public config: Config = {
        ip: '',
        username: '',
        createUser: false,
    };
    public discoveredBridges: { ipaddress: string, name: string }[] = [];
    public api: Api | undefined;
    public lights: Array<Light> = [];
    public rooms: Array<Room> = [];
    public zones: Array<Zone> = [];
    public lightGroups: Array<LightGroup> = [];
    public scenes: Array<LightScene|GroupScene> = [];

    constructor(internal: unknown) {
        super(internal)
    }

    async init(config: Config): Promise<void> {
        
        this.config = config
        if (this.discoveredBridges.length === 0) {
            this.discoverBridges();
        }

        this.updateStatus(InstanceStatus.Connecting, "Syncing")

        if (this.config.ip && this.config.username) {
            let api = await v3.api.createLocal(this.config.ip).connect(this.config.username)
            this.api = api
            if (this.api !== undefined) {
                let user = await this.api.users.getUser(this.config.username)
                if (user !== undefined) {
                    this.updateParams();
                } else {
                    this.log("error", "Unable to use API")
                    this.updateStatus(InstanceStatus.UnknownError, "Invalid user name")
                }
            } else {
                this.log("error", "Unable to connect")
                this.updateStatus(InstanceStatus.ConnectionFailure, "Unable to connect to bridge")
            }
        }
        
    }

    async discoverBridges() {
        this.discoveredBridges = []
        let results = await v3.discovery.upnpSearch(1)
        if (Array.isArray(results) && results.every(item => typeof item === 'object' && 'ipaddress' in item && 'name' in item)) {
            results.forEach((bridge) => {
                this.discoveredBridges.push(bridge)
            })
        }
    }

    async createUser() {
        if (this.config.ip === undefined) {
            return;
        }

        this.log("info", "Creating new user")
        const APPLICATION_NAME = 'companion-module-hue', DEVICE_NAME = 'companion';
        
        try {
            let api = await v3.api.createLocal(this.config.ip).connect()
            let createdUser = await api.users.createUser(APPLICATION_NAME, DEVICE_NAME)
            if (createdUser !== undefined) {
                this.log("info", "New user created")
                this.config.username = createdUser.username;
                this.config.createUser = false;
            }
        } catch (err) {
                this.log('error', "You may need to press the Link Button on the bridge first");
                this.log("debug", `Unexpected Error: ${err}`);
                this.log('error', "Unexpected Error: " + err);
                
        }
    }

    async updateParams() {
        if (this.api === undefined) {
            return
        }

        this.lights = await this.api.lights.getAll()
        this.actions();

        this.rooms = [];
        this.zones = [];
        this.lightGroups = [];

        let groups = await this.api.groups.getAll();
        groups.forEach((group) => {
            switch (group.type) {
                case "Room":
                    this.rooms.push(group as Room);
                    break;
                case "Zone":
                    this.zones.push(group as Zone);
                    break;
                case "LightGroup":
                    this.lightGroups.push(group as LightGroup);
                    break;
            }
            this.actions();
        })
        this.scenes = [];
        let scenes = await this.api.scenes.getAll();
        scenes.forEach((scene) => {
            this.scenes.push(scene);
        })
        this.actions();
        this.updateStatus(InstanceStatus.Ok);
    }

    async actions() {
        this.setActionDefinitions(setActionDefinitions(this));
    }
    getConfigFields(): SomeCompanionConfigField[] {
        return getConfigFields(this);
    }

    async destroy(): Promise<void> {
        this.log("debug", "destroy");
    }

    async configUpdated(config: Config): Promise<void> {
        this.config = config;
        if (this.config.createUser) {
            await this.createUser();
        }
        await this.init(config);
    }
    
}

import { example_conversion } from './upgrades';
const upgradeScripts: CompanionStaticUpgradeScript<Config>[] = [example_conversion];

runEntrypoint(HueInstance, upgradeScripts)