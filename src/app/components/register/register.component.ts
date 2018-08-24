import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _messageService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._auth.register(this.email, this.password)
      .then(res => {
        this._messageService.show('You are registered and logged in', {cssClass: 'alert-success', timeout: 4000});
        this._router.navigate(['/']);
      })
      .catch(err => {
        this._messageService.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      });
  }
}
