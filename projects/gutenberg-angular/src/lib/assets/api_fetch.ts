import { log } from '../log/log.class';
import { Observable, BehaviorSubject, merge, Subject, of } from 'rxjs';
import { BaseResponser } from './response';
import { tap, filter, take } from 'rxjs/operators';
import { parse, stringify } from 'querystring';
import { WP } from './window';
import * as API_FETCH_DEFAULT from '@wordpress/api-fetch';
log.Debug('default: fetch: ', API_FETCH_DEFAULT);
// export const API_FETCH_FUNC = (options) => console.log(options);
// export const API_FETCH_FUNC = (options): Promise<any> => {
//     log.Debug("options: ", options);
//     const handler = FETCH_MAP[options.path] || null;
//     log.Debug('handler: ', handler);
//     if (handler == null) {
//         log.Error(`No available handler for ${options.path}`, options);
//     }
//     return handler.send(options).pipe(take(1)).toPromise();
// };
const API_FETCH_FUNC = (options): Promise<any> => PROXY.send(options).toPromise();

const addQueryArgs = (url, args) => {
    const queryStringIndex = url.indexOf('?');
    const query = queryStringIndex !== -1 ? parse(url.substr(queryStringIndex + 1)) : {};
    const baseUrl = queryStringIndex !== -1 ? url.substr(0, queryStringIndex) : url;

    return baseUrl + '?' + stringify({ ...query, ...args });
};

class FetchHandler {
    private _send = new BehaviorSubject(null);
    private _response = new BehaviorSubject<BaseResponser>(null);
    get observe(): Observable<any> {
        return this._send.asObservable();
    }

    send(options): Observable<BaseResponser> {
        // this._response = new BehaviorSubject<BaseResponser>(null);
        this._send.next({options, response: this._response});
        return this._response.asObservable().pipe(
            filter(value => Boolean(value)),
            take(1),
            tap(val => log.Debug('send: response: ', val)));
    }
}

const PROXY = new FetchHandler();

interface IFetch {
    wp?: WP;
    observe?: Observable<any>;
}

export enum ConfigMode {
    DEMO = 'demo',
    MANUAL = 'manual',
    AUTO = 'auto'
}

export interface Window_Config {
    mode: ConfigMode;
    fetch?: IFetch;
    user?: {
       uid: string;
    };
    settings?: {
       root: string;
       url?: string;
    };
}

export const WINDOW_CONFIG = {
    init: (options?: Window_Config) => {
        if (!('fetch' in options) || options.fetch != null ) {
            addApiFetch(options.fetch);
        }

        addUserSettings(options.user);
        addApiSettings(options.settings);
        addConfigMode(options.mode);

        (window as any).save = (content) => {
            log.Debug(content);
          };
    },
    contextInit: (options?: Window_Config) => {
        log.Debug('context init: options', options);
        log.Debug('is fetch NOT null: ', options.fetch != null);
        if (!('fetch' in options) || options.fetch != null) {
            (window as any).wp = {

                apiFetch: (request) => {
                    let resp = {};
                    log.Debug('path: ', request.path);
                    switch (request.path) {
                        case '/wp/v2/types?context=edit':
                            resp = {page: DATA.pageType} ;
                            break;
                        case '/wp/v2/types/page?context=edit':
                            resp = { ...DATA.pageType };
                            break;
                        default:
                            // return apiFetch(request);
                            console.log('normal path: ', request);
                            return API_FETCH_DEFAULT.default(request);

                    }
                    log.Debug('resp: ', resp);
                    return of(resp).toPromise();
                }
            };
        }
        addUserSettings(options.user);
        addApiSettings(options.settings);
        addConfigMode(options.mode);
    }
};
const addConfigMode = (mode: ConfigMode = ConfigMode.AUTO) => {
    (window as any).wp_config_mode = mode;
};
const addApiFetch = (options: IFetch = {
    wp: {
        apiFetch: API_FETCH_FUNC
    },
    observe: PROXY.observe
}) => {
    (window as any).wp = options.wp;
    (window as any).wp_fetcher = options.observe;
    // // (window as any).wp  = {} as WP;

};
const addUserSettings = (options = {
    uid: 'g-editor-page'
}) => {
    (window as any).userSettings = options; // Among other things, this uid is used to identify and store editor user preferences in localStorage
};

const addApiSettings = (options = {root: ''}) => {
    if (options) {
        (window as any).wpApiSettings = options;
    }
};

const DATE = (new Date()).toISOString();

export const DATA = {
    pageType: {
        id: 1,
        name: 'Pages', rest_base: 'pages', slug: 'page',
        supports: {
          author: false,
          comments: false,
          'custom-fields': false,
          discussion: false,
          editor: true,
          excerpt: false,
          'page-attributes': false,
          revisions: false,
          thumbnail: false,
          title: false,
        },
        viewable: true,
    },
    page: {
        id: 1,
        content: {
          raw: '',
          rendered: '',
        },
        date: DATE,
        date_gmt: DATE,
        title: {
          raw: 'Preview page',
          rendered: 'Preview page',
        },
        excerpt: {
          raw: '',
          rendered: '',
        },
        status: 'draft',
        revisions: { count: 0, last_id: 0 },
        parent: 0,
        theme_style: true,
        type: 'page',
        link: `${window.location.origin}/preview`,
        categories: [ ],
        featured_media: 0,
        permalink_template: `${window.location.origin}/preview`,
        preview_link: `${window.location.origin}/preview`,
        _links: {
          'wp:action-assign-categories': [],
          'wp:action-create-categories': [],
        }
    },
    getMedias: (n = 3) => {
        return Array(n).fill('').map((i, index) => {
            const id = index + 1;

            return {
                id,
                caption: { raw: '', rendered: '' },
                date_gmt: DATE,
                date: DATE,
                link: `${window.location.origin}/img${id}.png`,
                media_type: 'image',
                mime_type: 'image/jpeg',
                source_url: `${window.location.origin}/img${id}.png`,
                media_details: {
                    file: '',
                    height: 2100,
                    image_meta: {},
                    sizes: {},
                    width: 3360,
                },
                title: { raw: '', rendered: '' },
            };
        });
    },
    themes: [{
        theme_supports: {
            formats: ['standard', 'aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio'],
            'post-thumbanials': true,
            'responsive-embeds': false,
        },
    }]
};

const _valueMapper = (options) => {
    let item = JSON.parse(localStorage.getItem('g-editor-page')) || DATA.page;
    if (options.data) {
      log.Debug(options.data.content);
      item = {
        ...item,
        // update content
        content: {
          raw: options.data.content,
          rendered: options.data.content.replace(/(<!--.*?-->)/g, ''),
        },
      };

      localStorage.setItem('g-editor-page', JSON.stringify(item));
    }
    return item;
};

export const FETCH_MAP = {
    '/wp/v2/types?context=edit': {
        page: DATA.pageType
    },
    '/wp/v2/types/page?context=edit': { ...DATA.pageType },
    '/wp/v2/pages/1?context=edit': JSON.parse(localStorage.getItem('g-editor-page')) || DATA.page,
    '/wp/v2/pages/1': _valueMapper,
    '/wp/v2/pages/1/autosaves': _valueMapper,
    '/wp/v2/media?context=edit': DATA.getMedias(),
    '/wp/v2/media': DATA.getMedias(Math.floor(Math.random() * 3)),
    '/wp/v2/themes?status=active': DATA.themes
};


// export const Observer = merge(...Object.keys(FETCH_MAP).reduce((acc, key) => acc.concat(FETCH_MAP[key].observe), []));
// import { page, pageType, getMedias, themes } from './fake-data.js';

// const medias = getMedias();

// export const apiFetch = options => {
//   console.log(options.path, options);

//   let res = {};
//   let item = {};

//   switch (options.path) {
//     case '/wp/v2/types?context=edit':
//       res = { page: pageType };
//       break;
//     case '/wp/v2/types/page?context=edit':
//       res = { ...pageType };
//       break;
//     case '/wp/v2/pages/1?context=edit':
//       res = JSON.parse(localStorage.getItem('g-editor-page')) || page;
//       break;
//     case '/wp/v2/pages/1':
//     case '/wp/v2/pages/1/autosaves':
//       item = JSON.parse(localStorage.getItem('g-editor-page')) || page;
//       if (options.data) {
//         console.info(options.data.content);
//         item = {
//           ...item,
//           // update content
//           content: {
//             raw: options.data.content,
//             rendered: options.data.content.replace(/(<!--.*?-->)/g, ''),
//           },
//         };

//         localStorage.setItem('g-editor-page', JSON.stringify(item));
//       }

//       res = item;
//       break;
//     case '/wp/v2/media?context=edit':
//       res = medias;
//       break;
//     case '/wp/v2/media':
//       res = medias[Math.floor(Math.random() * medias.length) + 0];
//       break;
//     case '/wp/v2/themes?status=active':
//       res = themes;
//       break;
//     default:
//       break;
//   }

//   console.log(res);
//   return new Promise(resolve => { resolve(res); });
// };
