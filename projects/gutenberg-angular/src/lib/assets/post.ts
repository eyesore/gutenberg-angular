import {
    FormatTypes, ITemplateCommentStatusPing, Securable,
    Parentable, ExcerptContainable, Metable, BaseArgumentLister, ExtrasArgumentListers, Identifiable } from './generic';

export interface IPost extends Identifiable, ITemplateCommentStatusPing, Securable, ExcerptContainable, Metable {
    featured_media?: number;
    format?: FormatTypes;
    sticky?: boolean;
    categories?: string[];
    tags?: string[];
}

export interface IPostRevision extends Identifiable, Parentable, ExcerptContainable, Metable {
}

export interface IPostLister extends BaseArgumentLister, ExtrasArgumentListers {
    categories?: string[]; // TODO: confirm type
    categories_exclude?: string[]; // same
    tags?: string[];
    tags_exclude?: string[];
    sticky?: boolean;
}
