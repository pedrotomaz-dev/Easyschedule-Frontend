import { Injectable } from '@angular/core';
import { ApiCommunication } from '../../core/services/api-communication.service';
import { MapperService } from '../../core/services/mapper.service';
import { Cliente } from '../models/cliente.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private readonly moduloApi = 'cliente';

  constructor(
    private apiCommunication: ApiCommunication,
    private mapperService: MapperService,
  ) { }

  // public METHODS
  create(value: any): Observable<Cliente> {
    return this.apiCommunication.post<Cliente>(`${this.moduloApi}/create`, value).pipe(
      map((data) => this.mapperService.mapObjectAuto<Cliente>(data) as Cliente));
  }


  getAll(): Observable<Cliente[]> {
    return this.apiCommunication.get<Cliente[]>(`${this.moduloApi}/getAll`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Cliente>(data) as Cliente[]));
  }
}
