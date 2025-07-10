import { Injectable } from '@angular/core';
import { ApiCommunication } from '../../core/services/api-communication.service';
import { MapperService } from '../../core/services/mapper.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Profissional } from '../models/profissional.model';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {
  

  private readonly moduloApi = 'profissional';

  constructor(
    private apiCommunication: ApiCommunication,
    private mapperService: MapperService,
  ) { }

  // public METHODS
  create(obj: Profissional): Observable<Profissional> {
    return this.apiCommunication.post<Profissional>(`${this.moduloApi}/create`, obj).pipe(
      map((data) => this.mapperService.mapObjectAuto<Profissional>(data) as Profissional),
    );
  }

  get(id: string): Observable<Profissional> {
    return this.apiCommunication.get<Profissional>(`${this.moduloApi}/get/${id}`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Profissional>(data) as Profissional)
    );
  }

  getAll(): Observable<Profissional[]> {
    return this.apiCommunication.get<Profissional[]>(`${this.moduloApi}/getAll`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Profissional>(data) as Profissional[])
    );
  }

  getAllWithServices(): Observable<Profissional[]> {
    return this.apiCommunication.get<Profissional[]>(`${this.moduloApi}/getAllWithServices`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Profissional>(data) as Profissional[])
    );
  }

  getWithProfessionals(id: string) {
    return this.apiCommunication.get<Profissional>(`${this.moduloApi}/getWithServices/${id}`).pipe(
      map((data) => this.mapperService.mapObjectAuto<Profissional>(data) as Profissional)
    );
  }

  update(obj: Profissional): Observable<Profissional> {
    return this.apiCommunication.put<Profissional>(`${this.moduloApi}/update`, obj).pipe(
      map((data) => this.mapperService.mapObjectAuto<Profissional>(data) as Profissional),
    );
  }
}
