import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from 'oidc-client';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoginUserModel, AuthInfoModel } from '../../../models/LoginUserModel';
import { SidebarNavGroupModel, SidebarNavItemModel } from '../../../models/SidebarNavModel';
import { ADD_NAV, REPLACE_NAV } from '../../../actions/layout-sidebar.action';

import { AuthBaseService } from '../../../services';

import _ from 'lodash';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})

export class CommonLayoutComponent implements OnInit, OnDestroy {

  layoutSideBars: Observable<SidebarNavGroupModel[]>;
  loginUserSubscriber: Subscription;
  loginUserName = '';

  constructor(
    public authBaseService: AuthBaseService,
    public storeSideBar$: Store<SidebarNavGroupModel[]>,
    public storeLoginUser$: Store<User>
  ) {
    // 左侧导航
    this.layoutSideBars = storeSideBar$.select('layoutSideBarReducers');
    // 当前用户
    this.loginUserSubscriber = storeLoginUser$.select('loginUserReducer')
      .filter((loginUser: LoginUserModel) => { return !_.isNil(loginUser) && !_.isNil(loginUser.UserInfo); })
      .map((loginUser: LoginUserModel) => { return loginUser.UserInfo })
      .subscribe((user) => {
        this.loginUserName = user.profile.preferred_username;;
      });
  }

  ngOnInit(): void {
    this.initDashboardSideBar();
  }

  ngOnDestroy(): void {
    this.loginUserSubscriber.unsubscribe();
  }

  /**
   * 初始化SiderBar
   */
  initDashboardSideBar() {
    let addSideBar = [{
      GroupName: '医院管理',
      GroupIcon: '',
      NavItems: [
        {
          ItemName: '医院列表',
          ItemIcon: '',
          ItemUrl: '/hospital'
        }
      ]
    }];
    this.storeSideBar$.dispatch({
      type: REPLACE_NAV,
      payload: addSideBar
    });
  }

  /**
   * 登出
   */
  userSignOut() {
    this.authBaseService.startSignoutMainWindow();
  }
}
