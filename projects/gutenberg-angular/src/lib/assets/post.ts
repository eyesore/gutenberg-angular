import { BasePostable, GenericObj, FormatTypes } from './generic';

export interface Postable extends BasePostable {
    password?: string;
    content?: GenericObj;
    excerpt?: Generator;
    featured_media?: number;
    format?: FormatTypes;
    sticky?: boolean;
    categories?: string[];
    tags?: string[];
}
