import { Describable, Namable, Metable, Idiable, StringDate, GenericObj } from './generic';

export interface IUser extends Namable, Describable, Metable, Idiable{
    username: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    url?: string;
    locale?: string;
    nickname?: string;
    registered_date?: StringDate;
    roles: string[];
    capabilities: GenericObj;
    extra_capabilities: GenericObj;
    avatar_urls: GenericObj;
}
