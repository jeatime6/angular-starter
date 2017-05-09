import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthBaseService } from '../../../services';

@Component({
  selector: 'app-common-auth',
  templateUrl: './common-auth.component.html',
  styleUrls: ['./common-auth.component.css']
})
export class CommonAuthComponent {

  constructor(private authBaseService: AuthBaseService, private router: Router) {
    this.authBaseService.endSigninMainWindow()
      .then((user) => {
        console.log('signed in', user);
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        console.log(err);
      });
  }
}