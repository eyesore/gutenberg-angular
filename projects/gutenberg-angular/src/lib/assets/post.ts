import {
    FormatTypes, ITemplateCommentStatusPing, Securable,
    Parentable, ExcerptContainable, Metable, BaseArgumentLister, ExtrasArgumentListers } from './generic';
import { Identifiers } from '@angular/compiler';

export interface IPost extends Identifiers, ITemplateCommentStatusPing, Securable, ExcerptContainable, Metable {
    featured_media?: number;
    format?: FormatTypes;
    sticky?: boolean;
    categories?: string[];
    tags?: string[];
}

export interface IPostRevision extends Identifiers, Parentable, ExcerptContainable, Metable {
}

export interface IPostLister extends BaseArgumentLister, ExtrasArgumentListers {
    categories?: string[]; // TODO: confirm type
    categories_exclude?: string[]; // same
    tags?: string[];
    tags_exclude?: string[];
    sticky?: boolean;
}
