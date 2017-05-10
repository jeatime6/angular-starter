import { Component } from '@angular/core';

import { AuthBaseService } from '../../../services';

@Component({
  selector: 'app-common-unauth',
  templateUrl: './common-unauth.component.html',
  styleUrls: ['./common-unauth.component.css']
})
export class CommonUnauthComponent {

  public message = '正在登出...';

  constructor(private authBaseService: AuthBaseService) {
    this.authBaseService.endSignoutMainWindow()
      .then((resp) => {
        // console.log('signed out', resp);
        this.message = '您已成功退出！';
      }).catch((err) => {
        console.log(err);
      });
  }
}