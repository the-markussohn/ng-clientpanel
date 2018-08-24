import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/client';
import {Router, ActivatedRoute, Params} from '@angular/router';

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
  disableBalanceOnEdit = true;


  constructor(private _clientService: ClientService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _messageService: FlashMessagesService) {
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this._clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {

  }

}
