
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { LoginUserModel, AuthInfoModel } from '../../models/LoginUserModel';
import { LOGIN, LOGOUT, AUTH_USER, ADD_LOADING, REMOVE_LOADING, REPORT_ERROR } from '../../actions/layout-sidebar.action';

import { UserManager, Log, MetadataService, User } from 'oidc-client';
import { AuthSettings } from '../../environment';

import _ from 'lodash';

@Injectable()
export class AuthBaseService {
    mgr = new UserManager(AuthSettings);
    loginUser: Observable<LoginUserModel>;
    authHeaders: Headers;

    constructor(
        private http: Http,
        private router: Router,
        private loginUser$: Store<LoginUserModel>,
        private busyLoading$: Store<string[]>,
        private errorReport$: Store<string>
    ) {
        this.mgr.events.addUserLoaded((user) => {
            let loginUser = <LoginUserModel>{
                IsLogin: true,
                UserInfo: user
            };
            loginUser$.dispatch({
                type: LOGIN,
                payload: loginUser
            });
        });
        this.mgr.events.addUserUnloaded((e) => {
            loginUser$.dispatch({
                type: LOGOUT,
                payload: null
            });
        });
        this.loginUser = loginUser$.select('loginUserReducer').filter((loginUser: LoginUserModel) => { return !_.isNil(loginUser) && !_.isNil(loginUser.UserInfo); });
        this.loginUser.subscribe((loginUser) => {
            // console.log('ngrx -- setAuthHeaders');
            // console.log(loginUser);
            this._setAuthHeaders(loginUser.UserInfo);
        });

        // 获取用户
        this.getUser();
    }

    /**
     * 获取用户信息
     */
    public getUser() {
        this.mgr.getUser()
            .then((user) => {
                let loginUser = <LoginUserModel>{
                    IsLogin: true,
                    UserInfo: user
                };
                this.loginUser$.dispatch({
                    type: LOGIN,
                    payload: loginUser
                });
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

    /**
     * 跳转认证
     */
    public startSigninMainWindow() {
        this.mgr.signinRedirect()
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * 认证完成后回调
     */
    public endSigninMainWindow() {
        return this.mgr.signinRedirectCallback();
    }

    /**
     * 开始登出
     */
    public startSignoutMainWindow() {
        this.mgr.signoutRedirect()
            .catch((err) => {
                console.log(err);
            });
    };

    /**
     * 结束登出
     */
    public endSignoutMainWindow() {
        return this.mgr.signoutRedirectCallback();
    };

    /**
     * Example of how you can make auth request using angulars http methods.
     * @param options if options are not supplied the default content type is application/json
     */
    public AuthGet(url: string, options?: RequestOptions): Observable<Response> {
        let uniqueId = _.uniqueId();
        this.busyLoading$.dispatch({ type: ADD_LOADING, payload: uniqueId });

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.get(url, options)
            .do(() => {
                this.busyLoading$.dispatch({ type: REMOVE_LOADING, payload: uniqueId });
            })
            .catch((error) => this.handleError(error));
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    public AuthPut(url: string, body: any, options?: RequestOptions): Observable<Response> {
        let uniqueId = _.uniqueId();
        this.busyLoading$.dispatch({ type: ADD_LOADING, payload: uniqueId });

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.put(url, body, options)
            .do(() => {
                this.busyLoading$.dispatch({ type: REMOVE_LOADING, payload: uniqueId });
            })
            .catch((error) => this.handleError(error));
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    public AuthDelete(url: string, options?: RequestOptions): Observable<Response> {
        let uniqueId = _.uniqueId();
        this.busyLoading$.dispatch({ type: ADD_LOADING, payload: uniqueId });

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.delete(url, options)
            .do(() => {
                this.busyLoading$.dispatch({ type: REMOVE_LOADING, payload: uniqueId });
            })
            .catch((error) => this.handleError(error));
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    public AuthPost(url: string, body: any, options?: RequestOptions): Observable<Response> {
        let uniqueId = _.uniqueId();
        this.busyLoading$.dispatch({ type: ADD_LOADING, payload: uniqueId });

        if (options) {
            options = this._setRequestOptions(options);
        } else {
            options = this._setRequestOptions();
        }
        return this.http.post(url, body, options)
            .do(() => {
                this.busyLoading$.dispatch({ type: REMOVE_LOADING, payload: uniqueId });
            })
            .catch((error) => this.handleError(error));
    }

    public _setRequestOptions(options?: RequestOptions) {

        if (options) {
            options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
        } else {
            options = new RequestOptions({ headers: this.authHeaders });
        }

        return options;
    }

    private _setAuthHeaders(user: any) {
        this.authHeaders = new Headers();
        this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
        this.authHeaders.append('Content-Type', 'application/json');
    }

    private handleError(error: any) {
        console.log(error);

        let errMessage = '';
        const errNo = +error.status;
        if (errNo < 200 || errNo >= 300) {
            switch (errNo) {
                case 400:
                    {
                        let errorJson = error.json();
                        errMessage = _.isNil(errorJson) ? '内部错误，稍后再试' : errorJson.Message;
                    };
                    break;
                case 401:
                    {
                        errMessage = '您没有权限进行此操作！';
                    };
                    break;
                case 403:
                    {
                        errMessage = '无权限！请联系管理员！';
                    };
                    break;
                case 404:
                    {
                        errMessage = '找不到！';
                    };
                    break;
                case 500:
                    {
                        let errorJson = error.json();
                        errMessage = _.isNil(errorJson) ? '内部错误，稍后再试！' : errorJson.ExceptionMessage;
                    };
                    break;
                default:
                    {
                        errMessage = 'Some Server Error.';
                    };
                    break;
            }
        }
        if (errMessage !== '') {
            // 异常报告
            this.errorReport$.dispatch({ type: REPORT_ERROR, payload: errMessage });
        }
        return Observable.from(error);
    }
}
