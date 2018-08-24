import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd = true;

  @ViewChild('clientForm') form: any;

  constructor(private _messageService: FlashMessagesService,
              private _clientService: ClientService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this._messageService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this._clientService.addClient(value);
      this._messageService.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this._router.navigate(['/']);
    }
  }

}
