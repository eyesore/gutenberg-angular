import { log } from '../log/log.class';

export type StringDate = string | Date;
export type StatusTypes = 'published' | 'future' | 'draft' | 'pending' | 'private';
export type CommentStatusTypes = 'opened' | 'closed';
export type AttachmentMediaTypes =  'file' | 'image';
export type ListMediaTypes = 'image' | 'video' | 'audio' | 'application';
export type ContextTypes = 'view' | 'edit' | 'embed';
export type OrderTypes = 'desc' | 'asc';
export type OrderByTypes = 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title';
export type FormatTypes = 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quate' | 'status' | 'video' | 'audo';

export interface GenericObj {
    [key: string]: any;
}

export interface BasePostable {
    date?: StringDate;
    date_gmt?: StringDate;
    guid?: GenericObj; // read only
    id: number; // read only
    link: string; // uri; // read only
    modified?: StringDate;  // read only
    modified_gmt?: StringDate; // read only
    slug: string;
    status: StatusTypes;
    type?: string; // read only
    title?: GenericObj;
    author: number;
    comment_status: CommentStatusTypes;
    ping_status?: string;
    meta?: GenericObj;
    template?: string;
}

export const DefaultWP =  {
    apiFetch: (options) => console.log(options),
    url: {
        addQueryArgs: (url, args) => {
            log.Debug('url: ', url);
            log.Debug('args: ', args);
            return '';
        }
    }
};

// export const
