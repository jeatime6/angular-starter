import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// ngrx
import { StoreModule } from '@ngrx/store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES, CHILDROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './components/app.component';

import { LayoutComponent, BreadcrumbsComponent, DashboardComponent } from './components/public';
import { HospitalIndexComponent } from './components/hospital';

import { NAV_DROPDOWN_DIRECTIVES, SIDEBAR_TOGGLE_DIRECTIVES, AsideToggleDirective } from './components/public';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import '../styles/style.scss';

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

    LayoutComponent,
    BreadcrumbsComponent,
    DashboardComponent,

    HospitalIndexComponent,

    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    RouterModule.forChild(CHILDROUTES),
    // ng-bootstrap
    NgbModule.forRoot(),
    // ngrx
    StoreModule.provideStore({

    })
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})

export class AppModule {
  constructor(
  ) { }
}
