import { Injectable } from '@angular/core';
import {Settings} from '../models/settings';

@Injectable()
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false
  };

  constructor() { }

  getSettings(): Settings {
    return this.settings;
  }
}
