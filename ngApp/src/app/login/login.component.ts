import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService,
     private router : Router){}

  loginUserData = <any>{}

  ngOnInit() {
  }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/todo'])
      },
      err => console.log(err)
    ) 
  }
}


