import { IPost } from './post';
import { BaseArgumentLister, ExtrasArgumentListers } from './generic';

export interface IPage extends IPost {
    menu_order: number;
}

export interface IPageLister extends BaseArgumentLister, ExtrasArgumentListers {
    parent?: number[];
    parent_exclude?: number[];
    menu_order?: number;
}
