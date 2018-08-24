import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/client';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;


  constructor(private _clientService: ClientService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _messageService: FlashMessagesService,
              private _settings: SettingsService) {
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this._clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this._settings.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this._messageService.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      value.id = this.id;
      this._clientService.updateClient(value);
      this._messageService.show('Client updated', {cssClass: 'alert-success', timeout: 4000});
      this._router.navigate([`/client/${this.id}`]);
    }
  }

}
