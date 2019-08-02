import { Injectable, Optional, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Window, WindowConfig } from './assets/window';
import { Subject, BehaviorSubject, of, Observable } from 'rxjs';
import { shareReplay, filter, take, tap, catchError } from 'rxjs/operators';
import { GenericObj } from './assets/generic';
import { log } from './log/log.class';
import { FETCH_MAP, DATA } from './assets';
import apiFetch from '@wordpress/api-fetch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as API_FETCH_DEFAULT from '@wordpress/api-fetch';


@Injectable()
export class GutenbergAngularService implements OnInit {
    private _apiFetch$ = new Subject<GenericObj>();
    public apiFetch$ = this._apiFetch$.asObservable().pipe(shareReplay(1));
    public content$ = new Subject<GenericObj>();
    private _ready$ = new BehaviorSubject<number>(null);
    public ready$ = this._ready$.asObservable();
    private _fetchMap = FETCH_MAP;
    private _data = DATA;
    get: (payload) => any;
    // defautApiFetch = (options) => {
    //     log.Debug('options: ', options);
    //     this.apiFetch$.next(options);
    //     return of({}).toPromise();
    // }

    private _ModeMap = {
        auto: () => {
            API_FETCH_DEFAULT.default.use(API_FETCH_DEFAULT.default.createNonceMiddleware(this.w.wpApiSettings.nonce));
            API_FETCH_DEFAULT.default.use(API_FETCH_DEFAULT.default.createRootURLMiddleware(this.w.wpApiSettings.root));
            return (payload) => {
                this._apiFetch$.next(payload.options);
                API_FETCH_DEFAULT.default(payload.options).then(val => payload.response.next(val));
            };
        },
        manual: () => {
            return (payload) => {
                this._apiFetch$.next(payload);
            };
        },
        demo: () => {
           return (payload) => {
                let resp = this._fetchMap[payload.options.path];
                if (resp == null) {
                    log.Error(`no response found for ${payload.options.path}`, payload.options);
                    resp = {};
                }
                payload.response.next(resp);
           };
        }
    };

    constructor(
        private http: HttpClient,
        @Optional() windowConfig: WindowConfig,
        @Inject('WINDOW') private w: Window,
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject('LOCAL_STORAGE') private localStorage: any) {
            this.get = this._ModeMap[this.w.wp_config_mode]();
            if (this.w.wp_fetcher instanceof Observable) {
                this.w.wp_fetcher.pipe(
                    filter(value => Boolean(value))
                ).subscribe(payload => {
                    log.Debug('window observable: ', payload);
                    this.get(payload);
                    // this.findResponse(payload);
                });
            }

            apiFetch.use((options, next) => {
                const result = next(options);
                result.then(r => {
                    log.Debug('result: ', r);
                });
                return result;
            });
        // if (windowConfig) {
        //     // Object.assign(this.w, windowConfig);
        //     this.w.userSettings.uid = windowConfig.userSettings.uid;
        //     this.w.wpApiSettings.root = windowConfig.wpApiSettings.root;
        //     this.w.wp.apiFetch = this.defautApiFetch;
        // }
        // log.Debug('wpApiSettings: ', Object.assign({}, this.w.wpApiSettings));
        // if (!this.w.wp || typeof this.w.wp.apiFetch !== 'function') {
        //     this.w.wp.apiFetch = this.defautApiFetch;
        //     (window as any).wp.apiFetch = this.defautApiFetch;
        // }
        // if (!this.w.userSettings) {
        //     this.w.userSettings.uid = 2;
        // }
        // if (!this.w.wpApiSettings.root) {
        //     this.w.wpApiSettings.root = 'localhost';
        // }
        // (this.w).save = (content) => {
        //     log.Debug('content: ', content);
        // };
        // this.apiFetch$.subscribe(log.Debug);
        // this.content$.subscribe(log.Debug);
        // // Middleware
        // apiFetch.use(apiFetch.createNonceMiddleware(this.w.wpApiSettings.nonce));
        // apiFetch.use(apiFetch.createRootURLMiddleware(this.w.wpApiSettings.root));
        // this._ready$.next(1);
    }

    findResponse(payload) {
        // const g = this.get(payload);
        // if(g instanceof Observable){
        //     g.subscribe(paly)
        // }
        // let resp = this._fetchMap[payload.options.path];
        // if (resp == null) {
        //     log.Error(`no response found for ${payload.options.path}`, payload.options);
        //     resp = {};
        // }
        // payload.response.next(resp);
        // const resp = {};
        // switch (payload.options.path) {
        //     // case '/wp/v2/types?context=edit':
        //     //     resp = {page: DATA.pageType} ;
        //     //     break;
        //     // case '/wp/v2/types/page?context=edit':
        //     //     resp = { ...DATA.pageType };
        //     //     break;
        //     default:
        //         // return apiFetch(request);
        //         // console.log('normal path: ', request);
        //         return this.get(payload).pipe(
        //             tap(val => log.Debug('get value: ', val))).subscribe(payload.response);

        // }
        // payload.response.next(resp);
    }

    getRoute(options): string {
        let path = this.w.wpApiSettings.root;
        if (path.indexOf('?') !== -1 && options.path.includes('?')) {
            path += options.path.replace('?', '&');
        }
        if (path.includes('//')) {
            path = path.replace('//', '/');
        }
        return path;
    }

    // get(options) {
    //     log.Debug('sending get requestion: ', options);
    //     const headers = new HttpHeaders({
    //         'Content-Type':  'application/json',
    //         Accept: 'application/json, */*;q=0.1',
    //         'X-WP-Nonce': this.w.wpApiSettingsnonce
    //     });

    //     return this.http.get(this.getRoute(options) + '&_local=user', {headers}).pipe(
    //         catchError(err => {
    //             log.Error(err);
    //             return null;
    //         })
    //     );
    // }

    // post(options) {
    //     return this.http.post('/', this.getParams(options));
    // }

    // put(options) {
    //     return this.http.put('/', this.getParams(options));
    // }

    ngOnInit() {
        this._ready$.next(1);
    }


    getWindow() {
        return this.w;
    }

    removeStorageItem(key: string) {
        if (!isPlatformBrowser(this.platformId)) {
            log.Error('local storage not available!');
            return; // no local storage;
        }

        this.localStorage.removeItem(key);
    }
}
