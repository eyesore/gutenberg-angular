import { Injectable, Optional, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Window, WindowConfig } from './assets/window';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { shareReplay, filter } from 'rxjs/operators';
import { GenericObj } from './assets/generic';
import { log } from './log/log.class';
import { FETCH_MAP, PROXY, DATA } from './assets';

@Injectable()
export class GutenbergAngularService implements OnInit {
    public apiFetch$ = new Subject<GenericObj>();
    public content$ = new Subject<GenericObj>();
    private _ready$ = new BehaviorSubject<number>(null);
    public ready$ = this._ready$.asObservable();
    private _fetch = PROXY;
    private _fetchMap = FETCH_MAP;
    private _data = DATA;
    defautApiFetch = (options) => {
        log.Debug('options: ', options);
        this.apiFetch$.next(options);
        return of({}).toPromise();
    }

    constructor(
        @Optional() windowConfig: WindowConfig,
        @Inject('WINDOW') private w: Window,
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject('LOCAL_STORAGE') private localStorage: any) {
            this.w.wp_fetcher.pipe(
                filter(value => Boolean(value))
            ).subscribe(payload => {
                log.Debug('window observable: ', payload);
                this.findResponse(payload);
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
        let resp = this._fetchMap[payload.options.path];
        if (resp == null) {
            log.Error(`no response found for ${payload.options.path}`, payload.options);
            resp = {};
        }
        payload.response.next(resp);
    }

    ngOnInit() {
        this._ready$.next(1);
    }

    initEditor(setting) {

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
