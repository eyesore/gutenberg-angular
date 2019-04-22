import { Identifiable, Dateable, AuthorRelatable, ContentContainable, Linkable, Metable } from './generic';

export interface IComment<AvUrl> extends Identifiable, Dateable, AuthorRelatable,
                                ContentContainable, Linkable, Metable {
    author_email: string;
    author_ip: string;
    author_url: string;
    author_user_agent: string;
    author_avatar_urls: Array<AvUrl>;
}
