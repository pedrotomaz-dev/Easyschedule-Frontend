import { Injectable } from '@angular/core';
import { ApiCommunication } from '../../core/services/api-communication.service';
import { MapperService } from '../../core/services/mapper.service';
import { map, Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly moduloApi = 'agendamento';
  
    constructor(
      private apiCommunication: ApiCommunication,
      private mapperService: MapperService,
    ) { }
  
    // public METHODS
    create(obj: any): Observable<Agendamento> {
      return this.apiCommunication.post<Agendamento>(`${this.moduloApi}/create`, obj).pipe(
        map((data) => this.mapperService.mapObjectAuto<Agendamento>(data) as Agendamento),
      );
    }

    get(id: string): Observable<Agendamento> {
      return this.apiCommunication.get<Agendamento>(`${this.moduloApi}/get/${id}`).pipe(
        map((data) => this.mapperService.mapObjectAuto<Agendamento>(data) as Agendamento)
      );
    }

    getAllByFilter(obj: any): Observable<Agendamento[]> {
      return this.apiCommunication.post<Agendamento[]>(`${this.moduloApi}/getAll`, obj).pipe(
        map((data) => this.mapperService.mapObjectAuto<Agendamento>(data) as Agendamento[])
      );
    }
}
