import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// ngrx
import { StoreModule } from '@ngrx/store';
// ng2-charts
import { ChartsModule } from 'ng2-charts/ng2-charts';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routing';
// App is our top level component
import { AppComponent } from './app.component';

import {
  CommonAlertComponent,
  CommonLoadingComponent,

  CommonAuthComponent,
  CommonUnauthComponent,
  CommonLayoutComponent,
  CommonBreadcrumbsComponent,
  CommonNotfoundComponent,
  CommonUnavailableComponent
} from './components/common';

// reducers
import {
  LayoutSideBarReducer,
  LoginUserReducer,
  BusyLoadingReducer,
  ErrorReportReducer
} from './reducers';

// directives
import {
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES,
  AsideToggleDirective
} from './directives';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import '../styles/style.scss';

// chart.js
import 'chart.js/src/chart.js';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,

    CommonAlertComponent,
    CommonLoadingComponent,

    CommonAuthComponent,
    CommonUnauthComponent,
    CommonLayoutComponent,
    CommonBreadcrumbsComponent,
    CommonNotfoundComponent,
    CommonUnavailableComponent,

    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(ROUTES),
    // ng-bootstrap
    NgbModule.forRoot(),
    // ngrx
    StoreModule.provideStore({
      layoutSideBarReducers: LayoutSideBarReducer,
      loginUserReducer: LoginUserReducer,
      busyLoadingReducer: BusyLoadingReducer,
      errorReportReducer: ErrorReportReducer
    })
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  entryComponents: [
    CommonAlertComponent,
    CommonLoadingComponent
  ]
})

export class AppModule { }
