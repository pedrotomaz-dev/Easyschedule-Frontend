import { Injectable } from '@angular/core';
import { ApiCommunication } from '../../core/services/api-communication.service';
import { Servico } from '../models/servico.model';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { MapperService } from '../../core/services/mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  

  private readonly moduloApi = 'servico';

  constructor(
    private apiCommunication: ApiCommunication, 
    private mapperService: MapperService,
  ) { }

  // public METHODS
  create(obj: Servico): Observable<Servico> {
    return this.apiCommunication.post<Servico>(`${this.moduloApi}/create`, obj).pipe(
      map((data) => this.mapperService.mapObjectAuto<Servico>(data) as Servico),
    );
  }

  update(obj: Servico): Observable<Servico> {
    return this.apiCommunication.put<Servico>(`${this.moduloApi}/update`, obj).pipe(
      map((data) => this.mapperService.mapObjectAuto<Servico>(data) as Servico),
    );
  }

  getAll(): Observable<Servico[]> {
    return this.apiCommunication.get<Servico[]>(`${this.moduloApi}/getAll`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Servico>(data) as Servico[]));
  }

  getAllWithProfessionals(): Observable<Servico[]> {
    return this.apiCommunication.get<Servico[]>(`${this.moduloApi}/getAllWithProfessionals`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Servico>(data) as Servico[])
    );
  }

  getWithProfessionals(id: string): Observable<Servico> {
    return this.apiCommunication.get<Servico>(`${this.moduloApi}/getWithProfessionals/${id}`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Servico>(data) as Servico)
    );
  }

}