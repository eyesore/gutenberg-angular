import { Slugable, Linkable, Metable, Namable } from './generic';

export interface ITag extends Namable, Slugable, Linkable, Metable {
    count: number;
    taxonomy: string;
} 