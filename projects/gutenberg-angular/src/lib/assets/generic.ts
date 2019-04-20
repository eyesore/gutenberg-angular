import { Title } from '@angular/platform-browser';

export type StringDate = string | Date;
export type StatusTypes = 'published' | 'future' | 'draft' | 'pending' | 'private';
export type CommentStatusTypes = 'opened' | 'closed';
export type AttachmentMediaTypes =  'file' | 'image';
export type ListMediaTypes = 'image' | 'video' | 'audio' | 'application';
export type ContextTypes = 'view' | 'edit' | 'embed';
export type OrderTypes = 'desc' | 'asc';
export type OrderByTypes = 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title';
export type FormatTypes = 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quate' | 'status' | 'video' | 'audo';

export enum StatusTypesEnum {
    PUBLISHED = 'published',
    FUTURE = 'future',
    DRAFT = 'draft',
    PENDING = 'pending',
    PRIVATE = 'private'
}

export enum CommentStatusTypesEnum {
    OPENED = 'opened',
    CLOSED = 'closed'
}

export interface GenericObj { [key: string]: any; }
export interface Idiable { id?: number; } // ready only
export interface GlobalIdable { guid?: number; } // ready only
export interface Titlable { title?: string; }
export interface AuthorRelatable { author?: number; }
export interface Slugable { slug?: string; }
export interface Parentable { parent?: number; }
export interface ContentContainable { content?: GenericObj; }
export interface Linkable { link?: string; } // ready only
export interface Describable { description?: GenericObj; }
export interface Namable { name?: string; }
export interface Metable { meta?: GenericObj; }
export interface PostRelatable { post?: number; }
export interface Securable { password?: string; }
export interface BaseIdentifiable extends Idiable, Slugable {}
export interface ExcerptContainable extends ContentContainable { excerpt?: GenericObj; }
export interface ModifiedTrackable {
    modified?: StringDate; // ready only
    modified_gmt?: StringDate; // ready only
}
export interface Dateable {
    date?: StringDate;
    date_gmt?: StringDate;
}
export interface IStatusType {
    status?: string;
    type?: string;
}

export interface Identifiable extends GlobalIdable, Title, Dateable,
                                        ModifiedTrackable, AuthorRelatable,
                                        BaseIdentifiable {}
export interface ITemplateCommentStatusPing extends IStatusType {
    template?: string;
    comment_status?: string;
    ping_status?: string;
}

export interface BaseArgumentLister {
    context?: ContextTypes;
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: OrderTypes;
    order_by?: OrderByTypes;
    parent?: number[];
    parent_exlucde?: number[];
    slug?: string | string[];
}

export interface ExtrasArgumentListers {
    after?: StringDate;
    author?: GenericObj[];
    author_exclude?: GenericObj[];
    before?: StringDate;
    offset?: number;
    status?: StatusTypes;
}
