import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private _messageService: FlashMessagesService,
    private _settings: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this._settings.getSettings();
  }

  onSubmit() {
    this._settings.changeSettings(this.settings);
    this._messageService.show('Settings saved', {cssClass: 'alert-success', timeout: 4000});
  }

}
