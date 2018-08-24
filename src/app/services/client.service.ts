import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

import {Client} from '../models/client';
import {map} from 'rxjs/operators';

@Injectable()
export class ClientService {

  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients$: Observable<Client[]>;
  client$: Observable<Client>;

  constructor(private _afs: AngularFirestore) {
    this.clientCollection = this._afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    this.clients$ = this.clientCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients$;
  }

  addClient(client: Client) {
    this.clientCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this._afs.doc<Client>(`clients/${id}`);
    this.client$ = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client$;
  }

  updateClient(client: Client) {
    this.clientDoc = this._afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this._afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
