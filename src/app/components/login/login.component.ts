import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private _auth: AuthService,
              private _messageService: FlashMessagesService,
              private _router: Router) {
  }

  ngOnInit() {
    this._auth.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this._auth.login(this.email, this.password)
      .then(res => {
        this._messageService.show('You are now logged in', {cssClass: 'alert-success', timeout: 4000});
        this._router.navigate(['/']);
      })
      .catch(err => {
        this._messageService.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      });
  }

}
