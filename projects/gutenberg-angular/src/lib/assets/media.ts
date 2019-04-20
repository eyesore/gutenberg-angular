import {
    AttachmentMediaTypes, ListMediaTypes, 
    GenericObj, Identifiable, BaseArgumentLister, 
    ExtrasArgumentListers } from './generic';

export interface IMedia extends Identifiable {
    alt_text: string;
    caption: GenericObj;
    description: GenericObj;
    media_type: AttachmentMediaTypes; // read only
    meme_type: string; // read only
    media_details: GenericObj; // read only
    post: number;
    source_url: string; // uri // ready only
}

export interface IMediaLister extends BaseArgumentLister, ExtrasArgumentListers{
    media_type: ListMediaTypes;
    mime_type: string;
}
