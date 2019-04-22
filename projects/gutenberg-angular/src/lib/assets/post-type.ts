import { IBaseTaxPostType } from './generic';
import { GenericObj } from './generic';

export interface IPostType extends IBaseTaxPostType {
    supports: GenericObj;
}
