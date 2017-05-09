import { Component } from '@angular/core';

import { AuthBaseService } from '../../../services';

@Component({
  selector: 'app-common-unauth',
  templateUrl: './common-unauth.component.html',
  styleUrls: ['./common-unauth.component.css']
})
export class CommonUnauthComponent {

  constructor(private authBaseService: AuthBaseService) {
    this.authBaseService.endSignoutMainWindow()
      .then((resp) => {
        console.log('signed out');
      }).catch((err) => {
        console.log(err);
      });
  }
}