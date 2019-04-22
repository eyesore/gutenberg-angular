import { IBaseTaxPostType } from './generic';

export interface ITaxonomy<T> extends IBaseTaxPostType {
    show_cloud: boolean;
    types: Array<T>;
}
