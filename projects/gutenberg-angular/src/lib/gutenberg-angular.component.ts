import { Component, AfterViewInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { GutenbergAngularService } from './gutenberg-angular.service';
import { domReady, data, editPost } from '@frontkom/gutenberg-js';
import { WindowConfig, GenericObj, EditorConfig } from './assets';
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
  private _page: number;
  @Input() config: EditorConfig;
  @Input() slug = 'page';
  @Input()
  get page(): number {
    return this._page;
  }
  set page(p: number) {
    this._page = p;
  }
  @Output() onApiFetch = new EventEmitter<GenericObj>();
  constructor(
    private _gas: GutenbergAngularService,
    @Inject('WINDOW') private w: WindowConfig
  ) {
      this._gas.apiFetch$.subscribe(val => this.onApiFetch.emit(val));
   }

  ngAfterViewInit() {

    log.Debug('ngAfterViewInit: window: ', Object.assign({}, (window as any).wpApiSettings));

    // reset localStorage
    // this._gas.removeStorageItem('g-editor-page');

    const settings: EditorConfig = this.config ? this.config : {
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

    editPost.initializeEditor('editor', this.slug, this.page, settings, {});
  }

}
