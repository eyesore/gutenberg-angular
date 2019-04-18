import { Component, AfterViewInit, Inject } from '@angular/core';
import { GutenbergAngularService } from './gutenberg-angular.service';
import { domReady, data, editPost } from '@frontkom/gutenberg-js';
import { WindowConfig } from './assets';
import { log } from './log/log.class';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'pgl-gutenberg-angular',
  template: `
    <div id="editor" class="gutenberg__editor"></div>
  `,
  styles: []
})
export class GutenbergAngularComponent implements AfterViewInit {

  constructor(
    private _gas: GutenbergAngularService,
    @Inject('WINDOW') private w: WindowConfig
  ) {

   }

  ngAfterViewInit() {

    log.Debug('ngAfterViewInit: window: ', Object.assign({}, (window as any).wpApiSettings));

    // reset localStorage
    this._gas.removeStorageItem('g-editor-page');

    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 10,
      canPublish: false,
      canSave: true,
      canAutosave: true,
      mediaLibrary: true,
      postLock: {
          isLocked: false,
      }
    };

     // Disable tips
    data.dispatch('core/nux').disableTips();

    (window as any)._wpLoadGutenbergEditor = new Promise(function(resolve) {
      domReady(function() {
          resolve(editPost.initializeEditor('editor', 'page', 1, settings, {}));
      });
  });
    // editPost.initializeEditor('editor', 'page', 1, settings, {});
    // this._gas.ready$.pipe(
    //   tap(val => log.Debug('ready: ', val)),
    //   filter(value => Boolean(value))
    // ).subscribe(_ => {
    //   log.Debug('init editPost...');

    // });


  }

}
