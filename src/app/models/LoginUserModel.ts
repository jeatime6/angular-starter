import { User } from 'oidc-client';

/**
 * 登陆用户信息
 */
export class LoginUserModel {
    IsLogin: boolean;
    UserInfo: User;
    AuthInfo: AuthInfoModel;
}

/**
 * 权限信息
 * 
 * @export
 * @class AuthInfoModel
 */
export class AuthInfoModel {

}