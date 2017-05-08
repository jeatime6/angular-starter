import { Component, OnInit } from '@angular/core';

import { AuthBaseService } from '../../../services';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SidebarNavGroupModel, SidebarNavItemModel } from '../../../models/SidebarNavModel';
import { ADD_NAV, REPLACE_NAV } from '../../../actions/layout-sidebar.action';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})

export class CommonLayoutComponent implements OnInit {

  layoutSideBars: Observable<SidebarNavGroupModel[]>;

  constructor(
    public authBaseService: AuthBaseService,
    public store$: Store<SidebarNavGroupModel[]>
  ) {
    this.layoutSideBars = store$.select('layoutSideBarReducers');
  }

  ngOnInit(): void {
    this.initDashboardSideBar();
  }

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
    this.store$.dispatch({
      type: REPLACE_NAV,
      payload: addSideBar
    });
  }

  userSignOut() {
    this.authBaseService.startSignoutMainWindow();
  }
}
