import { Component } from '@angular/core';

@Component({
  selector: 'pgl-gutenberg-angular-tester',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gutenberg-angular-tester';
  constructor() {
    console.log('window: ', window);
  }
}
