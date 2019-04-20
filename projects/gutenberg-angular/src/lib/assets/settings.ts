import { Titlable, Describable } from '.';

export interface ISettings extends Titlable, Describable {
    timezone?: string;
    date_format?: string;
    time_format?: string;
    start_of_week?: number;
    language?: string;
    use_smilies?: boolean;
    default_category?: number;
    defautl_post_format?: string;
    posts_per_page: number;
    defautl_ping_status: string;
    default_comment_status: string;
}