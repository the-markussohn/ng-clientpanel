import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private _auth: AuthService,
              private _router: Router,
              private _messageService: FlashMessagesService,
              private _settings: SettingsService) {
  }

  ngOnInit() {
    this._auth.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this._settings.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this._auth.logout();
    this._messageService.show('You are logged out', {cssClass: 'alert-success', timeout: 4000});
    this._router.navigate(['/login']);
  }

}
