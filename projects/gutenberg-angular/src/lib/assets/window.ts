import { GenericObj } from './generic';
import { Observable } from 'rxjs';

export interface WP {
    [key: string]: any;
    url?: {
        addQueryArgs
    };
    apiFetch?: (option) => any;
}

export interface WPApiSettings {
    root: string;
    [key: string]: any;
}

export interface UserSettings {
    uid: number | string;
    [key: string]: any;
}

export interface Window {
    wp: WP;
    userSettings: UserSettings;
    wpApiSettings: WPApiSettings;
    wp_fetcher?: Observable<any>;
    wp_config_mode?: string;
    [key: string]: any;
}

export class WindowConfig implements Window {
    wp: WP;
    userSettings: UserSettings;
    wpApiSettings: WPApiSettings;
    constructor() {
        this.userSettings.uid = 2;
        this.wpApiSettings.root = 'localhost';
    }
}
