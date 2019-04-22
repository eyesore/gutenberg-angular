import { ITag } from './tag';
import { Describable, Parentable } from './generic';

export interface ICategory extends ITag, Describable, Parentable {}