
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

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
        private router: Router,
        private store$: Store<LoginUserModel[]>
    ) {
        console.log(this.mgr);

        this.mgr.events.addUserLoaded((user) => {
            this.currentUser = user;

            let loginUser = <LoginUserModel>{
                IsLogin: true,
                UserInfo: user
            };
            store$.dispatch({
                type: LOGIN,
                payload: loginUser
            });

            if (ENV !== 'production') {
                console.log('authService addUserLoaded', user);
            }
        });
        this.mgr.events.addUserUnloaded((e) => {
            if (ENV !== 'production') {
                console.log('user unloaded');
            }
            this.loggedIn = false;

            store$.dispatch({
                type: LOGOUT,
                payload: null
            });
        });
        this.loginUser = store$.select('loginUserReducer');
    }

    public clearState() {
        this.mgr.clearStaleState()
            .then(() => {
                console.log('clearStateState success');
            }).catch((e) => {
                console.log('clearStateState error', e.message);
            });
    }

    /**
     * 获取用户信息
     */
    public getUser() {
        this.mgr.getUser()
            .then((user) => {
                console.log('got user', user);
                this.currentUser = user;
                this.userLoadededEvent.emit(user);
            }).catch((err) => {
                console.log(err);
            });
    }

    /**
     * 判断是否登录，用于AuthGuardService
     */
    public isLoggedInObs(): Observable<boolean> {
        return Observable.fromPromise(this.mgr.getUser())
            .map<User, boolean>((user) => {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    public removeUser() {
        this.mgr.removeUser()
            .then(() => {
                this.userLoadededEvent.emit(null);
                console.log('user removed');
            }).catch((err) => {
                console.log(err);
            });
    }

    /**
     * 跳转认证
     */
    public startSigninMainWindow() {
        this.mgr.signinRedirect({ data: 'some data' })
            .then(() => {
                console.log('signinRedirect done');
            }).catch((err) => {
                console.log(err);
            });
    }

    /**
     * 认证完成后回调
     */
    public endSigninMainWindow() {
        this.mgr.signinRedirectCallback()
            .then((user) => {
                console.log('signed in', user);
                this.router.navigate(['/dashboard']);
            }).catch((err) => {
                console.log(err);
            });
    }

    /**
     * 开始登出
     */
    public startSignoutMainWindow() {
        this.mgr.signoutRedirect()
            .then((resp) => {
                console.log('signed out', resp);
            }).catch((err) => {
                console.log(err);
            });
    };

    /**
     * 结束登出
     */
    public endSignoutMainWindow() {
        this.mgr.signoutRedirectCallback()
            .then((resp) => {
                console.log('signed out', resp);
            }).catch((err) => {
                console.log(err);
            });
    };

    /**
     * Example of how you can make auth request using angulars http methods.
     * @param options if options are not supplied the default content type is application/json
     */
    public AuthGet(url: string, options?: RequestOptions): Observable<Response> {
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
    public AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

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
    public AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

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
    public AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

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
