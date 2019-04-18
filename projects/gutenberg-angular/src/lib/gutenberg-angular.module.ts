import { NgModule, ModuleWithProviders } from '@angular/core';
import { GutenbergAngularComponent } from './gutenberg-angular.component';
import { WindowConfig } from './assets/window';
import { GutenbergAngularService } from './gutenberg-angular.service';


@NgModule({
    declarations: [GutenbergAngularComponent],
    imports: [
    ],
    exports: [GutenbergAngularComponent],
    providers: [
        { provide: 'WINDOW', useFactory: getWindow},
        { provide: 'LOCAL_STORAGE', useFactory: getLocalStorage},
        GutenbergAngularService
    ]
})
export class GutenbergAngularModule {
    static forRoot(myWindow: WindowConfig): ModuleWithProviders {
        return {
            ngModule: GutenbergAngularModule,
            providers: [
                {provide: WindowConfig, useValue: myWindow}
            ]
        };
    }
}

export function getWindow() {
    return (typeof window !== undefined) ? window : null;
}

export function getLocalStorage() {
    return (typeof window !== undefined) ? window.localStorage : null;
}
