/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }


