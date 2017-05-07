
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginUserModel, AuthInfoModel } from '../../models/LoginUserModel';
import { LOGIN, LOGOUT, AUTH_USER } from '../../actions/layout-sidebar.action';

import { UserManager, Log, MetadataService, User } from 'oidc-client';
import { AuthSettings } from '../../environment';

@Injectable()
export class AuthBaseService {
    mgr: UserManager = new UserManager(AuthSettings);
    userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
    currentUser: User;
    loggedIn = false;

    loginUser: Observable<LoginUserModel>;

    authHeaders: Headers;

    constructor(
        private http: Http,
        private store$: Store<LoginUserModel[]>
    ) {
        this.mgr.getUser()
            .then((user) => {
                if (user) {
                    this.loggedIn = true;
                    this.currentUser = user;
                    this.userLoadededEvent.emit(user);
                } else {
                    this.loggedIn = false;
                }
            })
            .catch((err) => {
                this.loggedIn = false;
            });

        this.mgr.events.addUserLoaded(user => {
            this.currentUser = user;
            if (ENV !== 'production') {
                console.log('authService addUserLoaded', user);
            }
        });
        this.mgr.events.addUserUnloaded((e) => {
            if (ENV !== 'production') {
                console.log('user unloaded');
            }
            this.loggedIn = false;
        });
    }

    clearState() {
        this.mgr.clearStaleState().then(function () {
            console.log('clearStateState success');
        }).catch(function (e) {
            console.log('clearStateState error', e.message);
        });
    }

    getUser() {
        this.mgr.getUser().then((user) => {
            console.log('got user', user);
            this.currentUser = user;
            this.userLoadededEvent.emit(user);
        }).catch(function (err) {
            console.log(err);
        });
    }

    isLoggedInObs(): Observable<boolean> {
        return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
            if (user) {
                return true;
            } else {
                return false;
            }
        });
    }

    removeUser() {
        this.mgr.removeUser().then(() => {
            this.userLoadededEvent.emit(null);
            console.log('user removed');
        }).catch(function (err) {
            console.log(err);
        });
    }

    startSigninMainWindow() {
        this.mgr.signinRedirect({ data: 'some data' }).then(function () {
            console.log('signinRedirect done');
        }).catch(function (err) {
            console.log(err);
        });
    }

    endSigninMainWindow(url?: string) {
        this.mgr.signinRedirectCallback(url).then(function (user) {
            console.log('signed in', user);
        }).catch(function (err) {
            console.log(err);
        });
    }

    startSignoutMainWindow() {
        this.mgr.signoutRedirect().then(function (resp) {
            console.log('signed out', resp);
            setTimeout(5000, () => {
                console.log('testing to see if fired...');

            });
        }).catch(function (err) {
            console.log(err);
        });
    };

    endSignoutMainWindow() {
        this.mgr.signoutRedirectCallback().then(function (resp) {
            console.log('signed out', resp);
        }).catch(function (err) {
            console.log(err);
        });
    };

    /**
     * Example of how you can make auth request using angulars http methods.
     * @param options if options are not supplied the default content type is application/json
     */
    AuthGet(url: string, options?: RequestOptions): Observable<Response> {
        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.get(url, options);
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

        const body = JSON.stringify(data);

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.put(url, body, options);
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.delete(url, options);
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

        const body = JSON.stringify(data);

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.post(url, body, options);
    }

    private _setAuthHeaders(user: any) {
        this.authHeaders = new Headers();
        this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
        this.authHeaders.append('Content-Type', 'application/json');
    }

    public _setRequestOptions(options?: RequestOptions) {

        if (options) {
            options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
        } else {
            options = new RequestOptions({ headers: this.authHeaders, body: '' });
        }

        return options;
    }
}
