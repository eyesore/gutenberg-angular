import {
    StringDate, StatusTypes, CommentStatusTypes,
    AttachmentMediaTypes, OrderTypes, OrderByTypes,
    ListMediaTypes, GenericObj, BasePostable, ContextTypes } from './generic';


// export enum StatusTypes {
//     PUBLISHED = '',
//     FUTURE = '',
//     DRAFT = '',
//     PENDING = '',
//     PRIVATE = ''
// }

// export enum CommentStatusTypes {
//     OPENED = "opened",
//     CLOSED = "closed"
// }

export interface BaseMediaAttachable extends BasePostable {
    alt_text: string;
    caption: GenericObj;
    description: GenericObj;
    media_type: AttachmentMediaTypes; // read only
    meme_type: string; // read only
    media_details: GenericObj; // read only
    post: number;
    source_url: string; // uri // ready only
}

export interface MediaListable {
    context: ContextTypes;
    page: number;
    per_page: number;
    search: string;
    after: StringDate;
    author: GenericObj[];
    author_exclude: GenericObj[];
    before: StringDate;
    exclude: number[];
    include: number[];
    offset: number;
    order: OrderTypes;
    order_by: OrderByTypes;
    parent: number[];
    parent_exlucde: number[];
    slug: string | string[];
    status: StatusTypes;
    media_type: ListMediaTypes;
    mime_type: string;
}
