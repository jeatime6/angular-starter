import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from 'oidc-client';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoginUserModel, AuthInfoModel } from '../../../models/LoginUserModel';
import { SidebarNavGroupModel, SidebarNavItemModel } from '../../../models/SidebarNavModel';
import { ADD_NAV, REPLACE_NAV } from '../../../actions/layout-sidebar.action';

import { AuthBaseService, CommonModalService } from '../../../services';

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
  loadingInstance = null;

  constructor(
    private commonModalService: CommonModalService,
    private authBaseService: AuthBaseService,
    private storeSideBar$: Store<SidebarNavGroupModel[]>,
    private storeLoginUser$: Store<User>,
    private busyLoading$: Store<string[]>
  ) {
    // 左侧导航
    this.layoutSideBars = storeSideBar$.select('layoutSideBarReducers');
    // 当前用户
    this.loginUserSubscriber = storeLoginUser$.select('loginUserReducer')
      .filter((loginUser: LoginUserModel) => { return !_.isNil(loginUser) && !_.isNil(loginUser.UserInfo); })
      .map((loginUser: LoginUserModel) => { return loginUser.UserInfo })
      .do((user) => { this.loginUserName = user.profile.preferred_username; })
      .subscribe();
    // loading
    this.busyLoading$.select('busyLoadingReducer')
      .debounceTime(800)
      .do((uniqueIds: string[]) => {
        if (uniqueIds.length > 0 && _.isNil(this.loadingInstance)) {
          this.loadingInstance = this.commonModalService.openLoading();
        } else if (uniqueIds.length === 0 && !_.isNil(this.loadingInstance)) {
          this.loadingInstance.close();
        }
      })
      .subscribe();
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
