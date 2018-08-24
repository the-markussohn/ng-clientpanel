import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/client';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  hasBalance = false;
  showBalanceUpdateInput = false;
  client: Client;

  constructor(private _clientService: ClientService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _messageService: FlashMessagesService) {
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this._clientService.getClient(this.id).subscribe(client => {
      if (client !== null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  updateBalance() {
    this._clientService.updateClient(this.client);
    this._messageService.show('Balance updated', {cssClass: 'alert-success', timeout: 4000});
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this._clientService.deleteClient(this.client);
      this._messageService.show('Client removed', {cssClass: 'alert-success', timeout: 4000});
      this._router.navigate(['/']);
    }
  }
}
