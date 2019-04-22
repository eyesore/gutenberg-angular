import { IBaseTaxPostType } from './generic';

export interface ITaxanomy<T> extends IBaseTaxPostType {
    show_cloud: boolean;
    types: Array<T>;
}
