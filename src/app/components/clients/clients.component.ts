import {Component, OnInit} from '@angular/core';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private _clientService: ClientService) {
  }

  ngOnInit() {
    this._clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

}
