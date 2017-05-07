import { Reducer, Action } from '@ngrx/store';
import { User } from 'oidc-client';
import { LoginUserModel, AuthInfoModel } from '../models/LoginUserModel';
import { LOGIN, LOGOUT, AUTH_USER } from '../actions/layout-sidebar.action';

export function LoginUserReducer(state = <LoginUserModel>{}, action: Action) {
    switch (action.type) {
        case LOGIN: {
            return action.payload;
        };
        case LOGOUT: {
            return <LoginUserModel>{ IsLogin: false };
        };
        case AUTH_USER: {
            state.AuthInfo = action.payload;
            return state;
        };
        default:
            return state;
    }
}
